# BiliClient

BiliClient 是一个用于与哔哩哔哩 API 交互的类，它封装了请求和wbi签名等操作。

## 使用说明


```javascript
// @grant GM_xmlhttpRequest
// connect api.bilibili.com
```

请先查看[create](./BiliDataManager.md#create)。

```javascript
// 方式一：统一创建环境
const BDM = BiliDataManager.create({
    name: "B站数据管理", //用于logger标签，可不填
    httpRequest: GM_xmlhttpRequest,
    isLog: true, //不填则默认false
});
const client = BDM.client;
```

```javascript
// 方式二：自行创建环境
const { BiliClient } = BiliDataManager;
client = new BiliClient(GM_xmlhttpRequest, console);
```

```javascript
await client.request({url, params, ...});
```

| request参数  | 类型    | 说明                    |
| ------------ | ------- | ---------------------- |
| url          | String  | 请求地址                |
| params       | Object  | 请求参数                |
| responseType | String  | [返回类型](https://www.tampermonkey.net/documentation.php#api:GM_xmlhttpRequest) 默认'json'             |
| sign         | Boolean | 是否[wbi签名](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/misc/sign/wbi.md) |
| desc         | String  | 用于logger输出附带说明   |


### 仿造 GM_xmlhttpRequest

非油猴（Userscript）环境下要仿造 `GM_xmlhttpRequest`，需满足

- API 签名接口兼容性
- 跨域限制 (CORS) 
- 隐私请求头/Cookie 控制

BiliClient 期望的 `httpRequest` 包含：

- 输入参数：一个对象，包含 method, url, headers, responseType, onload, onerror。
- 输出对象：onload 回调应接收一个包含 status, responseText, response 的对象。

    response需按responseType自动转换结果，至少能处理：
    - text
    - json
    - document
    - arraybuffer