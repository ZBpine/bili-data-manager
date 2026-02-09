// src/test.js

import { createBiliCommentUI } from "./test_show_reply.js"
import { createBiliDanmakuUI } from "./test_show_dm.js";

const BDM = BiliDataManager.create({
    name: "B站数据管理测试",
    httpRequest: GM_xmlhttpRequest,
    isLog: true,
});

const { BiliArchive, BiliDanmaku, BiliComment, logger } = BDM;

unsafeWindow.BiliDataManager = BiliDataManager;
unsafeWindow.BDM = BDM;
unsafeWindow.BDM.getInfo = async (url = location.href) => {
    const arcMgr = new BiliArchive();
    const info = await arcMgr.getData(url);
    logger.log(info);
    return arcMgr;
};
unsafeWindow.BDM.getDm = async (url = location.href) => {
    const arcMgr = new BiliArchive();
    const info = await arcMgr.getData(url);
    const dmMgr = new BiliDanmaku(info);
    await dmMgr.getDmPb();
    dmMgr.show = function () {
        createBiliDanmakuUI(this);
    }
    return { arc: arcMgr, dm: dmMgr };
};
unsafeWindow.BDM.getCmt = async (url = location.href) => {
    const arcMgr = new BiliArchive();
    const info = await arcMgr.getData(url);
    const cmtMgr = new BiliComment(info);
    await cmtMgr.getReply();
    cmtMgr.show = function () {
        createBiliCommentUI(this);
    }
    logger.log(cmtMgr);
    return { arc: arcMgr, cmt: cmtMgr };
}

// 以下无关
const adblockTip = document.querySelector(".adblock-tips");
if (adblockTip) adblockTip.remove();