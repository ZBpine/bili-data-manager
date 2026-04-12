// src/BiliUser.js

const midHash = (() => {
    const CRCPOLYNOMIAL = 0xedb88320;
    let crcTable = null;

    const ensureCRCTable = () => {
        if (crcTable) {
            return crcTable;
        }
        crcTable = new Array(256);
        for (let i = 0; i < 256; i++) {
            let crcreg = i;
            for (let j = 0; j < 8; j++) {
                if ((crcreg & 1) !== 0) {
                    crcreg = CRCPOLYNOMIAL ^ (crcreg >>> 1);
                } else {
                    crcreg >>>= 1;
                }
            }
            crcTable[i] = crcreg;
        }
        return crcTable;
    };

    const crc32 = (input) => {
        const table = ensureCRCTable();
        const text = typeof input === "string" ? input : String(input);
        let crcstart = 0xffffffff;
        for (let i = 0; i < text.length; i++) {
            const index = (crcstart ^ text.charCodeAt(i)) & 0xff;
            crcstart = (crcstart >>> 8) ^ table[index];
        }
        return crcstart;
    };

    const crc32LastIndex = (input) => {
        const table = ensureCRCTable();
        const text = typeof input === "string" ? input : String(input);
        let crcstart = 0xffffffff;
        let index = 0;
        for (let i = 0; i < text.length; i++) {
            index = (crcstart ^ text.charCodeAt(i)) & 0xff;
            crcstart = (crcstart >>> 8) ^ table[index];
        }
        return index;
    };

    const getCRCIndex = (t) => {
        const table = ensureCRCTable();
        for (let i = 0; i < 256; i++) {
            if ((table[i] >>> 24) === t) {
                return i;
            }
        }
        return -1;
    };

    const deepCheck = (i, index) => {
        const table = ensureCRCTable();
        let hash = crc32(i);
        let tc = (hash & 0xff) ^ index[2];
        if (tc < 48 || tc > 57) {
            return [0];
        }
        let str = String(tc - 48);

        hash = table[index[2]] ^ (hash >>> 8);
        tc = (hash & 0xff) ^ index[1];
        if (tc < 48 || tc > 57) {
            return [0];
        }
        str += String(tc - 48);

        hash = table[index[1]] ^ (hash >>> 8);
        tc = (hash & 0xff) ^ index[0];
        if (tc < 48 || tc > 57) {
            return [0];
        }
        str += String(tc - 48);

        return [1, str];
    };

    const normalizeHash = (hashStr) => {
        if (hashStr == null) {
            return "";
        }
        let normalized = String(hashStr).trim().toLowerCase();
        if (normalized.startsWith("0x")) {
            normalized = normalized.slice(2);
        }
        if (!/^[0-9a-f]{1,8}$/.test(normalized)) {
            return "";
        }
        return normalized;
    };

    const midToHash = (mid) => {
        if (mid == null) {
            return "";
        }
        const input = String(mid).trim();
        if (!input) {
            return "";
        }
        const table = ensureCRCTable();
        let crc = 0xffffffff;
        for (let i = 0; i < input.length; i++) {
            const byte = input.charCodeAt(i);
            crc = (crc >>> 8) ^ table[(crc ^ byte) & 0xff];
        }
        return ((crc ^ 0xffffffff) >>> 0).toString(16);
    };

    const hashToMid = (hashStr, maxTry = 100_000_000) => {
        const normalizedHash = normalizeHash(hashStr);
        if (!normalizedHash) {
            return -1;
        }
        const table = ensureCRCTable();
        const limit =
            Number.isFinite(maxTry) && maxTry > 0
                ? Math.floor(maxTry)
                : 100_000_000;
        const index = new Array(4);
        let ht = (parseInt(normalizedHash, 16) ^ 0xffffffff) >>> 0;
        let snum;
        let lastindex;
        let deepCheckData;
        let i;
        for (i = 3; i >= 0; i--) {
            index[3 - i] = getCRCIndex(ht >>> (i * 8));
            if (index[3 - i] < 0) {
                return -1;
            }
            snum = table[index[3 - i]];
            ht ^= snum >>> ((3 - i) * 8);
        }
        for (i = 0; i < limit; i++) {
            lastindex = crc32LastIndex(i);
            if (lastindex === index[3]) {
                deepCheckData = deepCheck(i, index);
                if (deepCheckData[0]) {
                    break;
                }
            }
        }

        if (i === limit || !deepCheckData?.[0]) {
            return -1;
        }
        return `${i}${deepCheckData[1]}`;
    };

    return {
        midToHash,
        hashToMid,
    };
})();

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
        if (typeof url !== "string") {
            return "";
        }
        const text = url.trim();
        const mid =
            text.match(/space\.bilibili\.com\/(\d+)/)?.[1] ||
            text.match(/\/(\d+)(?:[/?#]|$)/)?.[1] ||
            "";
        return mid;
    }
    static normalizeMid(midOrUrl) {
        if (midOrUrl == null) {
            return "";
        }
        if (typeof midOrUrl === "number" && Number.isFinite(midOrUrl)) {
            return String(Math.trunc(midOrUrl));
        }
        const text = String(midOrUrl).trim();
        if (!text) {
            return "";
        }
        if (/^\d+$/.test(text)) {
            return text;
        }
        return this.parseUrl(text);
    }
    static midToHash(mid) {
        return midHash.midToHash(mid);
    }
    static hashToMid(hashStr, maxTry = 100_000_000) {
        return midHash.hashToMid(hashStr, maxTry);
    }
    static getMidHash(mid) {
        return this.midToHash(mid);
    }
    constructor(ctx, mid) {
        this.ctx = ctx;
        this.mid = this.constructor.normalizeMid(mid);
        this.client = ctx.client;
        this.logger = ctx.logger || new Proxy({}, { get: () => () => {} });

        this.api = new BiliUserApi(this.client);
    }
    getMidHash() {
        return this.constructor.getMidHash(this.mid);
    }
    async getCard(photo = true) {
        const mid = this.mid;
        if (!mid) {
            return;
        }
        return await this.api.getCard(mid, photo);
    }
    async getInfo() {
        const mid = this.mid;
        if (!mid) {
            return;
        }
        return await this.api.getInfo(mid);
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
