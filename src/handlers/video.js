// src/handlers/video.js

import { httptoHttps } from "../utils.js";

export const videoHandler = {
    name: "video",
    keys: ["video_view"],
    match(url) {
        return /BV[a-zA-Z0-9]+/.test(url);
    },
    parse(url) {
        const idObj = {};
        const bvid = (url.match(/BV[a-zA-Z0-9]+/) || [])[0];
        if (!bvid) throw new Error("Video parse: no bvid");
        idObj.bvid = bvid;
        idObj.id = 'video/' + bvid;
        const pMatch = url.match(/[?&]p=(\d+)/);
        if (pMatch) {
            const p = parseInt(pMatch[1], 10);
            if (!isNaN(p) && p >= 1) {
                idObj.p = p;
                idObj.id = `video/${bvid}?p=${p}`;
            };
        }
        idObj.url = 'https://www.bilibili.com/' + idObj.id;
        return idObj;
    },
    async fetch(ctx, idObj) {
        const { bvid } = idObj;
        if (!bvid) throw new Error("Video fetch: no bvid");
        const res = await ctx.client.request({
            url: 'https://api.bilibili.com/x/web-interface/view',
            params: { bvid },
            desc: `获取视频信息 ${bvid}`
        });
        const videoView = res.data || {};
        return { ...idObj, video_view: videoView };
    },
    extract(data) {
        const info = {};
        const videoView = data?.video_view;
        if (videoView) {
            const bvid = videoView.bvid || data.bvid;
            Object.assign(info, {
                id: `video/${bvid}`,
                aid: videoView.aid,
                cid: videoView.cid,
                oid: videoView.aid,
                bvid,
                type: 1,
                duration: videoView.duration,
                title: videoView.title,
                desc: videoView.desc,
                cover: videoView.pic,
                pubtime: videoView.pubdate,
                owner: {
                    mid: videoView.owner?.mid,
                    name: videoView.owner?.name,
                    face: videoView.owner?.face
                },
                stat: {
                    view: videoView.stat?.view,
                    like: videoView.stat?.like,
                    coin: videoView.stat?.coin,
                    favorite: videoView.stat?.favorite,
                    share: videoView.stat?.share,
                    danmaku: videoView.stat?.danmaku,
                    reply: videoView.stat?.reply
                }
            });
            if (videoView.staff) {
                info.staff = [];
                videoView.staff.forEach(stf => {
                    info.staff.push({
                        mid: stf.mid,
                        name: stf.name,
                        face: stf.face,
                        role: stf.title
                    });
                });
            }
            const pages = videoView.pages;
            if (Array.isArray(pages)) {
                let p = data.p ? data.p - 1 : 0;
                const page = pages[p];
                if (p > 0) info.id = `video/${bvid}?p=${p + 1}`;
                if (pages.length > 1) info.subtitle = `第 ${p + 1} P：${page?.part || ''}`;
                if (page) {
                    info.cid = page.cid ?? info.cid;
                    info.duration = page.duration ?? info.duration;
                }
            }
            info.cover = httptoHttps(info.cover);
            info.owner.face = httptoHttps(info.owner.face);
            info.url = 'https://www.bilibili.com/' + info.id;
        }
        return info;
    },
    getCustomConfig(ctx, info) {
        //能获取被删视频是谁删的
        const { aid, bvid } = info;
        if (!bvid) throw new Error('no bvid');
        const params = { bvid };
        if (aid) params.aid = aid;
        return ctx.client.request({
            url: 'https://api.bilibili.com/x/web-interface/archive/custom/config',
            params,
            desc: `获取稿件自定义配置 ${bvid}`
        });
    }
}