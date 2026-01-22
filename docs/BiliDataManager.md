# BiliDataManager

`BiliDataManager` 是一个功能强大的 Bilibili 数据管理工具库，旨在为开发者提供简洁的接口来抓取和处理 Bilibili 的各种数据。

## 使用说明

| BiliDataManager  | 类型       | 描述        |
| :--------------- | :--------- | :---------- |
| `BiliClient`     | `Class`    | 支持请求B站api。使用 `GM_xmlhttpRequest` ，解决跨域及 Cookie 问题；提供wbi签名。[详情](./BiliClient.md) |
| `BiliArchive`    | `Class`    | 支持获取**视频、番剧、课程、动态**等稿件数据，并处理成统一的信息。[详情](./BiliAchive.md)     |
| `BiliDanmaku`    | `Class`    | 支持获取xml实时弹幕、protobuf实时弹幕、历史弹幕。[详情](./BiliDanmaku.md)    |
| `BiliComment`    | `Class`    | 支持获取评论数据，还能够自动构建评论间的层级树状结构。[详情](./BiliComment.md)      |
| `handler`        | `Object`   | BiliArchive的处理器。[详情](./BiliArchive.md#handler)          |
| `create(config)` | `Function` | 创建一个 BiliDataManager 环境。见下           |

### create

| 输入对象       | 类型       | 描述                                    |
| :------------ | :--------- | :-------------------------------------- |
| `httpRequest` | `Function` | **必填**。传入 `GM_xmlhttpRequest`。     |
| `isLog`       | `Boolean`  | 是否在控制台打印流程日志。                |
| `name`        | `String`   | 日志前缀。                               |
| `loggerColor` | `String`   | 日志前缀背景色，默认 `#01a1d6` (B站蓝)。  |
| `handlers`    | `Array`    | 见[handler](./BiliArchive.md#handler)   |

|  返回对象      |  类型     |  描述      |
|:------------- |:--------- |:---------- |
| `BiliArchive` | `Class`   |  无需传ctx，handlers  |
| `BiliDanmaku` | `Class`   |  无需传ctx  |
| `BiliComment` | `Class`   |  无需传ctx  |
| `client`      | `Object`  |  BiliClient实例 |
| `logger`      | `Object`  |  console的Proxy，[log\|info\|warn\|error]带前缀tag |
| `name`        | `String`  |  同输入     |