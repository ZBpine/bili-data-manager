# BiliDataManager

`BiliDataManager` 是一个 Bilibili 数据管理工具库，旨在为开发者提供简洁的接口来抓取和处理 Bilibili 的各种数据。

本项目采用 UMD 格式打包，可直接作为脚本库通过 @require 引入，导出的全局变量名为 BiliDataManager。。

若要在非油猴脚本环境中使用，请模仿 `GM_xmlhttpRequest` 封装请求函数。见[仿造 GM_xmlhttprequest](https://github.com/ZBpine/bili-data-manager/blob/main/docs/BiliClient.md#仿造-gm_xmlhttprequest)

## 模块

- **Client**：支持请求B站api。使用 `GM_xmlhttpRequest` ，解决跨域及 Cookie 问题；提供wbi签名。[详情](https://github.com/ZBpine/bili-data-manager/blob/main/docs/BiliClient.md)
- **Archive**：支持获取**视频、番剧、课程、动态**等稿件数据，并处理成统一的信息。[详情](https://github.com/ZBpine/bili-data-manager/blob/main/docs/BiliAchive.md)
- **Danmaku**：支持获取xml实时弹幕、protobuf实时弹幕、历史弹幕。[详情](https://github.com/ZBpine/bili-data-manager/blob/main/docs/BiliDanmaku.md)
- **Comment**：支持获取评论数据，还能够自动构建评论间的层级树状结构。[详情](https://github.com/ZBpine/bili-data-manager/blob/main/docs/BiliComment.md)

## 使用

### 引入
```javascript
// ==UserScript==
// @grant        GM_xmlhttpRequest
// @connect      api.bilibili.com
// @require      https://update.greasyfork.org/scripts/563577/1739686/BiliDataManager.js
// ==UserScript==
```

### [初始化环境](https://github.com/ZBpine/bili-data-manager/blob/main/docs/BiliDataManager.md)

```javascript
const BDM = BiliDataManager.create({
    httpRequest: GM_xmlhttpRequest,
    name: "B站数据管理",
    isLog: true,
});
```

### [获取稿件信息](https://github.com/ZBpine/bili-data-manager/blob/main/docs/BiliArchive.md)

```javascript
const arcMgr = new BDM.BiliArchive();
const url = "https://www.bilibili.com/video/BV1zJiGBREPB/";

const info = await arcMgr.getData(url);
BDM.logger.log(info);
```

### [获取弹幕](https://github.com/ZBpine/bili-data-manager/blob/main/docs/BiliDanmaku.md)

```javascript
const dmMgr = new BDM.BiliDanmaku(info); //arcMgr.info

await dmMgr.getDmPb();
BDM.logger.log(dmMgr.data);
```

### [获取评论](https://github.com/ZBpine/bili-data-manager/blob/main/docs/BiliComment.md)

```javascript
const cmtMgr = new BDM.BiliComment(info); //arcMgr.info

await cmtMgr.getReply();
BDM.logger.log(cmtMgr.replyTree.toTree());
```

### 存储

```javascript
const data = {
    ...arcMgr.data,
    ...dmMgr.data,
    ...cmtMgr.data,
};
GM_setClipboard(JSON.stringify(data));
```

### 读取

```javascript
const data = JSON.parse(GM_getClipboard());

const arcMgr = new BDM.BiliArchive();
arcMgr.setData(data); //return info

const dmMgr = new BDM.BiliDanmaku(arcMgr.info);
dmMgr.setData(data);
BDM.logger.log(dmMgr.dmDict);

const cmtMgr = new BDM.BiliComment(arcMgr.info);
cmtMgr.setData(data);
BDM.logger.log(cmtMgr.replyTree.toTree());
```