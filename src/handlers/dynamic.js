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
            url: 'https://api.bilibili.com/x/polymer/web-dynamic/v1/detail',
            params: { id: dynamic_id },
            desc: `获取动态 ${dynamic_id} 详情`,
        });
        const dynamicDetail = dynamicRes.data || {};
        return { ...idObj, dynamic_detail: dynamicDetail };
    },
    extract(data) {
        const info = {};
        const dynamicItem = data?.dynamic_detail?.item;
        if (dynamicItem) {
            const { comment_type, comment_id_str, rid_str } = dynamicItem.basic || {};
            if (!comment_type || !comment_id_str) throw new Error("Dynamic extract: missing comment_type or comment_id_str");
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
            info.url = 'https://t.bilibili.com/' + info.id;
        }
        return info;
    }
}