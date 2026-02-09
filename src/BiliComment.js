// src/BiliComment.js

import { sleep } from "./utils.js";

class BiliCmtApi {
    constructor(client) {
        this.client = client;
    }
    async getMain(type, oid, mode = 2, offset = "") {
        const params = { type, oid, mode };
        if (typeof offset === "string") params.pagination_str = JSON.stringify({ offset });

        const res = await this.client.request({
            url: "https://api.bilibili.com/x/v2/reply/wbi/main",
            params,
            responseType: "json",
            sign: true,
            desc: `获取评论主列表 oid=${oid} type=${type} mode=${mode} offset=${offset}`,
        });
        return res?.data;
    }
    async getReply({ type, oid, root, pn = 1, ps = 10 }) {
        const res = await this.client.request({
            url: "https://api.bilibili.com/x/v2/reply/reply",
            params: { type, oid, root, pn, ps },
            responseType: "json",
            desc: `获取子评论列表 oid=${oid} type=${type} root=${root} pn=${pn} ps=${ps}`,
        });
        return res?.data || {};
    }
    async getCount({ type, oid }) {
        const res = await this.client.request({
            url: "https://api.bilibili.com/x/v2/reply/count",
            params: { type, oid },
            responseType: "json",
            desc: `获取评论总数 oid=${oid} type=${type}`,
        });
        return res?.data;
    }
    async getNote({ cvid }) {
        const res = await this.client.request({
            url: "https://api.bilibili.com/x/note/publish/info",
            params: { cvid },
            responseType: "json",
            desc: `获取笔记 ${cvid}`,
        });
        return res?.data;
    }
}

