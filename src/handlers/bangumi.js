// src/handlers/bangumi.js

import { httptoHttps } from "../utils.js";

export const bangumiHandler = {
    name: "bangumi",
    keys: ["bangumi_season_view", "bangumi_episode_info"],
    match(url) {
        return /(ep|ss)\d+/.test(url) && !/cheese/i.test(url);
    },
    parse(url) {
        const m = url.match(/(ep|ss)(\d+)/i);
        if (!m) throw new Error("Bangumi parse: no ep/ss");

        const kind = m[1].toLowerCase(); // ep | ss
        const num = parseInt(m[2], 10);
        const idKey = (kind === 'ss' ? 'season_id' : 'ep_id');
        return {
            [idKey]: num,
            id: `bangumi/play/${kind}${num}`,
            url: `https://www.bilibili.com/bangumi/play/${kind}${num}`,
        };
    },
    async fetch(ctx, idObj) {
        let { ep_id, season_id } = idObj;
        if (!ep_id && !season_id) throw new Error("Bangumi fetch: no ep_id or season_id");
        const seasonParams = ep_id ? { ep_id } : { season_id };
        const seasonRes = await ctx.client.request({
            url: 'https://api.bilibili.com/pgc/view/web/season',
            params: seasonParams,
            desc: `获取剧集明细 ${ep_id ? 'ep' + ep_id : 'ss' + season_id}`
        });
        const seasonView = seasonRes.result || {};
        if (!ep_id) {
            if (seasonView?.user_status?.progress?.last_ep_id) {
                ep_id = seasonView.user_status.progress.last_ep_id;
                idObj.ep_id = ep_id;
            }
        }
        if (ep_id) {
            const episodeRes = await ctx.client.request({
                url: 'https://api.bilibili.com/pgc/season/episode/web/info',
                params: { ep_id },
                desc: `获取剧集信息 ${ep_id}`
            });
            const episodeInfo = episodeRes.data || {};
            return { ...idObj, bangumi_season_view: seasonView, bangumi_episode_info: episodeInfo };
        } else {
            return { ...idObj, bangumi_season_view: seasonView };
        }
    },
    extract(data) {
        const info = {};
        const seasonView = data?.bangumi_season_view;
        if (seasonView) {
            const season_id = seasonView.season_id || data.season_id;
            Object.assign(info, {
                id: `bangumi/play/ss${season_id}`,
                season_id: season_id,
                type: 1,
                title: seasonView.season_title,
                desc: seasonView.evaluate,
                cover: seasonView.cover,
                pubtime: Math.floor(Date.parse(seasonView.publish?.pub_time) / 1000),
                owner: {
                    mid: seasonView.up_info?.mid,
                    name: seasonView.up_info?.uname,
                    face: seasonView.up_info?.avatar
                },
                stat: {
                    view: seasonView.stat?.views,
                    like: seasonView.stat?.likes,
                    coin: seasonView.stat?.coins,
                    favorite: seasonView.stat?.favorites,
                    share: seasonView.stat?.share,
                    danmaku: seasonView.stat?.danmakus,
                    reply: seasonView.stat?.reply
                }
            });
            const ep_id = data.bangumi_episode_info?.episode_id || data.ep_id;
            if (ep_id) {
                let ep = null;
                let sectionTitle = null;
                if (Array.isArray(seasonView.episodes)) {
                    ep = seasonView.episodes.find(e => e.ep_id === ep_id || e.id === ep_id);
                    if (ep) {
                        sectionTitle = '正片';
                    }
                }
                if (!ep && Array.isArray(seasonView.section)) {
                    for (const section of seasonView.section) {
                        ep = section.episodes?.find(e => e.ep_id === ep_id || e.id === ep_id);
                        if (ep) {
                            sectionTitle = section.title;
                            break;
                        }
                    }
                }
                if (!ep) throw new Error('Bangumi extract: ep not found');
                Object.assign(info, {
                    id: `bangumi/play/ep${ep_id}`,
                    ep_id: ep_id,
                    aid: ep.aid,
                    cid: ep.cid,
                    oid: ep.aid,
                    bvid: ep.bvid,
                    duration: Math.floor(ep.duration / 1000),
                    subtitle: `${sectionTitle}：${ep.show_title}`,
                    cover: ep.cover,
                    pubtime: ep.pub_time,
                });
                const episodeInfo = data.bangumi_episode_info;
                if (episodeInfo) {
                    Object.assign(info, {
                        owner: {
                            mid: episodeInfo.related_up?.[0]?.mid,
                            name: episodeInfo.related_up?.[0]?.uname,
                            face: episodeInfo.related_up?.[0]?.avatar
                        },
                        stat: {
                            view: episodeInfo.stat.view,
                            like: episodeInfo.stat.like,
                            coin: episodeInfo.stat.coin,
                            favorite: episodeInfo.stat.favorite,
                            share: episodeInfo.stat.share,
                            danmaku: episodeInfo.stat.dm,
                            comment: episodeInfo.stat.reply
                        }
                    });
                    if (episodeInfo.related_up?.length > 1) {
                        info.staff = [];
                        episodeInfo.related_up.forEach(stf => {
                            info.staff.push({
                                mid: stf.mid,
                                name: stf.uname,
                                face: stf.avatar,
                            });
                        });
                    }
                }
            }
            info.cover = httptoHttps(info.cover);
            info.owner.face = httptoHttps(info.owner.face);
            info.url = 'https://www.bilibili.com/' + info.id;
        }
        return info;
    }
}