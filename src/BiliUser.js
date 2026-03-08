// src/BiliUser.js

class BiliUserApi {
    constructor(client) {
        this.client = client;
    }
    async getCard(mid, photo = true) {
        const res = await this.client.request({
            url: "https://api.bilibili.com/x/web-interface/card",
            params: { mid, photo },
            responseType: "json",
            desc: `获取用户名片信息 ${mid}`,
        });
        return res.data || {};
    }
    async getInfo(mid) {
        const res = await this.client.request({
            url: "https://api.bilibili.com/x/space/wbi/acc/info",
            params: { mid },
            responseType: "json",
            sign: true,
            desc: `获取用户空间详细信息 ${mid}`,
        });
        return res.data || {};
    }
    /**
     * 获取用户空间视频列表
     * @param {number} mid 用户mid 必要
     * @param {string} order 排序方式
     * @param {string} keyword 关键词
     * @param {number} pn 页码
     * @param {number} ps 每页数量
     * @param {number} tid 视频分区
     */
    async search(params) {
        const res = await this.client.request({
            url: "https://api.bilibili.com/x/space/wbi/arc/search",
            params,
            responseType: "json",
            sign: true,
            desc: `搜索用户空间视频 ${params.mid}`,
        });
        return res.data || {};
    }
    /**
     * 获取用户空间视频列表
     * @param {number} mid 用户mid 必要
     * @param {string} keywords 关键词 必要 可空
     * @param {number} ps 每页数量
     * @param {number} pn 页码
     * @param {number} tid 视频分区
     * @param {string} orderby 排序方式
     * @param {number} series_id 系列id
     */
    async seriesSearch(params) {
        const res = await this.client.request({
            url: "https://api.bilibili.com/x/series/recArchivesByKeywords",
            params,
            responseType: "json",
            desc: `搜索用户空间系列视频 ${params.mid}`,
        });
        return res.data || {};
    }
}

export class BiliUser {
    static parseUrl(url) {
        const mid = url.match(/\/(\d+)/)?.[1];
        return mid;
    }
    constructor(ctx, mid) {
        this.ctx = ctx;
        this.mid = mid;
        this.client = ctx.client;
        this.logger = ctx.logger || new Proxy({}, { get: () => () => {} });

        this.api = new BiliUserApi(this.client);
    }
    async getArchives() {
        const mid = this.mid;
        if (!mid) {
            return;
        }
        return await this.api.search({ mid });
    }
    async getSeriesArchives() {
        const mid = this.mid;
        if (!mid) {
            return;
        }
        return await this.api.seriesSearch({ mid, keywords: "" });
    }
}