export class ReplyTree {
    constructor() {
        this.clear();
    }
    clear() {
        this.dict = {};     // rpid -> full reply
        this.nodes = {};    // rpid -> { rpid, root,parent,dialog, rcount }
        this.topSet = new Set();
    }
    pickId(r, key) {
        const v = r?.[`${key}_str`] ?? r?.[key];
        return v ? String(v) : "0";
    }
    validId(id) {
        return (id && id !== "0");
    }
    setTop(topReplies) {
        this.topSet.clear();
        const arr = Array.isArray(topReplies) ? topReplies : [];
        arr.forEach((r) => {
            const rpid = this.pickId(r, "rpid");
            if (this.validId(rpid)) {
                this.topSet.add(rpid);
            }
        });
    }
    _add(reply) {
        if (!reply) return;
        const rpid = this.pickId(reply, "rpid");
        if (!this.validId(rpid)) return;

        if (this.dict[rpid]) Object.assign(this.dict[rpid], reply);
        else this.dict[rpid] = { ...reply };
    }
    add(reply) {
        this._add(reply);
        if (Array.isArray(reply?.replies)) {
            for (const sub of reply.replies) this._add(sub);
        }
    }
    _ensureNode(rpid, init) {
        if (!this.nodes[rpid]) {
            this.nodes[rpid] = {
                rpid,
                root: "0",
                dialog: "0",
                parent: "0",
                rcount: 0,
                level: 0,              // 0:占位 1:根评论 2:二级评论 3:三级评论 4:三级以上评论
                isPlaceholder: true,   // 占位
                isLinked: false,       // 是否已链接
                childrenSet: null,
                dialogSet: null,       // 二级 才有
                subSet: null,          // 根 才有
                ...init,
            };
        }
        return this.nodes[rpid];
    }
    _linkNode(node) {
        if (node.isLinked) return;
        const { rpid, root, parent, dialog } = node;
        if (this.validId(root)) {
            const rootNode = this._ensureNode(root, { level: 1 });
            rootNode.subSet ??= new Set();
            rootNode.subSet.add(rpid);
            if (rootNode.isPlaceholder) this._linkNode(rootNode);
        }
        if (this.validId(dialog) && rpid !== dialog) {
            const dialogNode = this._ensureNode(dialog, { root, dialog, parent: root, level: 2 });
            dialogNode.dialogSet ??= new Set();
            dialogNode.dialogSet.add(rpid);
            if (dialogNode.isPlaceholder) this._linkNode(dialogNode);
        }
        if (this.validId(parent)) {
            let init = { level: node.level - 1 };
            if (node.level === 3) init = { root, dialog, parent: root, level: 2 };
            else if (node.level > 3) init = { root, dialog, parent: dialog, level: 3 };
            const parentNode = this._ensureNode(parent, init);
            parentNode.childrenSet ??= new Set();
            parentNode.childrenSet.add(rpid);
            if (parentNode.isPlaceholder) this._linkNode(parentNode);
        }
        node.isLinked = true;
    }
    buildNodes() {
        this.nodes = {};

        for (const [rpid, reply] of Object.entries(this.dict)) {
            const root = this.pickId(reply, "root");
            const parent = this.pickId(reply, "parent");
            const dialog = this.pickId(reply, "dialog");

            const node = this._ensureNode(rpid, { root, dialog, parent });
            node.isPlaceholder = false;
            if (root === "0") node.level = 1;
            else if (root === parent) node.level = 2;
            else if (parent === dialog) node.level = 3;
            else node.level = 4;
            node.rcount = reply.rcount ?? 0;
        }
        Object.values(this.nodes).forEach(node => this._linkNode(node));

        return this.nodes;
    }
    getIncompleteRoots() {
        return Object.values(this.nodes).filter(node => {
            if (node.isPlaceholder) return false;
            if (node.level !== 1) return false;
            const sub = node.subSet;
            let localRealCount = 0;
            if (sub) {
                for (const id of sub) {
                    const n = this.nodes[id];
                    if (n && !n.isPlaceholder) localRealCount++;
                }
            }
            return node.rcount !== localRealCount;
        }).map(node => node.rpid);
    }
    toTree({ depth = 2, sort = "like" } = {}) {
        if (!this.nodes || Object.keys(this.nodes).length === 0) {
            this.buildNodes();
        }
        const dict = this.dict;
        const nodes = this.nodes;

        const getTime = (id) => {
            const r = dict?.[id];
            const num = Number(r?.ctime ?? 0);
            return Number.isFinite(num) ? num : 0;
        };
        const getLike = (id) => {
            const r = dict?.[id];
            const num = Number(r?.like ?? 0);
            return Number.isFinite(num) ? num : 0;
        };
        const getReplyCount = (id) => {
            const r = dict?.[id];
            const num = Number(r?.rcount ?? 0);
            return Number.isFinite(num) ? num : 0;
        };

        const sortIds = (ids, isRoot = false) => {
            return ids.sort((a, b) => {
                if (isRoot) {
                    const at = this.topSet?.has(a) ? 0 : 1;
                    const bt = this.topSet?.has(b) ? 0 : 1;
                    if (at !== bt) return at - bt;
                    if (sort === "like") {
                        const la = getLike(a), lb = getLike(b);
                        if (la !== lb) return lb - la; // 点赞：高到低
                    } else if (sort === "reply") {
                        const ra = getReplyCount(a), rb = getReplyCount(b);
                        if (ra !== rb) return rb - ra; // 回复数：高到低
                    }
                }
                const ta = getTime(a), tb = getTime(b);
                if (ta !== tb) return ta - tb;     // 时间：旧到新
                return String(a).localeCompare(String(b));
            });
        };

        const items = {};
        for (const [rpid] of Object.entries(nodes)) {
            items[rpid] = { rpid, reply: dict?.[rpid] ?? null };
            if (this.topSet?.has(rpid)) items[rpid].isTop = true;
        }

        const idsToNodes = (ids, childBuilder) => {
            if (!ids) return [];
            return sortIds([...ids]).map((cid) => childBuilder(cid)).filter(Boolean);
        };

        const built = new Map();
        const buildNode = (id) => {
            const it = items[id];
            if (!it) return null;
            if (built.has(id)) return built.get(id);
            const node = nodes?.[id];
            built.set(id, it);

            if (depth === 1) {
                if (node?.level === 1) {
                    it.children = idsToNodes(node?.subSet, cid => items[cid]);
                }
            } else if (depth === 2) {
                if (node?.level === 1) {
                    it.children = idsToNodes(node?.childrenSet, cid => buildNode(cid));
                } else if (node?.level === 2) {
                    it.children = idsToNodes(node?.dialogSet, cid => items[cid]);
                }
            } else {
                it.children = idsToNodes(node?.childrenSet, cid => buildNode(cid));
            }
            if (it.children && it.children.length > 0) {
                it.rcount = it.children.reduce((acc, child) => {
                    if (child.reply) {
                        return acc + 1 + (child.rcount || 0);
                    } else {
                        return acc + (child.rcount || 0);
                    }
                }, 0);
            } else {
                it.rcount = 0;
            }
            return it;
        };

        const rootIds = Object.values(nodes)
            .filter((n) => n && n.level === 1 && items[n.rpid])
            .map((n) => n.rpid);

        return sortIds(rootIds, true).map(buildNode).filter(Boolean);
    }
}

