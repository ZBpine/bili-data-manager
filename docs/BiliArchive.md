# BiliArchive

BiliArchive 是一个用于管理 B 站稿件的类，可获取**视频、番剧、课程、动态**等稿件数据，并处理成统一的信息。

## 使用说明

### handler

| handler |               描述               |                          url                           |
| :-----: | :------------------------------: | :----------------------------------------------------: |
|  video  |               视频               |             www.bilibili.com/video/BV□□□□              |
| bangumi |           番剧/电影等            |          www.bilibili.com/bangumi/play/ep□□□□          |
| cheese  | 课程(也许是[知识]的谐音[芝士]？) |          www.bilibili.com/cheese/play/ep□□□□           |
| dynamic |               动态               | t.bilibili.com/□□□□ 或<br/> www.bilibili.com/opus/□□□□ |

> 番剧、课程的链接也可以是ss□□□□（表示季），如果是已登录且看过的，会自动转到ep□□□□，否则没有具体集id，只能提取基本季信息，无法提取获取弹幕/评论所需的aid/cid/oid。

```javascript
// 需要BiliArchive处理哪种稿件，handlers就填哪些

// 方式1
const handlers = ["video", "bangumi", "cheese", "dynamic"]

// 方式2
const { handler } = BiliDataManager;
const handlers = [handler.video, handler.bangumi, handler.cheese, handler.dynamic];
// 或
const handlers = Object.values(handler);
```

### 创建

请先查看[create](./BiliDataManager.md#create)。

```javascript
// 方式一：统一创建环境
const BDM = BiliDataManager.create({
    httpRequest: GM_xmlhttpRequest,
    name: "B站数据管理", //用于logger标签，可不填
    isLog: true, //不填则默认false
    handlers, //见上，不填即默认所有
});

const arcMgr = new BDM.BiliArchive();
```

```javascript
// 方式二：自行创建环境
const { BiliClient, BiliArchive, handler } = BiliDataManager;
client = new BiliClient(GM_xmlhttpRequest, console); //console可不传
const ctx = { client, logger: console }; //logger可不传
const handlers = Object.values(handler); //见上，不填即默认所有

const arcMgr = new BiliArchive(ctx, handlers);
```

### 使用

```javascript
// 获取数据
await arcMgr.getData(url);
const info = arcMgr.info;
const data = arcMgr.data;
console.log(info, data);

arcMgr.clearData();
arcMgr.setData(data);
```
---
### 说明

#### BiliArchive
|      BiliArchive       |   类型   |     作用     | 说明   |
| :--------------------: | :------: | :---------: | :----: |
|          info          |  Object  |   稿件信息   | 提取出来的信息，getData或setData之后自动提取，具体见下 |
|          data          |  Object  |   稿件数据   | 如果要存储到本地就存储这个 |
| **async** getData(url) | Function | 获取稿件数据 | url只填BV□□□□或ep□□□□也行，ep的话优先匹配为番剧，除非加上cheese字符，或者前面handlers别带bangumi |
|       clearData        | Function | 清空稿件数据 |        |
|     setData(data)      | Function | 设置稿件数据 | 传上面存的data  |

----

#### info

| info      | 含义                         | 视频                              | 番剧     | 课程         |动态|
| --------- | --------------------------- | --------------------------------- | -------- | ----------- | ---------- |
| id        | 稿件唯一id                   | video/BV□□□□ 或 video/BV□□□□?p=□  | bangumi/play/ep□□□□ 或 bangumi/play/ss□□□□ | cheese/play/ep□□□□ 或 cheese/play/ss□□□□ | □□□□□□□□ |
| 其他      | 不同稿件特有属性              | bvid、p                           | ep_id、season_id        | ep_id、season_id |[dynamic_type](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/dynamic/dynamic_enum.md) |
| title     | 标题                         | 视频标题                          | 剧名      |课程名       |❌|
| subtitle  | 副标题                       | 第 □ P：分P名 (普通视频没有)       | 节名：集名 |节名：集名   |❌|
| desc      | 简介                         |✅|✅|✅|❌|
| aid       | 视频aid，弹幕相关要用         |✅|✅|✅|❌|
| cid       | 视频chatid，弹幕相关要用      |✅|✅|✅|❌|
| oid       | 评论区oid，评论相关要用       |✅|✅|✅|✅|
| type      | 评论区type，评论相关要用      |✅|✅|✅|✅|
| url       | 稿件链接                     |✅|✅|✅|✅|
| cover     | 视频封面链接                 |✅|✅|✅|❌|
| duration  | 视频时长(单位：秒)           |✅|✅|✅|❌|
| pubtime   | 稿件发布时间（时间戳，秒）    |✅|✅|✅|✅|
| owner     | 上传者（对象，具体见下）      |✅|✅|✅|✅|
| staff     | 合作作者（数组，具体见下）    |✅|✅|✅|❌|
| stat      | 数据统计（对象，具体见下）    |✅|✅|无评论数|仅点赞、分享、评论数|
| fetchtime | 本脚本抓取时间（时间戳，秒）  |✅|✅|✅|✅|

> 打勾✅并不意味者一定存在，比如非合作视频没有staff，番剧与课程只有季信息时没有aid/cid/oid等等。
> 
> 打叉❌表示不存在此项，比如动态没有aid/cid，没法获取弹幕。

| owner     | 含义         |
| --------- | ------------ |
| mid       | 用户id       |
| name      | 用户名       |
| face      | 用户头像链接 |

| staff[n]  | 含义         |
| --------- | ------------ |
| mid       | 用户id       |
| name      | 用户名       |
| face      | 用户头像链接 |
| role      | 用户职能     |

| stat     | 含义   |
| -------- | ------ |
| view     | 观看数 |
| like     | 点赞数 |
| coin     | 投币数 |
| favorite | 收藏数 |
| share    | 分享数 |
| danmaku  | 弹幕数 |
| reply    | 评论数 |