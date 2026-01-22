# BiliComment

## 简介

BiliComment 是一个用于管理 B 站评论的类，支持以懒加载方式获取主评论、获取回复，还能够自动构建评论间的层级树状结构。

## 使用

### 创建

请先查看[BiliArchive](./BiliArchive.md)，[create](./BiliDataManager.md#create)。

若不需要BiliArchive提取信息，则确保传入BiliComment的info包含：
```javascript
{
    oid, // 评论区oid
    type, //评论区类型
}
```
不同稿件的oid与type参考 [评论区类型代码](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/comment/readme.md) 与 [动态类型对照](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/dynamic/dynamic_enum.md)

```javascript
// 方式一：统一创建环境
const BDM = BiliDataManager.create({
    httpRequest: GM_xmlhttpRequest,
    name: "B站数据管理", //用于logger标签，可不填
    isLog: true, //不填则默认false
});

const arcMgr = new BDM.BiliArchive();
arcMgr.getData(url);
const dmMgr = new BDM.BiliComment(arcMgr.info);
```

```javascript
// 方式二：自行创建环境
const { BiliClient, BiliArchive, BiliComment } = BiliDataManager;
client = new BiliClient(GM_xmlhttpRequest, console); //console可不传
const ctx = { client, logger: console }; //logger可不传

const arcMgr = new BiliArchive(ctx, null);
arcMgr.getData(url);
const dmMgr = new BiliComment(ctx, arcMgr.info);
```

### 使用

```javascript
await dmMgr.getReply(); // 获取所有评论

await dmMgr.getMain({
    within: 86400, // 获取一天内的主楼评论
});
await dmMgr.getSub(); // 获取子楼
const count = await dmMgr.getCount();   // 获取评论数

console.log(count, dmMgr.replyTree.toTree());
```

### 说明

评论对象详见 [评论条目对象](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/comment/readme.md#评论条目对象)

| BiliComment 数据| 类型 | 说明 |
| :--- | :--- | :--- |
|data| Object | 评论数据，要存储就存这个 |
|data.comment_list|Array|评论列表|
|data.comment_list[i]|Object|评论对象|
|data.top_comment_list|Array|置顶评论列表，结构同comment_list|
|replyCount|Number|已获取的评论数|
|replyTree|ReplyTree|内部维护，负责评论数据清洗和结构转换|
|replyTree.dict|Object|{rpid -> 评论对象}，避免重复|
|replyTree.nodes|Object|内部维护的评论关系图谱|
|replyTree.toTree|Funtion|见下|

`toTree({ depth, sort })`: 核心方法。将扁平化的评论转换为嵌套的评论树结构。

参数
- `depth`: 
  - `1` 根评论 -> [所有子评论]，B站网页端的方式
  - `2` 根评论 -> [二级评论 -> [对话评论]], B站app点开查看对话就是：二级评论 -> [对话评论]
  - `3以上` 完整递归，每一层只有直接回复自己的评论。
- `sort`: 排序
  - `"like"` (点赞高到低)
  - `"time"` (时间早到晚)
  - `"reply"` (回复数多到少)

返回：
```javascript
[
  {
    rpid,   // 评论id
    reply,  // 评论对象
    rcount, // 子评论数，包括所有子孙评论数
    children: [{
      rpid,
      reply,    // 可能为null
      rcount,
      children:[], // 相同结构嵌套
    }], 
    isTop: true, // 非置顶评论无此项
  }
]
```

> 返回的评论树结构中可能会有reply为null的评论，这是B站评论被删除了，其子评论还保留，replyTree维护关系图谱时自行推断的占位节点。如果被删的是三级及以上评论，无法推断其父评论，只能挂在二级评论下（也就是说三级及以上被删评论统统当作三级）

---

| BiliComment 获取评论 | 说明 | 参数 |
| :--- | :--- | :--- |
| `getMain(options)` | 循环获取主评论列表 | `{ mode, within, sub }` |
| `getMainPage(mode, offset)` | 自己一页页获取主评论 | mode 同上，offset初始`""`否则上次返回的 `{nextOffset}`，nextOffset为空则不再有下一页|
| `getSub(rootId)` | 获取指定 root 评论下的所有子评论 | `rootId` (可选，不传则自动补全缺失的子评论) |
| `getReply()` | 组合技：获取所有主评论 + 所有子评论 | - |
| `getCount()` | 获取评论总数统计 | - |

**getMain(options)参数说明：**

- `mode`: 
  - 2 按时间
  - 3 按热度
  - 默认2，也建议使用2
- `within`: 获取指定时间范围内的评论。单位：秒。
  - -1 (默认): 抓取所有评论，直到最后一页
  - 0 自动寻找本地已存在的最新根评论，仅抓取在此之后发布的新评论。
  - 大于0 抓取within秒以内的评论，遇到更早的评论停止。
- `sub`: 是否同时抓取子评论。默认false。

**sleepTime说明：**

B站对抓取评论比较严格，抓取过快可能会触发软风控，不一定像抓取弹幕那样直接412，而是返回空评论数组，即使有wbi签名也不行（甚至自己翻评论太快都会触发）。因此需要设置延时。

```javascript
this.sleepTime = {
    long: { base: 2000, jitter: 2000 },
    short: { base: 500, jitter: 500 },
};
// delay = base + random(0, jitter) 毫秒
```

主评论翻页使用sleepTime.long，子评论翻页使用sleepTime.short。
可以自行修改，尝试最合适的时间间隔。目前1k评论大概要抓2~3分钟的样子。

---

|BiliDanmaku 其他方法|说明|参数|
|:---|:---|:---|
|clearData|清除数据|-|
|setData|设置评论数据|传入之前存的data|