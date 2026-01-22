// src/handlers/handler.js

import { videoHandler } from "./video.js";
import { bangumiHandler } from "./bangumi.js";
import { dynamicHandler } from "./dynamic.js";
import { cheeseHandler } from "./cheese.js";

const handlerList = [
    videoHandler,
    bangumiHandler,
    dynamicHandler,
    cheeseHandler,
];

const handler = {};
for (const h of handlerList) {
    handler[h.name] = h;
}

export { handler, handlerList };