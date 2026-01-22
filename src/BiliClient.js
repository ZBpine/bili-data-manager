// src/BiliClient.js

const md5 = require("blueimp-md5");

export class BiliClient {
    constructor(httpRequest, logger) {
        this.headers = {
            'User-Agent': navigator.userAgent,
            'Referer': 'https://www.bilibili.com/',
        };
        this.wbiKey = '';
        this.buvid3 = '';
        this.httpRequest = httpRequest;
        this.logger = logger || new Proxy({}, { get: () => () => { } });
    }
    getMixinKey(origin) {
        const table = [
            46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35,
            27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13,
            37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4,
            22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52,
        ];
        return table.map(i => origin[i]).join('').slice(0, 32);
    }
    async ensureWbiKey() {
        // https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/misc/sign/wbi.md
        const currentHour = Math.floor(Date.now() / 3600000);
        if (this.wbiKey && this.wbiKeyUpdateHour === currentHour) return;
        if (this.wbiKeyPromise) return this.wbiKeyPromise;
        this.wbiKeyPromise = (async () => {
            try {
                this.wbiKeyUpdateHour = Math.floor(Date.now() / 3600000);
                const navData = await this.request({
                    url: 'https://api.bilibili.com/x/web-interface/nav',
                    desc: '获取WBI key',
                    sign: false,
                });
                const img_url = navData?.data?.wbi_img?.img_url;
                const sub_url = navData?.data?.wbi_img?.sub_url;
                if (!img_url || !sub_url) {
                    throw new Error("获取 WBI 失败");
                }
                const imgKey = img_url.slice(img_url.lastIndexOf('/') + 1, img_url.lastIndexOf('.'));
                const subKey = sub_url.slice(sub_url.lastIndexOf('/') + 1, sub_url.lastIndexOf('.'));
                this.wbiKey = this.getMixinKey(imgKey + subKey);
                this.wbiKeyUpdateHour = currentHour;
            } catch (e) {
                this.logger.error("❌ 更新 WBI Key 失败", e);
            } finally {
                this.wbiKeyPromise = null; // 完成后释放锁
            }
        })();
        return this.wbiKeyPromise;
    }
    getQuery(params = {}, sign = false) {
        if (!sign || !this.wbiKey) {
            return Object.keys(params).map(key => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
            }).join('&');
        } else {
            params.wts = Math.round(Date.now() / 1000);
            const query = Object.keys(params).sort().map(key => {
                const value = String(params[key]).replace(/[!'()*]/g, '');
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            }).join('&');
            const w_rid = md5(query + this.wbiKey);
            return query + '&w_rid=' + w_rid;
        }
    }
    async ensureBuvid3() {
        // 若浏览器登陆过B站，GM_xmlHttpRequest 自然会携带 Cookie；否则需要自己请求buvid3字段
        if (this.buvidPromise) return this.buvidPromise;
        this.buvidPromise = new Promise((resolve, reject) => {
            this.httpRequest({
                method: 'GET',
                url: 'https://api.bilibili.com/x/web-frontend/getbuvid',
                onload: res => {
                    try {
                        const json = JSON.parse(res.responseText);
                        const newBuvid = json?.data?.buvid;
                        if (newBuvid) {
                            this.buvid3 = newBuvid;
                            resolve(this.buvid3);
                        } else {
                            reject({ message: "未成功获取到 buvid3", response: json });
                        }
                    } catch (e) {
                        reject(e);
                    }
                },
                onerror: reject
            });
        }).finally(() => {
            this.buvidPromise = null;
        });
        return this.buvidPromise;
    }
    async request({ url, params = {}, responseType = 'json', sign = false, desc = '' }) {
        if (sign) {
            await this.ensureWbiKey();
        }
        const query = this.getQuery(params, sign);

        const fullUrl = query ? `${url}?${query}` : url;

        const doRequest = () => new Promise((resolve, reject) => {
            const headers = { ...this.headers };
            if (this.buvid3) {
                headers.Cookie = `buvid3=${this.buvid3}`;
            }
            this.httpRequest({
                method: 'GET',
                url: fullUrl,
                headers,
                responseType,
                onload: res => {
                    if (res.status == 412) {
                        return reject({ code: 412, message: "请求被拦截", desc, res });
                    }
                    this.logger.log(`🌐 [${desc}]`, res);
                    resolve(res.response ?? res.responseText);
                },
                onerror: err => {
                    this.logger.error(`❌ [${desc}] 网络错误`, err);
                    reject(err);
                }
            });
        });
        return doRequest().catch(async (err) => {
            if (err.code === 412) {
                if (!this.buvid3) {
                    this.logger.warn(`⚠️ [${desc}] 请求被拦截，尝试刷新 buvid3 重试`);
                    await this.ensureBuvid3();
                    return doRequest();
                }
            }
            throw err;
        });
    }
}