// src/handlers/cheese.js

import { httptoHttps } from "../utils.js";

export const cheeseHandler = {
    name: "cheese",
    keys: ["cheese_season_view"],
    match(url) {
        return /(ep|ss)\d+/.test(url) && !/bangumi/i.test(url);
    },
    parse(url) {
        const m = url.match(/(ep|ss)(\d+)/i);
        if (!m) throw new Error("Cheese parse: no ep/ss");

        const kind = m[1].toLowerCase();
        const num = parseInt(m[2], 10);
        const idKey = (kind === 'ss' ? 'season_id' : 'ep_id');
        return {
            [idKey]: num,
            id: `cheese/play/${kind}${num}`,
            url: `https://www.bilibili.com/cheese/play/${kind}${num}`,
        };
    },
    async fetch(ctx, idObj) {
        let { ep_id, season_id } = idObj;
        if (!ep_id && !season_id) throw new Error("Cheese fetch: no ep_id or season_id");
        const seasonParams = ep_id ? { ep_id } : { season_id };
        const seasonRes = await ctx.client.request({
            url: 'https://api.bilibili.com/pugv/view/web/season/v2',
            params: seasonParams,
            desc: `获取课程明细 ${ep_id ? 'ep' + ep_id : 'ss' + season_id}`
        });
        const seasonView = seasonRes.data || {};
        if (!ep_id) {
            if (seasonView?.user_status?.progress?.last_ep_id) {
                ep_id = seasonView.user_status.progress.last_ep_id;
                idObj.ep_id = ep_id;
            }
        }
        return { ...idObj, cheese_season_view: seasonView };
    },
    extract(data) {
        const info = {};
        const seasonView = data?.cheese_season_view;
        if (seasonView) {
            const season_id = seasonView.season_id || data.season_id;
            Object.assign(info, {
                id: `cheese/play/ss${season_id}`,
                season_id: season_id,
                type: 33,
                title: seasonView.title,
                desc: seasonView.subtitle,
                cover: seasonView.cover,
                owner: {
                    mid: seasonView.up_info?.mid,
                    name: seasonView.up_info?.uname,
                    face: seasonView.up_info?.avatar
                },
                stat: {
                    view: seasonView.stat?.play,
                    favorite: seasonView.stat?.fav,
                    share: seasonView.stat?.share,
                }
            });
            if (seasonView.cooperators?.length > 0) {
                info.staff = [];
                seasonView.cooperators.forEach(stf => {
                    info.staff.push({
                        mid: stf.mid,
                        name: stf.nick_name,
                        face: stf.avatar,
                        role: stf.role,
                    });
                });
            }
            const ep_id = data.ep_id;
            if (ep_id) {
                let ep = null;
                let sectionTitle = null;
                if (Array.isArray(seasonView.sections)) {
                    for (const section of seasonView.sections) {
                        ep = section.episodes?.find(e => e.id === ep_id);
                        if (ep) {
                            sectionTitle = section.title;
                            break;
                        }
                    }
                }
                if (!ep) throw new Error('Cheese extract: ep not found');
                Object.assign(info, {
                    id: `cheese/play/ep${ep_id}`,
                    ep_id: ep_id,
                    aid: ep.aid,
                    cid: ep.cid,
                    oid: ep.id,
                    duration: ep.duration,
                    subtitle: `${sectionTitle}：${ep.title}`,
                    cover: ep.cover,
                    pubtime: ep.release_date,
                });
                Object.assign(info.stat, {
                    view: ep.play,
                });
            }
            info.cover = httptoHttps(info.cover);
            info.owner.face = httptoHttps(info.owner.face);
            info.url = 'https://www.bilibili.com/' + info.id;
        }
        return info;
    }
}