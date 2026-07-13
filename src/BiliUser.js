// src/BiliUser.js

const midHash = (() => {
    const CRCPOLYNOMIAL = 0xedb88320;
    const crcTable = new Uint32Array(256);
    const crcReverseIndex = new Int16Array(256);
    crcReverseIndex.fill(-1);

    for (let i = 0; i < 256; i++) {
        let crc = i;
        for (let bit = 0; bit < 8; bit++) {
            crc = (crc & 1) !== 0
                ? CRCPOLYNOMIAL ^ (crc >>> 1)
                : crc >>> 1;
        }
        crcTable[i] = crc >>> 0;
        crcReverseIndex[crc >>> 24] = i;
    }

    const crc32State = (input) => {
        const text = typeof input === "string" ? input : String(input);
        let crc = 0xffffffff;
        for (let i = 0; i < text.length; i++) {
            crc = (crc >>> 8) ^ crcTable[(crc ^ text.charCodeAt(i)) & 0xff];
        }
        return crc >>> 0;
    };

    const crc32LastIndex = (input) => {
        const text = typeof input === "string" ? input : String(input);
        let crc = 0xffffffff;
        let index = 0;
        for (let i = 0; i < text.length; i++) {
            index = (crc ^ text.charCodeAt(i)) & 0xff;
            crc = (crc >>> 8) ^ crcTable[index];
        }
        return index;
    };

    const parseHash = (hash) => {
        if (hash == null) {
            return null;
        }
        const normalized = String(hash).trim().toLowerCase().replace(/^0x/, "");
        if (!/^[0-9a-f]{1,8}$/.test(normalized)) {
            return null;
        }
        return parseInt(normalized, 16) >>> 0;
    };

    const prepareReverseIndexes = (hash) => {
        const parsedHash = parseHash(hash);
        if (parsedHash == null) {
            return null;
        }
        const indexes = new Int16Array(4);
        let state = (parsedHash ^ 0xffffffff) >>> 0;
        for (let offset = 0; offset < 4; offset++) {
            const shift = (3 - offset) * 8;
            const index = crcReverseIndex[state >>> shift];
            if (index < 0) {
                return null;
            }
            indexes[offset] = index;
            state ^= crcTable[index] >>> (offset * 8);
        }
        return indexes;
    };

    const recoverSuffix = (prefix, indexes) => {
        let state = crc32State(prefix);
        let suffix = "";
        for (let i = 2; i >= 0; i--) {
            const charCode = (state & 0xff) ^ indexes[i];
            if (charCode < 48 || charCode > 57) {
                return null;
            }
            suffix += String.fromCharCode(charCode);
            state = crcTable[indexes[i]] ^ (state >>> 8);
        }
        return suffix;
    };

    const tryPrefix = (prefix, indexes, targetHash) => {
        const text = String(prefix);
        if (text === "0") {
            for (let mid = 0; mid < 1000; mid++) {
                if (getHashValue(mid) === targetHash) {
                    return {
                        prefix: text,
                        suffix: null,
                        mid: String(mid),
                        short: true,
                    };
                }
            }
            return { prefix: text, suffix: null, mid: null };
        }
        if (crc32LastIndex(text) !== indexes[3]) {
            return { prefix: text, suffix: null, mid: null };
        }
        const suffix = recoverSuffix(text, indexes);
        return {
            prefix: text,
            suffix,
            mid: suffix == null ? null : `${text}${suffix}`,
        };
    };

    const getHashValue = (mid) =>
        (crc32State(String(mid)) ^ 0xffffffff) >>> 0;

    const midToHash = (mid) => {
        if (mid == null) {
            return "";
        }
        const input = String(mid).trim();
        if (!input) {
            return "";
        }
        return getHashValue(input).toString(16);
    };

    const hashToMid = (hash, maxTry = 100_000_000) => {
        const parsedHash = parseHash(hash);
        if (parsedHash == null) {
            return -1;
        }
        const indexes = prepareReverseIndexes(hash);
        if (!indexes) {
            return -1;
        }
        const limit = Number.isFinite(maxTry) && maxTry > 0
            ? Math.floor(maxTry)
            : 100_000_000;
        for (let prefix = 0; prefix < limit; prefix++) {
            const result = tryPrefix(prefix, indexes, parsedHash);
            if (result.mid) {
                return result.mid;
            }
        }
        return -1;
    };

    const walk = async (hash, getNextPrefix) => {
        const parsedHash = parseHash(hash);
        const indexes = prepareReverseIndexes(hash);
        if (parsedHash == null || !indexes || typeof getNextPrefix !== "function") {
            return null;
        }
        let result = null;
        while (true) {
            let nextPrefix = getNextPrefix(result);
            if (nextPrefix && typeof nextPrefix.then === "function") {
                nextPrefix = await nextPrefix;
            }
            if (nextPrefix == null) {
                return result;
            }
            const prefix = String(nextPrefix).trim();
            if (!/^\d+$/.test(prefix)) {
                throw new TypeError("midHash prefix must be a non-negative integer");
            }
            result = tryPrefix(prefix, indexes, parsedHash);
        }
    };

    return {
        midToHash,
        hashToMid,
        walk,
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
    async getCards(uids) {
        if (!Array.isArray(uids) || uids.length < 1 || uids.length > 50) {
            throw new RangeError("uids length must be between 1 and 50");
        }
        const list = uids.map((uid) => String(uid).trim());
        if (list.some((uid) => !/^\d+$/.test(uid))) {
            throw new TypeError("uids must contain only non-negative integers");
        }
        const res = await this.client.request({
            url: "https://api.bilibili.com/x/polymer/pc-electron/v1/user/cards",
            params: { uids: list.join(",") },
            responseType: "json",
            desc: `批量获取用户名片 ${list.length} 个`,
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
    static walkMidHash(hashStr, getNextPrefix) {
        return midHash.walk(hashStr, getNextPrefix);
    }
    constructor(ctx, mid) {
        this.ctx = ctx;
        this.mid = this.constructor.normalizeMid(mid);
        this.client = ctx.client;
        this.logger = ctx.logger || new Proxy({}, { get: () => () => {} });

        this.api = new BiliUserApi(this.client);
    }
    getMidHash() {
        return this.constructor.midToHash(this.mid);
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
