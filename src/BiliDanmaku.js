// src/BiliDanmaku.js

import { bilibili } from "./proto/dm.js";
import { promiseLimit, dateToTimestamp, timestampToDate } from "./utils.js";

const dmPbRoot = bilibili.community.service.dm.v1;

class BiliDmApi {
    constructor(client) {
        this.client = client;
    }
    async getXml(cid, responseType = 'document') {
        return await this.client.request({
            url: 'https://api.bilibili.com/x/v1/dm/list.so',
            params: { oid: cid },
            responseType,
            desc: `获取弹幕 XML cid=${cid}`
        });
    }
    async getPbWebView(cid, avid, duration) {
        return await this.client.request({
            url: 'https://api.bilibili.com/x/v2/dm/web/view',
            params: { "type": 1, "oid": cid, "pid": avid, duration },
            responseType: 'arraybuffer',
            desc: `获取弹幕元数据 cid=${cid}`
        });
    }
    async getPbSeg(cid, avid, segment_index) {
        return await this.client.request({
            url: 'https://api.bilibili.com/x/v2/dm/web/seg.so',
            params: { type: 1, oid: cid, pid: avid, segment_index },
            responseType: 'arraybuffer',
            desc: `获取弹幕片段 ${segment_index} cid=${cid}`
        });
    }
    async getHisDate(cid, month) {
        const res = await this.client.request({
            url: 'https://api.bilibili.com/x/v2/dm/history/index',
            params: { type: 1, oid: cid, month },
            responseType: 'json',
            desc: `获取弹幕历史日期 month=${month} cid=${cid}`
        });
        return res.data || [];
    }
    async getHisPb(cid, date) {
        return await this.client.request({
            url: 'https://api.bilibili.com/x/v2/dm/web/history/seg.so',
            params: { type: 1, oid: cid, date },
            responseType: 'arraybuffer',
            desc: `获取弹幕历史片段 date=${date} cid=${cid}`
        });
    }
    async getLikes(cid, idList) {
        if (!idList.length) {
            return {};
        }
        const ids = idList.join(',');
        const res = await this.client.request({
            url: 'https://api.bilibili.com/x/v2/dm/thumbup/stats',
            params: { oid: cid, ids },
            desc: `获取弹幕点赞数 cid=${cid} ids=${ids}`
        });
        return res.data || {};
    }
}

