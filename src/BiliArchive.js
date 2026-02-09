// src/BiliArchive.js

import { handler, handlerList } from "./handlers/handler.js";

export class BiliArchive {
    constructor(ctx, handlers) {
        this.ctx = ctx;
        this.logger = ctx.logger || new Proxy({}, { get: () => () => { } });

        this.handlers = [];
        handlers = Array.isArray(handlers) ? handlers : (handlers ? [handlers] : handlerList);
        for (const h of handlers) {
            if (typeof h === "string" && handler[h]) h = handler[h];
            if (h && h.name) this.handlers.push(h);
        }

        this.info = {};
        this.data = {};
        this._handler = null;
    }
    static parseUrl(url, handlers) {
        handlers = handlers || [];
        const h = handlers.find((x) => x.match(url));
        return h ? h.parse(url) : {};
    }
    _pickHandler(input) {
        let handler = null;

        if (typeof input === "object" && input !== null) {
            handler = this.handlers.find((h) => {
                return h.keys && Array.isArray(h.keys)
                    && h.keys.some(key => Object.prototype.hasOwnProperty.call(input, key));
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
            return null;
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
            return null;
        }
    }
}
