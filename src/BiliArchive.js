// src/BiliArchive.js

import { handler, handlerList } from "./handlers/handler.js";
import { filterData } from "./utils.js";

const PLAYER_INFO_BLACKLIST = [
    "ip_info",
    "login_mid",
    "login_mid_hash",
    "is_owner",
    "name",
    "level_info",
    "vip",
    "answer_status",
    "block_time",
    "role",
];

export class BiliArchive {
    constructor(ctx, handlers) {
        this.ctx = ctx;
        this.logger = ctx.logger || new Proxy({}, { get: () => () => {} });

        this.handlers = [];
        handlers = Array.isArray(handlers)
            ? handlers
            : handlers
              ? [handlers]
              : handlerList;
        for (let h of handlers) {
            if (typeof h === "string" && handler[h]) h = handler[h];
            if (h && h.name) this.handlers.push(h);
        }

        this.info = {};
        this.data = {};
        this._handler = null;
    }
    static parseUrl(url, handlers) {
        handlers = Array.isArray(handlers)
            ? handlers
            : handlers
              ? [handlers]
              : handlerList;
        for (let h of handlers) {
            if (typeof h === "string" && handler[h]) h = handler[h];
            if (h && h.match) {
                if (h.match(url)) return h.parse(url);
            }
        }
        return {};
    }
    _pickHandler(input) {
        let handler = null;

        if (typeof input === "object" && input !== null) {
            handler = this.handlers.find((h) => {
                return (
                    h.keys &&
                    Array.isArray(h.keys) &&
                    h.keys.some((key) =>
                        Object.prototype.hasOwnProperty.call(input, key),
                    )
                );
            });
        }
        if (!handler) {
            const url = typeof input === "string" ? input : input?.url;
            if (url) handler = this.handlers.find((h) => h.match(url));
        }
        if (!handler) throw new Error("No handler matched");

        this._handler = handler;
    }
    clearData() {
        this.info = {};
        this.data = {};
        this._handler = null;
    }
    async getData(url) {
        try {
            this.clearData();
            this._pickHandler(url);
            const idObj = this._handler.parse(url);
            this.data = { ...idObj };
            const raw = await this._handler.fetch(this.ctx, idObj);
            this.data.fetchtime = Math.floor(Date.now() / 1000);
            Object.assign(this.data, raw);
            this.info = this._handler.extract(this.data);
            this.info.fetchtime = this.data.fetchtime;
            return this.info;
        } catch (e) {
            this.logger.error("BiliArchive getData error:", e);
            throw e;
        }
    }
    setData(data) {
        try {
            this.clearData();
            this._pickHandler(data);
            Object.assign(this.data, data);
            this.info = this._handler.extract(this.data);
            this.info.fetchtime = this.data.fetchtime ?? 0;
            return this.info;
        } catch (e) {
            this.logger.error("BiliArchive setData error:", e);
            throw e;
        }
    }
    async getPlayerInfo() {
        const aid = this.info?.aid ?? this.data?.aid;
        const cid = this.info?.cid ?? this.data?.cid;
        if (!aid || !cid) {
            this.logger.warn(
                "BiliArchive getPlayerInfo failed: missing aid/cid",
            );
            return null;
        }
        try {
            const res = await this.ctx.client.request({
                url: "https://api.bilibili.com/x/player/wbi/v2",
                params: { aid, cid },
                sign: true,
                desc: `获取播放器信息 aid=${aid} cid=${cid}`,
            });
            const playerInfo = filterData(
                res?.data || {},
                PLAYER_INFO_BLACKLIST,
                false,
            );
            this.data.player_info = playerInfo;
            return playerInfo;
        } catch (e) {
            this.logger.error("BiliArchive getPlayerInfo error:", e);
            return null;
        }
    }
    async getOnline() {
        const { aid, cid } = this.info || {};
        if (!aid || !cid) {
            this.logger.warn(
                "BiliArchive getOnline failed: missing info.aid/info.cid",
            );
            return null;
        }
        try {
            const res = await this.ctx.client.request({
                url: "https://api.bilibili.com/x/player/online/total",
                params: { aid, cid },
                desc: `获取视频在线人数 aid=${aid} cid=${cid}`,
            });
            return res?.data || {};
        } catch (e) {
            this.logger.error("BiliArchive getOnline error:", e);
            return null;
        }
    }
    invoke(method, ...args) {
        if (!this._handler) {
            throw new Error("No handler selected, call getData/setData first");
        }
        if (typeof method !== "string" || !method.trim()) {
            throw new TypeError(
                "invoke(method): method must be a non-empty string",
            );
        }
        const fn = this._handler[method];
        if (typeof fn !== "function") {
            throw new Error(
                `Handler \"${this._handler.name}\" has no method \"${method}\"`,
            );
        }
        return fn.call(this._handler, this, ...args);
    }
}
