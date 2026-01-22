# B站Protobuf弹幕解析

`protobuf`（全称 **Protocol Buffers**）是由 **Google 开发的一种语言中立、平台中立、可扩展** 的 **序列化数据格式**。你可以把它理解为一种 **比 JSON 或 XML 更高效的“数据通信格式”**，特别适用于在网络上传输结构化数据，或者在不同语言/平台之间进行数据交换。

2020年5月23日，哔哩哔哩网页端及移动端启用了新的默认弹幕 API，使用ProtoBuf传输弹幕数据。[详情](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/danmaku/danmaku_proto.md)

## protobuf详解

### Protobuf 的工作流程

Protobuf 的工作分为三个阶段：**定义、编译、运行**。

#### 第一阶段：定义 (Define)
开发者编写 `.proto` 文件，确定数据长什么样。本项目中[dm.proto](./dm.proto) 。

#### 第二阶段：编译 (Compile)
由于 `.proto` 文件本身不能被代码直接执行，需要使用编译器将其转换成特定语言的代码。
*   本项目[dm.js](./dm.js)就是通过编译器[[protobufjs]](https://github.com/protobufjs/protobuf.js)生成的。它包含了**解析二进制流**所需的逻辑。
*   这个生成的 `.js` 文件知道如何根据“标识号”把二进制数据还原成 JavaScript 对象。

#### 第三阶段：运行 (Serialize / Deserialize)
1.  **序列化（发送端）**
2.  **反序列化（接收端）**：
    *   代码收到一串二进制数据 `ArrayBuffer`。
    *   调用 `dm.js` 中的 `decode` 方法。
    *   `dm.js` 根据 `.proto` 约定的规则，把二进制流“翻译”回 JS 对象。

---

### 为什么 B 站要用 Protobuf 而不是 JSON？

在处理弹幕这种大数据量场景时，Protobuf 有巨大的优势：

1.  **体积极小**：
    *   JSON 会重复传输键名：`{"content": "666", "progress": 1000}`。
    *   Protobuf 只传：`[标识号1][值1000] [标识号3][值666]`。
    *   这节省了 30%~70% 的带宽，对移动端流量和加载速度非常友好。

2.  **解析速度极快**：
    *   JSON 是字符串，解析时需要扫描每一个字符。
    *   Protobuf 是二进制格式，机器可以直接读取内存中的数值，速度快几个数量级。

3.  **版本兼容性**：
    *   如果你在 `.proto` 里增加了一个新字段，旧的代码仍然可以解析旧的部分而不会崩溃。
   

## dm.proto

### 来源

本项目参考 [bilibili-API-collect dm.proto](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/grpc_api/bilibili/community/service/dm/v1/dm.proto)。

另外我在项目中发现 [bilibili-API-collect dm.proto](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/grpc_api/bilibili/community/service/dm/v1/dm.proto) 文件存在一些类型错误，详见[issue](https://github.com/SocialSisterYi/bilibili-API-collect/issues/1317)。

本项目 [dm_full.proto](./dm_full.proto) 文件已经修复了这些错误。

### 精简

由于 [dm_full.proto](./dm_full.proto) 存在大量与本项目无关的字段，打包后体积较大，因此只筛选出本项目需要的字段(`DmSegMobileReply`,`DmWebViewReply`)，生成 [dm_filt.proto](./dm_filt.proto) 文件。

筛选代码见：[filter_proto.js](./filter_proto.js)。

```sh
node src\proto\filter_proto.js
```

### 编译

编译器下载
```sh
npm install protobufjs@7
npm install -D protobufjs-cli@1
```

编译
```sh
npm run proto
```

其中为了减小打包体积，使用以下参数：

```json
"proto": "pbjs -t static-module -w es6 -o src/proto/dm.js src/proto/dm.proto --no-beautify --no-comments --no-create --no-verify --no-delimited --no-encode"
```

参数具体见[protobufjs-cli](https://github.com/protobufjs/protobuf.js/blob/master/cli/README.md)。

| 参数 | 含义 |
| :--- | :--- |
| **`--no-beautify`** | **不进行代码美化**。生成的代码会挤成一团，没有缩进和空格。 | 
| **`--no-comments`** | **删除注释**。去掉生成的代码中所有 JSDoc 和解释性注释。 | 
| **`--no-create`** | **不生成 `.create()` 方法**。项目主要是“接收”B站数据，不需要这个辅助创建对象的方法。 |
| **`--no-verify`** | **不生成校验逻辑**。 跳过对数据格式字段的严格检查（比如检查某个字段是否必填）。为了追求极致解析速度，假设B站发来的数据都是合法的。 |
| **`--no-delimited`** | **不生成分隔符处理逻辑**。这种逻辑通常用于处理长连接中的流式数据（多次发送）。B站弹幕片段是单次请求完整返回的，用不到这个。 |
| **`--no-encode`** | **不生成编码逻辑**。 这意味着生成的 `dm.js` **只能反序列化（把二进制转成 JS 对象）**，而不能序列化（把 JS 对象转成二进制）。|