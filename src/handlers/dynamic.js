// src/handlers/dynamic.js

import { httptoHttps } from "../utils.js";

export const dynamicHandler = {
    name: "dynamic",
    keys: ["dynamic_detail"],
    match(url) {
        if (/BV[a-zA-Z0-9]+/.test(url)) return false;
        if (/(ep|ss)\d+/i.test(url)) return false;

        return /(^|[^A-Za-z])\d+\b/.test(url);
    },
    parse(url) {
        const m = url.match(/(^|[^A-Za-z])(\d+)\b/);
        if (!m) throw new Error("Dynamic parse: no dynamic_id");

        const dynamic_id = m[2];
        return {
            dynamic_id,
            id: dynamic_id,
            url: `https://t.bilibili.com/${dynamic_id}`,
        };
    },
    async fetch(ctx, idObj) {
        const { dynamic_id } = idObj;
        if (!dynamic_id) throw new Error("Dynamic fetch: no dynamic_id");
        const dynamicRes = await ctx.client.request({
            url: "https://api.bilibili.com/x/polymer/web-dynamic/v1/detail",
            params: { id: dynamic_id },
            desc: `获取动态 ${dynamic_id} 详情`,
        });
        const opusRes = await ctx.client.request({
            url: "https://api.bilibili.com/x/polymer/web-dynamic/v1/opus/detail",
            params: {
                id: dynamic_id,
                features:
                    "onlyfansVote,onlyfansAssetsV2,decorationCard,htmlNewStyle,ugcDelete,editable,opusPrivateVisible,tribeeEdit,avatarAutoTheme,avatarTypeOpus",
            },
            desc: `获取opus ${dynamic_id} 详情`,
        });
        const dynamicDetail = dynamicRes.data || {};
        const data = { ...idObj, dynamic_detail: dynamicDetail };
        if (opusRes.data?.item) {
            data.opus_detail = opusRes.data || {};
        }
        if (dynamicDetail.item?.type === "DYNAMIC_TYPE_ARTICLE") {
            const cvid = dynamicDetail.item?.basic?.rid_str;
            if (cvid) {
                const articleRes = await ctx.client.request({
                    url: "https://api.bilibili.com/x/article/view",
                    params: { id: cvid },
                    desc: `获取专栏 cv${cvid} 详情`,
                });
                const articleView = articleRes.data || {};
                data.article_view = articleView;
            }
        }
        return data;
    },
    extract(data) {
        const info = {};
        const dynamicItem = data?.dynamic_detail?.item;
        if (dynamicItem) {
            const { comment_type, comment_id_str, rid_str } =
                dynamicItem.basic || {};
            if (!comment_type || !comment_id_str)
                throw new Error(
                    "Dynamic extract: missing comment_type or comment_id_str",
                );
            Object.assign(info, {
                id: dynamicItem.id_str,
                oid: comment_id_str,
                type: comment_type,
                dynamic_type: dynamicItem.type,
            });
            if (rid_str) {
                info.rid = rid_str;
            }
            const { modules } = dynamicItem;
            if (modules) {
                Object.assign(info, {
                    pubtime: modules.module_author?.pub_ts,
                    owner: {
                        mid: modules.module_author?.mid,
                        name: modules.module_author?.name,
                        face: modules.module_author?.face,
                    },
                    stat: {
                        like: modules.module_stat?.like?.count,
                        share: modules.module_stat?.forward?.count,
                        reply: modules.module_stat?.comment?.count,
                    },
                });
                info.owner.face = httptoHttps(info.owner.face);
            }
            info.url = "https://t.bilibili.com/" + info.id;

            const opusItem = data?.opus_detail?.item;
            if (opusItem) {
                info.title = opusItem.basic?.title;
                const { modules } = opusItem;
                if (Array.isArray(modules)) {
                    for (const module of modules) {
                        if (module.module_type === "MODULE_TYPE_TITLE") {
                            if (module.module_title?.text)
                                info.title = module.module_title.text;
                        }
                        if (module.module_type === "MODULE_TYPE_STAT") {
                            const stat = module.module_stat;
                            if (stat?.like) info.stat.like = stat.like.count;
                            if (stat?.coin) info.stat.coin = stat.coin.count;
                            if (stat?.favorite)
                                info.stat.favorite = stat.favorite.count;
                            if (stat?.forward)
                                info.stat.share = stat.forward.count;
                            if (stat?.comment)
                                info.stat.reply = stat.comment.count;
                        }
                    }
                }
                info.url = "https://www.bilibili.com/opus/" + info.id;
            }
            const articleView = data?.article_view;
            if (articleView) {
                info.cover = httptoHttps(articleView.opus?.article?.cover?.[0]?.url);
                info.stat.view = articleView.stats?.view;
                info.stat.coin = articleView.stats?.coin;
            }
        }
        return info;
    },
};
