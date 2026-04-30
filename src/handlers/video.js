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
        idObj.id = "video/" + bvid;
        const pMatch = url.match(/[?&]p=(\d+)/);
        if (pMatch) {
            const p = parseInt(pMatch[1], 10);
            if (!isNaN(p) && p >= 1) {
                idObj.p = p;
                idObj.id = `video/${bvid}?p=${p}`;
            }
        }
        idObj.url = "https://www.bilibili.com/" + idObj.id;
        return idObj;
    },
    async fetch(ctx, idObj) {
        const { bvid } = idObj;
        if (!bvid) throw new Error("Video fetch: no bvid");
        const res = await ctx.client.request({
            url: "https://api.bilibili.com/x/web-interface/view",
            params: { bvid },
            desc: `获取视频信息 ${bvid}`,
        });
        const videoView = res.data || {};
        return { ...idObj, video_view: videoView };
    },
    extract(data) {
        const info = {};
        const videoView = data?.video_view ?? data?.videoData;
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
                    face: videoView.owner?.face,
                },
                stat: {
                    view: videoView.stat?.view,
                    like: videoView.stat?.like,
                    coin: videoView.stat?.coin,
                    favorite: videoView.stat?.favorite,
                    share: videoView.stat?.share,
                    danmaku: videoView.stat?.danmaku,
                    reply: videoView.stat?.reply,
                },
            });
            if (videoView.staff) {
                info.staff = [];
                videoView.staff.forEach((stf) => {
                    info.staff.push({
                        mid: stf.mid,
                        name: stf.name,
                        face: stf.face,
                        role: stf.title,
                    });
                });
            }
            const pages = videoView.pages;
            if (Array.isArray(pages)) {
                let p = data.p ? data.p - 1 : 0;
                const page = pages[p];
                if (p > 0) info.id = `video/${bvid}?p=${p + 1}`;
                if (pages.length > 1)
                    info.subtitle = `第 ${p + 1} P：${page?.part || ""}`;
                if (page) {
                    info.cid = page.cid ?? info.cid;
                    info.duration = page.duration ?? info.duration;
                }
            }
            info.cover = httptoHttps(info.cover);
            info.owner.face = httptoHttps(info.owner.face);
            info.url = "https://www.bilibili.com/" + info.id;
        }
        return info;
    },
    getCustomConfig(self) {
        //能获取被删视频是谁删的
        const { aid, bvid } = self.info || {};
        if (!bvid) throw new Error("no bvid");
        const params = { bvid };
        if (aid) params.aid = aid;
        return self.ctx.client.request({
            url: "https://api.bilibili.com/x/web-interface/archive/custom/config",
            params,
            desc: `获取稿件自定义配置 ${bvid}`,
        });
    },
    async getInteractEdgeInfo(self, onProgress = async () => {}) {
        const aid = self.info?.aid;
        const graphVersion = self.data?.player_info?.interaction?.graph_version;
        if (!aid || !graphVersion) {
            throw new Error(
                "getInteractEdgeInfo: missing aid or graph_version",
            );
        }

        if (!Array.isArray(self.data.interact_edge_info_list)) {
            self.data.interact_edge_info_list = [];
        }

        const expanded = new Set();

        const walk = async (edgeId = null) => {
            const currentId = edgeId == null ? 1 : edgeId;
            if (expanded.has(currentId)) {
                return;
            }
            expanded.add(currentId);

            let data = self.data.interact_edge_info_list.find(
                (item) => item?.edge_id === currentId,
            );
            if (!data) {
                const params = {
                    aid,
                    graph_version: graphVersion,
                };
                if (edgeId != null) {
                    params.edge_id = edgeId;
                }

                const res = await self.ctx.client.request({
                    url: "https://api.bilibili.com/x/stein/edgeinfo_v2",
                    params,
                    desc:
                        edgeId == null
                            ? `获取互动视频 aid=${aid} 起始节点`
                            : `获取互动视频 aid=${aid} 节点 edge_id=${edgeId}`,
                });
                data = res?.data || {};
                const currentEdgeId = data.edge_id;
                if (currentEdgeId == null) {
                    throw new Error("getInteractEdgeInfo: edgeinfo has no edge_id");
                }
                self.data.interact_edge_info_list.push(data);
                await onProgress(data, {
                    edge_id: currentEdgeId,
                    count: self.data.interact_edge_info_list.length,
                });
            }

            const choices = data?.edges?.questions?.[0]?.choices;
            if (!Array.isArray(choices)) {
                return;
            }
            for (const choice of choices) {
                const nextEdgeId = choice?.id;
                if (nextEdgeId == null) {
                    continue;
                }
                await walk(nextEdgeId);
            }
        };

        await walk(null);
        return self.data.interact_edge_info_list;
    },
    clearInteractEdgeInfo(self) {
        delete self.data.interact_edge_info_list;
    },
    buildInteractGraph(self, dedupe = false) {
        const list = Array.isArray(self.data?.interact_edge_info_list)
            ? self.data.interact_edge_info_list
            : [];
        const graph = {};

        const ensureNode = (id, cid, title) => {
            if (id == null) return null;
            const key = String(id);
            graph[key] ??= { id, cid: null, title: null, in: [], out: [] };
            if (cid != null) graph[key].cid ??= cid;
            if (title != null) graph[key].title = title;
            return graph[key];
        };

        for (const item of list) {
            const sourceId = item?.edge_id;
            if (sourceId == null) {
                continue;
            }
            ensureNode(
                sourceId,
                sourceId === 1 ? self.info?.cid : undefined,
                item?.title,
            );
            const choices = item?.edges?.questions?.[0]?.choices;
            if (!Array.isArray(choices)) {
                continue;
            }
            for (const choice of choices) {
                const targetId = choice?.id;
                if (targetId == null) {
                    continue;
                }
                ensureNode(targetId, choice?.cid);
                const sourceKey = String(sourceId);
                const targetKey = String(targetId);
                const option = choice?.option;
                graph[sourceKey].out.push({ id: targetId, option });
                graph[targetKey].in.push({ id: sourceId, option });
            }
        }

        if (!dedupe) {
            return graph;
        }

        const nodeIds = Object.keys(graph);
        const signatureMap = new Map();

        for (const key of nodeIds) {
            const node = graph[key];
            const outSig = [...node.out]
                .map((edge) => ({ id: edge.id, option: edge.option ?? null }))
                .sort((a, b) => {
                    if (a.id !== b.id) return a.id - b.id;
                    if (a.option === b.option) return 0;
                    return String(a.option).localeCompare(String(b.option));
                });
            const sig = JSON.stringify({
                cid: node.cid ?? null,
                title: node.title ?? null,
                out: outSig,
            });
            if (!signatureMap.has(sig)) signatureMap.set(sig, []);
            signatureMap.get(sig).push(node.id);
        }

        const replaceMap = new Map();
        for (const ids of signatureMap.values()) {
            if (ids.length <= 1) continue;
            ids.sort((a, b) => a - b);
            const keepId = ids[0];
            const mergedIds = ids.slice(1);
            const keepNode = graph[String(keepId)];
            keepNode.merged_ids = mergedIds;
            for (const dropId of mergedIds) {
                replaceMap.set(dropId, keepId);
            }
        }

        if (!replaceMap.size) {
            return graph;
        }

        for (const key of Object.keys(graph)) {
            const node = graph[key];
            node.out = node.out.map((edge) => ({
                id: replaceMap.get(edge.id) ?? edge.id,
                option: edge.option,
            }));
            node.in = [];
        }

        for (const dropId of replaceMap.keys()) {
            delete graph[String(dropId)];
        }

        for (const sourceKey of Object.keys(graph)) {
            const sourceNode = graph[sourceKey];
            for (const edge of sourceNode.out) {
                const targetNode = graph[String(edge.id)];
                if (!targetNode) continue;
                targetNode.in.push({ id: sourceNode.id, option: edge.option });
            }
        }

        return graph;
    },
    buildInfoByGraphNode(self, node = {}) {
        return {
            ...self.info,
            cid: node?.cid,
            subtitle: `互动：${node?.title ?? ""}`,
        };
    },
};
