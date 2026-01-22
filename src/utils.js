// src/utils.js

/**
 * 并发控制辅助函数
 * @param {Array} list 任务参数列表
 * @param {number} limit 并发上限
 * @param {Function} taskFn 任务执行函数 (接收 list 中的一项)
 */
export async function promiseLimit(list, limit, taskFn) {
    const results = [];
    const executing = new Set(); // 正在执行的任务
    for (const item of list) {
        // 创建任务 Promise
        const p = Promise.resolve().then(() => taskFn(item));
        results.push(p);
        executing.add(p);

        // 任务完成后从执行队列删除
        const clean = () => executing.delete(p);
        p.then(clean).catch(clean);

        // 如果达到上限，等待最快的一个完成
        if (executing.size >= limit) {
            await Promise.race(executing);
        }
    }
    return Promise.all(results);
}

/**
 * 将 URL 中的 http 协议替换为 https
 * @param {string} url 目标 URL
 * @returns {string} 替换后的 URL
 */
export function httptoHttps(url) {
    return typeof url === "string" ? url.replace(/^http:/, "https:") : url;
}

/**
 * 将日期字符串（北京时间）转换为时间戳（秒）
 * @param {string} date 日期字符串，格式为 "YYYY-MM-DD"
 * @returns {number} 对应的时间戳（秒）
 */
export function dateToTimestamp(date, hour = 0, minute = 0, second = 0) {
    if (!date) return null;
    const toTwoDigit = (num) => num.toString().padStart(2, '0');
    const ts = Date.parse(`${date}T${toTwoDigit(hour)}:${toTwoDigit(minute)}:${toTwoDigit(second)}+08:00`);
    return isNaN(ts) ? null : Math.floor(ts / 1000);
}

/**
 * 将时间戳（秒）转换为日期字符串（YYYY-MM-DD）
 * @param {number} ts 时间戳（秒）
 * @returns {string} 日期字符串，格式为 "YYYY-MM-DD"
 */
export function timestampToDate(ts) {
    const d = new Date(ts * 1000);
    const toTwoDigit = (num) => num.toString().padStart(2, '0');
    return `${d.getFullYear()}-${toTwoDigit(d.getMonth() + 1)}-${toTwoDigit(d.getDate())}`;
}


/** * 生成指定范围内的随机整数
 * @param {number} min 最小值（包含）
 * @param {number} max 最大值（包含）
 * @returns {number} 生成的随机整数
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** * 延迟指定时间，并执行回调函数
 * @param {Object} options 延迟选项
 * @param {number} [options.base=500] 延迟基础时间，单位毫秒
 * @param {number} [options.jitter=500] 延迟抖动时间，单位毫秒
 * @param {Function} [options.beforeFn] 延迟开始前的回调函数
 * @param {Function} [options.afterFn] 延迟结束后的回调函数
 * @returns {Promise} 延迟结束后的 Promise
 */
export async function sleep({ base = 0, jitter = 0, beforeFn = () => { }, afterFn = () => { } } = {}) {
    if (base <= 0 || jitter <= 0) return 0;
    const delay = randomInt(base, base + jitter);
    beforeFn(delay);
    await new Promise((resolve) => setTimeout(resolve, delay));
    afterFn(delay);
    return delay;
}