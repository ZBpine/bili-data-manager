# BiliUser

BiliUser 是一个用于获取 B 站用户信息的类，支持通过 `mid` 或用户空间 URL 初始化，并内置 `mid` 与 `midHash` 的转换能力。

## 使用说明

### 创建

请先查看[create](./BiliDataManager.md#create)。

```javascript
// 方式一：统一创建环境
const BDM = BiliDataManager.create({
    httpRequest: GM_xmlhttpRequest,
    name: "B站数据管理",
    isLog: true,
});

// mid
const userMgr1 = new BDM.BiliUser("2");
// 也可直接传用户空间URL，内部会自动解析mid
const userMgr2 = new BDM.BiliUser("https://space.bilibili.com/2");
```

```javascript
// 方式二：自行创建环境
import { BiliClient } from "./src/BiliClient.js";
import { BiliUser } from "./src/BiliUser.js";

const client = new BiliClient(GM_xmlhttpRequest, console);
const ctx = { client, logger: console };
const userMgr = new BiliUser(ctx, "https://space.bilibili.com/2");
```

### 使用

```javascript
const card = await userMgr.getCard();
const info = await userMgr.getInfo();
const archives = await userMgr.getArchives();
const series = await userMgr.getSeriesArchives();

const midHash = userMgr.getMidHash();
const hash2 = BiliUser.midToHash("2");
const mid = BiliUser.hashToMid("b57f1c4f", 5_000_000);

console.log(card, info, archives, series, midHash, hash2, mid);
```

### 说明

| BiliUser 数据 | 类型 | 说明 |
| :--- | :--- | :--- |
| mid | String | 当前用户 mid，构造时支持传 mid 或 URL |

| BiliUser 实例方法 | 说明 | 参数 |
| :--- | :--- | :--- |
| getCard(photo) | 获取用户名片信息 | `photo` 默认 `true` |
| getInfo() | 获取用户空间详细信息（wbi） | - |
| getArchives() | 获取用户空间视频列表 | - |
| getSeriesArchives() | 获取用户空间系列视频列表 | - |
| getMidHash() | 将当前实例的 `mid` 转为 `midHash` | - |

| BiliUser 静态方法 | 说明 | 参数 |
| :--- | :--- | :--- |
| parseUrl(url) | 从 URL 解析 `mid` | 用户空间 URL |
| midToHash(mid) | `mid -> midHash` | `mid` |
| hashToMid(hashStr, maxTry) | `midHash -> mid`（暴力反查） | `hashStr`，`maxTry` 默认 `100000000` |
| getMidHash(mid) | 等价于 `midToHash(mid)` | `mid` |

> `hashToMid` 为暴力反查，`maxTry` 越大越耗时。建议先按业务场景限制搜索范围。
