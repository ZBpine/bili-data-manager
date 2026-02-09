// src/index.js

import { BiliClient } from "./BiliClient.js";
import { BiliArchive } from "./BiliArchive.js";
import { BiliDanmaku } from "./BiliDanmaku.js";
import { BiliComment } from "./BiliComment.js";
import { handler } from "./handlers/handler.js";

function create(config) {
    let { name, httpRequest, handlers, isLog, loggerColor } = config || {};
    if (!httpRequest) throw new Error("httpRequest is required");
    name = name || "BiliDataManager";
    isLog = isLog !== false;
    loggerColor = loggerColor || "#00a0d8";

    const logger = new Proxy(console, {
        get(target, prop) {
            if (!isLog) {
                return () => { };
            }
            const original = target[prop];
            if (typeof original !== 'function') return original;
            // 需要添加样式前缀的方法列表
            const styledMethods = ["log", "warn", "error", "info", "debug"];

            if (styledMethods.includes(prop)) {
                return (...args) => {
                    // 使用 bind 确保行号显示相对准确
                    return original.bind(
                        target,
                        `%c${name}`,
                        `background:${loggerColor};color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold;`,
                        ...args
                    )();
                };
            }
            return original.bind(target);
        }
    });
    const client = new BiliClient(httpRequest, logger);
    const ctx = { client, logger };

    const BoundArchive = class extends BiliArchive {
        constructor() {
            super(ctx, handlers);
        }
    };
    const BoundDanmaku = class extends BiliDanmaku {
        constructor(info) {
            super(ctx, info);
        }
    };
    const BoundComment = class extends BiliComment {
        constructor(info) {
            super(ctx, info);
        }
    };

    return {
        name,
        client,
        logger,
        BiliArchive: BoundArchive,
        BiliDanmaku: BoundDanmaku,
        BiliComment: BoundComment,
    };
}

export {
    BiliClient,
    BiliArchive,
    BiliDanmaku,
    BiliComment,
    handler,
    create,
};