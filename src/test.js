// src/test.js

import { createBiliCommentUI } from "./test_show_reply.js";
import { createBiliDanmakuUI } from "./test_show_dm.js";

const BDM = BiliDataManager.create({
    name: "B站数据管理测试",
    httpRequest: GM_xmlhttpRequest,
    isLog: true,
});

const { logger } = BDM;

unsafeWindow.BiliDataManager = BiliDataManager;
unsafeWindow.BDM = BDM;
unsafeWindow.BDM.getInfo = async (url = location.href) => {
    const arcMgr = new BDM.BiliArchive();
    const info = await arcMgr.getData(url);
    logger.log(info);
    return arcMgr;
};
unsafeWindow.BDM.getInteract = async (url = location.href) => {
    const arcMgr = new BDM.BiliArchive();
    await arcMgr.getData(url);
    const playerInfo = await arcMgr.getPlayerInfo();
    const edgeInfo = await arcMgr.invoke("getInteractEdgeInfo");
    const graph = arcMgr.invoke("buildInteractGraph");
    const varsMap = arcMgr.invoke("getInteractVarsMap");
    return { arcMgr, playerInfo, edgeInfo, graph, varsMap };
};
unsafeWindow.BDM.getDm = async (url = location.href) => {
    const arcMgr = new BDM.BiliArchive();
    const info = await arcMgr.getData(url);
    const dmMgr = new BDM.BiliDanmaku(info);
    await dmMgr.getDmPb();
    dmMgr.show = function () {
        createBiliDanmakuUI(this);
    };
    return { arc: arcMgr, dm: dmMgr };
};
unsafeWindow.BDM.getCmt = async (url = location.href) => {
    const arcMgr = new BDM.BiliArchive();
    const info = await arcMgr.getData(url);
    const cmtMgr = new BDM.BiliComment(info);
    await cmtMgr.getReply();
    cmtMgr.show = function () {
        createBiliCommentUI(this);
    };
    logger.log(cmtMgr);
    return { arc: arcMgr, cmt: cmtMgr };
};
unsafeWindow.BDM.getAll = async (url = location.href) => {
    const arcMgr = new BDM.BiliArchive();
    const info = await arcMgr.getData(url);
    const dmMgr = new BDM.BiliDanmaku(info);
    await dmMgr.getDmPb();
    const cmtMgr = new BDM.BiliComment(info);
    await cmtMgr.getReply();
    return { ...arcMgr.data, ...dmMgr.data, ...cmtMgr.data };
};
unsafeWindow.BDM.getUser = (url = location.href) => {
    const mid = BDM.BiliUser.parseUrl(url);
    const userMgr = new BDM.BiliUser(mid);
    return userMgr;
};
unsafeWindow.BDM.post = async ({
    url,
    params = {},
    data = {},
    headers = {},
    sign = false,
    responseType = "json",
    desc = "POST测试",
} = {}) => {
    if (!url) {
        throw new Error("BDM.post 需要传入 url");
    }
    const body =
        typeof data === "string" || data instanceof FormData
            ? data
            : new URLSearchParams(data).toString();
    const res = await BDM.client.request({
        method: "POST",
        url,
        params,
        data: body,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            ...headers,
        },
        responseType,
        sign,
        desc,
    });
    logger.log(res);
    return res;
};

// 以下无关
const adblockTip = document.querySelector(".adblock-tips");
if (adblockTip) adblockTip.remove();