export class BiliComment {
    constructor(ctx, info) {
        this.ctx = ctx;
        this.info = info || {};
        this.client = ctx.client;
        this.logger = ctx.logger || new Proxy({}, { get: () => () => { } });

        this.api = new BiliCmtApi(this.client);

        this.data = {};
        this.replyTree = new ReplyTree();
        this.replyCount = 0;

        this.noteDict = {};
        this.noteSet = new Set();

        this.sleepTime = {
            long: { base: 2000, jitter: 2000 },
            short: { base: 500, jitter: 500 },
        }
    }
    addList(list) {
        if (!Array.isArray(list)) return;
        for (const r of list) {
            this.replyTree.add(r);
            const cvid = this.replyTree.pickId(r, 'note_cvid');
            if (cvid && cvid !== "0") {
                this.noteSet.add(cvid);
            }
        }
    }
    setData(data) {
        this.clearData();
        const topReplies = data.top_comment_list || [];
        if (topReplies.length) {
            this.data.top_comment_list = topReplies;
            this.replyTree.setTop(topReplies);
            this.addList(topReplies);
        }
        const replies = data.comment_list || [];
        this.addList(replies);

        const notes = data.note_list || [];
        for (const note of notes) {
            if (note.cvid) {
                const key = String(note.cvid);
                this.noteDict[key] = note;
            }
        }

        this.buildData();
    }
    clearData() {
        this.replyTree.clear();
        this.buildData();
        if (this.data.top_comment_list) delete this.data.top_comment_list;
    }
    buildData() {
        this.replyTree.buildNodes();
        this.data.comment_list = Object.values(this.replyTree.dict);
        this.replyCount = this.data.comment_list.length;

        const notes = Object.values(this.noteDict);
        if (notes.length) {
            this.data.note_list = notes;
        }
    }
    async getNote(noteIds = []) {
        noteIds.forEach(cvid => this.noteSet.add(String(cvid)));
        for (const cvid of this.noteSet) {
            if (cvid in this.noteDict) continue;
            if (cvid === "0") continue;
            const note = await this.api.getNote({ cvid });
            if (note) {
                this.noteDict[cvid] = note;
            }
        }
        this.noteSet.clear();
    }
    async getMainPage(mode = 2, offset = "") {
        const { type, oid } = this.info;
        if (!type || !oid) {
            this.logger.warn("获取主评论失败：未找到 type/oid，请检查 info");
            return { rise: -1, nextOffset: "", pageData: null };
        }
        const startCount = this.replyCount;

        const pageData = await this.api.getMain(type, oid, mode, offset);
        if (!pageData) {
            throw new Error('获取主评论失败：无返回数据');
        }
        const replies = pageData.replies || [];
        const topReplies = pageData.top_replies || [];

        if (topReplies.length) {
            this.data.top_comment_list = topReplies;
            this.replyTree.setTop(topReplies);
            this.addList(topReplies);
        }
        this.addList(replies);
        this.buildData();

        const next = pageData?.cursor?.pagination_reply?.next_offset;
        const nextOffset = next ? String(next) : "";

        return {
            rise: this.replyCount - startCount,
            nextOffset,
            pageData,
        };
    }
    async getMain({ mode = 2, within = -1, sub = false, note = true, onProgress } = {}) {
        const desc = "获取评论主列表";

        let stopCtime = null;
        if (within < 0) {
            stopCtime = null;
        } else if (within === 0) {
            let latest = 0;
            for (const r of Object.values(this.replyTree?.dict || {})) {
                // 只统计根评论
                const rootId = this.replyTree.pickId(r, "root");
                if (rootId === "0") {
                    const t = Number(r?.ctime ?? 0);
                    if (Number.isFinite(t) && t > latest) latest = t;
                }
            }
            stopCtime = latest;
        } else {
            const now = Math.floor(Date.now() / 1000);
            stopCtime = now - within;
        }

        this.logger.time(desc + " 总耗时");
        const startCount = this.replyCount;

        let offset = "";
        let page = 0;
        while (true) {
            try {
                const { nextOffset, pageData } = await this.getMainPage(mode, offset);
                page++;
                if (typeof onProgress === 'function') {
                    await onProgress(this.replyCount);
                }

                if (stopCtime !== null) {
                    const list = pageData?.replies || [];
                    let hitOlder = false;
                    for (const r of list) {
                        const t = Number(r?.ctime ?? 0);
                        if (Number.isFinite(t) && t > 0 && t < stopCtime) {
                            hitOlder = true;
                            break;
                        }
                    }
                    if (hitOlder) break;
                }

                await sleep({
                    ...this.sleepTime?.long,
                    beforeFn: (d) => this.logger.log(`${desc} 第${page + 1}页，延时 ${d} 毫秒`)
                });

                if (note) await this.getNote();
                if (sub) await this.getSub();

                if (!nextOffset) break;
                offset = nextOffset;
            } catch (e) {
                this.logger.error(`${desc} 第${page + 1}页失败 offset=${offset}`, e);
                break;
            }
        }
        this.logger.timeEnd(desc + " 总耗时");
        this.logger.log("新增评论", this.replyCount - startCount);
        return this.replyCount - startCount;
    }
    async getSub(rootId = null) {
        const { type, oid } = this.info;
        if (!type || !oid) {
            this.logger.warn("获取子评论列表 失败：未找到 type/oid，请检查参数");
            return -1;
        }
        let roots = [];
        if (!rootId) {
            roots = this.replyTree.getIncompleteRoots();
        } else if (Array.isArray(rootId)) {
            roots = rootId;
        } else {
            roots = [rootId];
        }
        if (roots.length === 0) {
            return 0;
        }
        const startCount = this.replyCount;

        for (let i = 0; i < roots.length; i++) {
            const root = roots[i];
            const desc = `获取子评论列表 root=${root}`;
            this.logger.time(desc + ' 总耗时');
            const rootObj = this.replyTree.dict[root];
            let pn = 1;
            while (true) {
                try {
                    const data = await this.api.getReply({ type, oid, root, pn, ps: 20 });
                    const replies = data?.replies || [];
                    if (!replies.length) break;
                    this.addList(replies);

                    const page = data?.page;
                    if (!page) break;
                    const num = Number(page.num || pn);
                    const size = Number(page.size || 20);
                    const count = Number(page.count || 0);
                    if (rootObj) rootObj.rcount = count;
                    if (num * size >= count) break;

                    pn = num + 1;
                    await sleep({
                        ...this.sleepTime.short,
                        beforeFn: (d) => this.logger.log(`${desc} 第${pn}页，延时 ${d} 毫秒`)
                    });
                } catch (e) {
                    this.logger.error(`${desc} 页码 ${pn} 失败`, e);
                    break;
                }
            }
            this.logger.timeEnd(desc + ' 总耗时');
            if (i < roots.length - 1) {
                await sleep({
                    ...this.sleepTime.short,
                    beforeFn: (d) => this.logger.log(`${desc} [${i + 1}/${roots.length}]，延时 ${d} 毫秒`)
                });
            }
        }
        this.buildData();
        this.logger.log('新增评论', this.replyCount - startCount);
        return this.replyCount - startCount;
    }
    async getReply() {
        await this.getMain({ sub: true });
        await this.getSub();
        await this.getNote();
    }
    async getCount() {
        const { type, oid } = this.info;
        if (!type || !oid) throw new Error("获取评论数量失败：未找到 type/oid，请检查 info");
        return this.api.getCount({ type, oid });
    }
}
