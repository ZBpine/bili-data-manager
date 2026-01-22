# BiliDanmaku

BiliDanmaku 是一个用于获取 B 站视频弹幕的类，支持获取xml实时弹幕、protobuf实时弹幕、protobuf历史弹幕，并整合为数组。

[protobuf详情](../src/proto/dm_proto.md)

## 使用说明

### 创建

请先查看[BiliArchive](./BiliArchive.md)，[create](./BiliDataManager.md#create)。

若不需要BiliArchive提取信息，则确保传入BiliDanmaku的info包含：
```javascript
{
    cid, //视频cid 必须
    aid, //视频av号 getDmPb需要
    duration, //视频时长 getDmPb需要
    pubtime, //视频发布时间 getDmPbHisRange需要
}
```

```javascript
// 方式一：统一创建环境
const BDM = BiliDataManager.create({
    httpRequest: GM_xmlhttpRequest,
    name: "B站数据管理", //用于logger标签，可不填
    isLog: true, //不填则默认false
});

const arcMgr = new BDM.BiliArchive();
arcMgr.getData(url);
const dmMgr = new BDM.BiliDanmaku(arcMgr.info);
```

```javascript
// 方式二：自行创建环境
const { BiliClient, BiliArchive, BiliDanmaku } = BiliDataManager;
client = new BiliClient(GM_xmlhttpRequest, console); //console可不传
const ctx = { client, logger: console }; //logger可不传

const handlers = ["video", "bangumi", "cheese"];
const arcMgr = new BiliArchive(ctx, handlers);
arcMgr.getData(url);
const dmMgr = new BiliDanmaku(ctx, arcMgr.info);
```

### 使用

```javascript
await dmMgr.getDmXml(); // 获取xml弹幕
await dmMgr.getDmPb(); // 获取protobuf弹幕
await dmMgr.getDmPbHisRange(); // 获取全部历史弹幕

console.log(dmMgr.data.danmaku_list);
```

### 说明

|BiliDanmaku 数据|类型|说明|
|:---|:---|:---|
|data|Object|弹幕数据，要存储就存这个|
|data.danmaku_list|Array|弹幕列表|
|data.danmaku_list[i]|Object|弹幕对象，详见[protobuf弹幕](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/danmaku/danmaku_proto.md)|
|data.danmaku_view|Object|弹幕视图，只有getDmPb有，详见[弹幕元数据](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/danmaku/danmaku_view_proto.md)|
|data.danmaku_view.commandDms|Array|互动弹幕，详见弹幕元数据|
|dmDict|Object|{dmid -> 弹幕对象}，避免重复|
|dmCount|Number|已获取的弹幕数|


|BiliDanmaku 获取弹幕|说明|参数|
|:---|:---|:---|
|getDmXml|获取xml弹幕|-|
|getDmPb|获取protobuf弹幕|1. onProgress 具体见下|
|getDmPbHisByD|按日获取历史弹幕|1. 日期列表 ["YYYY-MM-DD"];<br/>2. onProgress|
|getDmPbHisByM|按月获取历史弹幕|1. 月份 "YYYY-MM";<br/>2. onProgress|
|getDmPbHisRange|按范围获取历史弹幕|1. 范围对象 {start:""YYYY-MM-DD"; end:"YYYY-MM-DD"} start为空则从发布时间起，end为空则到现在为止;<br/>2. onProgress|
|retryErrors|重试错误片段|-|

除getDmXml外，其他获取弹幕方法都有onProgress回调函数，且如果短时间大量请求弹幕，容易导致B站风控请求失败。函数会记录下出错的片段与日期，可用retryErrors重试。

onProgress回调函数说明：
```javascript
(finished, total, current, count) => {
    // finished: Number 已完成数量
    // total: Number 总数量
    // current: String 当前片段或日期
    // count: Number 当前获取到的弹幕数
}
```

|BiliDanmaku 其他方法|说明|参数|
|:---|:---|:---|
|**static** parseXml|解析xml弹幕|文本或XMLDocument|
|**static** parsePb|解析protobuf弹幕|1. buffer 二进制数据;<br/>2. type 仅支持"DmWebViewReply","DmSegMobileReply" <br/>详见[protobuf弹幕解析](../src/proto/dm_proto.md)|
|clearData|清除数据|-|
|setData|设置弹幕数据|传入之前存的data|
