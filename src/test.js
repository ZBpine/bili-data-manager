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
    return { arcMgr, playerInfo, edgeInfo, graph };
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

// 以下无关
const adblockTip = document.querySelector(".adblock-tips");
if (adblockTip) adblockTip.remove();