export class BiliDanmaku {
    constructor(ctx, info) {
        this.ctx = ctx;
        this.info = info || {};
        this.client = ctx.client;
        this.logger = ctx.logger || new Proxy({}, { get: () => () => { } });

        this.api = new BiliDmApi(this.client);

        this.data = {};
        this.dmDict = {};
        this.dmCount = 0;

        this.errors = {
            segments: [], //分片错误记录
            dates: [] //历史日期错误记录
        }
        this.dateError = []; //历史日期错误记录
    }
    static parsePb(buffer, type) {
        const protoType = dmPbRoot[type];
        if (!protoType) {
            throw new Error(`未知的 protobuf 类型: ${type}`);
        }
        const uint8Array = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
        const message = protoType.decode(uint8Array);
        return protoType.toObject(message, {
            enums: String, // 枚举转为字符串，易读
            // longs: String, // 关键：B站很多 ID 是长整型，转为字符串防止丢失精度
            bytes: String,
            // defaults: true // 建议开启：显示默认值，方便前端处理
        });
    }
    static parseXml(xml) {
        if (!xml) return [];
        const dmList = [];
        const pushDm = (p, content) => {
            if (!p) return;
            const parts = p.split(',');
            if (parts.length < 7) return;
            dmList.push({
                progress: Math.trunc(parseFloat(parts[0]) * 1000),
                mode: parseInt(parts[1]),
                fontsize: parseInt(parts[2]),
                color: parseInt(parts[3]),
                ctime: parseInt(parts[4]),
                pool: parseInt(parts[5]),
                midHash: parts[6],
                id: parseInt(parts[7]),
                idStr: parts[7],
                weight: parseInt(parts[8] || '0'),
                content
            });
        }
        if (typeof xml === 'string') {
            const regex = /<d p="([^"]+)">([^<]*)<\/d>/g;
            let match;
            while ((match = regex.exec(xml)) !== null) {
                pushDm(match[1], match[2]);
            }
        }
        else {
            const dElements = xml.getElementsByTagName('d');
            for (const d of dElements) {
                pushDm(d.getAttribute('p'), d.textContent);
            }
        }
        return dmList;
    }
    setData(data) {
        this.clearData();
        if (data.danmaku_view) this.data.danmaku_view = data.danmaku_view;
        const danmaku_list = data.danmaku_list;
        if (danmaku_list?.length) {
            danmaku_list.forEach(dm => this.addDm(dm));
        }
        this.buildData();
    }
    clearData() {
        this.dmDict = {};
        this.buildData();
        if (this.data.danmaku_view) delete this.data.danmaku_view;
    }
    buildData() {
        this.data.danmaku_list = Object.values(this.dmDict);
        this.dmCount = this.data.danmaku_list.length;
    }
    addDm(danmaku) {
        const dmid = danmaku.idStr ?? String(danmaku.id);
        danmaku.progress ??= 0;
        if (this.dmDict[dmid]) {
            Object.assign(this.dmDict[dmid], danmaku);
        } else {
            this.dmDict[dmid] = { ...danmaku };
        }
    }
    async getDmXml() {
        const desc = '获取XML实时弹幕';
        const cid = this.info.cid;
        if (!cid) {
            this.logger.warn(desc + '失败，未找到cid，请检查info');
            return -1;
        };
        this.logger.time(desc + ' 总耗时');
        const startDmCount = this.dmCount;
        const xml = await this.api.getXml(cid);
        const dmList = this.constructor.parseXml(xml);
        dmList.forEach(d => this.addDm(d));
        this.buildData();
        this.logger.timeEnd(desc + ' 总耗时');
        this.logger.log('新增弹幕', this.dmCount - startDmCount);
        return this.dmCount - startDmCount;
    }
    async getDmPb(onProgress = () => { }, concurrentLimit = 10, retry = false) {
        const desc = '获取Protobuf实时弹幕';
        const { cid, aid, duration } = this.info;
        if (!cid || !aid || !duration) {
            this.logger.warn(desc + '失败，未找到cid/aid/duration，请检查info');
            return -1;
        };
        this.logger.time(desc + ' 总耗时');
        const startDmCount = this.dmCount;

        let segments = [];
        let segCount = 0;
        if (retry) {
            segments = [...this.errors.segments];
            segCount = segments.length;
            this.errors.segments = [];
        } else {
            const pbViewBuf = await this.api.getPbWebView(cid, aid, duration);
            const pbView = this.constructor.parsePb(pbViewBuf, 'DmWebViewReply');
            if (pbView) this.data.danmaku_view = pbView;

            const pageSize = pbView?.dmSge?.pageSize / 1000 || 360;
            segCount = Math.floor(duration / pageSize) + 1;
            segments = Array.from({ length: segCount }, (_, i) => i + 1);
        }
        let finished = 0;
        await promiseLimit(segments, concurrentLimit, async (segIndex) => {
            let segDmCount = 0;
            try {
                const segBuf = await this.api.getPbSeg(cid, aid, segIndex);
                const segData = this.constructor.parsePb(segBuf, 'DmSegMobileReply');
                if (segData?.elems?.length) {
                    segData.elems.forEach(elem => this.addDm(elem));
                    segDmCount = segData.elems.length;
                }
            } catch (e) {
                this.logger.error(desc + `分片 ${segIndex} 失败`, e);
                this.errors.segments.push(segIndex);
            } finally {
                finished++;
                onProgress(finished, segCount, `第 ${segIndex} 段`, segDmCount); // 注意：并发模式下，单个分片弹幕数需自行记录
            }
        });
        this.buildData();
        this.logger.timeEnd(desc + ' 总耗时');
        this.logger.log('新增弹幕', this.dmCount - startDmCount);
        return this.dmCount - startDmCount;
    }
    async getDmPbHisByD(dates, onProgress = () => { }) {
        const dateCount = dates?.length || 0;
        if (!Array.isArray(dates) || dateCount === 0) {
            return 0;
        }
        const desc = `获取 ${dateCount} 天历史弹幕`;
        const cid = this.info.cid;
        if (!cid) {
            this.logger.warn(desc + '失败，未找到cid，请检查info');
            return -1;
        }
        this.logger.time(desc + ' 总耗时');
        const startDmCount = this.dmCount;
        let finished = 0;
        let minCtime = Infinity;
        const sortedDates = [...dates].sort((a, b) => b.localeCompare(a));
        for (const date of sortedDates) {
            let segDmCount = 0;
            const dayStartTime = dateToTimestamp(date);
            if (minCtime <= dayStartTime) {
                finished++;
                onProgress(finished, dateCount, `${date} (跳过)`, 0);
                continue;
            }
            try {
                const segBuf = await this.api.getHisPb(cid, date);
                const segData = this.constructor.parsePb(segBuf, 'DmSegMobileReply');
                if (segData?.elems?.length) {
                    segData.elems.forEach(elem => {
                        this.addDm(elem);
                        if (elem.ctime < minCtime) {
                            minCtime = elem.ctime;
                        }
                    });
                    segDmCount = segData.elems.length;
                } else {
                    if (minCtime > dayStartTime) {
                        minCtime = dayStartTime;
                    }
                }
            } catch (e) {
                this.logger.error(`获取历史日期 ${date} 弹幕失败`, e);
                this.errors.dates.push(date);
            } finally {
                finished++;
                onProgress(finished, dateCount, date, segDmCount);
            }
        }
        this.buildData();
        this.logger.timeEnd(desc + ' 总耗时');
        this.logger.log('新增弹幕', this.dmCount - startDmCount);
        return this.dmCount - startDmCount;
    }
    async getDmPbHisByM(month, onProgress = () => { }) {
        const desc = `获取 ${month} 历史弹幕`;
        const cid = this.info.cid;
        if (!cid) {
            this.logger.warn(desc + '失败，未找到cid，请检查info');
            return -1;
        }
        if (!/^\d{4}-\d{2}$/.test(month)) {
            this.logger.warn(desc + '失败，参数不合法，应为 "YYYY-MM" 格式');
            return -1;
        }
        this.logger.time(desc + ' 总耗时');

        const dates = await this.api.getHisDate(cid, month);

        const dmRise = await this.getDmPbHisByD(dates, onProgress);
        this.logger.timeEnd(desc + ' 总耗时');
        return dmRise;
    }
    async getDmPbHisRange(range = {}, onProgress = () => { }) {
        const desc = `获取范围历史弹幕`;
        const { cid, pubtime } = this.info;
        if (!cid || !pubtime) {
            this.logger.warn(desc + '失败，未找到cid或pubtime，请检查info');
            return -1;
        }
        const nowSec = Math.floor(Date.now() / 1000);
        let startSec = Math.max(dateToTimestamp(range.start) ?? pubtime, pubtime);
        let endSec = Math.min(dateToTimestamp(range.end, 24) ?? nowSec, nowSec);
        if (endSec < startSec) {
            this.logger.warn(desc + '错误，结束时间早于起始时间');
            return -1;
        }

        const generateMonthList = (startSec, endSec) => {
            const start = new Date(startSec * 1000);
            const end = new Date(endSec * 1000);
            const months = [];
            let curr = new Date(start.getFullYear(), start.getMonth(), 1);
            while (curr <= end) {
                const yyyy = curr.getFullYear();
                const mm = String(curr.getMonth() + 1).padStart(2, '0');
                months.push(`${yyyy}-${mm}`);
                curr.setMonth(curr.getMonth() + 1);
            }
            return months;
        }

        this.logger.time(desc + ' 总耗时');

        const months = generateMonthList(startSec, endSec);
        let dates = [];
        let scannedMonths = 0;
        for (const month of months) {
            let dateCount = 0;
            try {
                const oneMonthDates = await this.api.getHisDate(cid, month);
                if (Array.isArray(oneMonthDates)) {
                    dates.push(...oneMonthDates);
                    dateCount = oneMonthDates.length;
                }
            } catch (e) {
                this.logger.error(`扫描月份 ${month} 失败`, e);
            } finally {
                scannedMonths++;
                onProgress(scannedMonths, months.length, `扫描月份: ${month}`, dateCount);
            }
        }

        const startDateStr = timestampToDate(startSec);
        const endDateStr = timestampToDate(endSec);
        dates = [...new Set(dates)].filter(d => d >= startDateStr && d <= endDateStr);

        const dmRise = await this.getDmPbHisByD(dates, onProgress);
        this.logger.timeEnd(desc + ' 总耗时');
        return dmRise;
    }
    async retryErrors(onProgress = () => { }) {
        if (this.errors.segments.length) {
            await this.getDmPb(onProgress, 1, true);
        }
        if (this.errors.dates.length) {
            const dates = [...this.errors.dates];
            this.errors.dates = [];
            await this.getDmPbHisByD(dates, onProgress);
        }
    }
}