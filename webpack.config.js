// webpack.config.js
const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const ScriptCatWebpackPlugin = require("scriptcat-webpack-plugin");

const getlibConfig = (name, filename, optimization) => {
    return {
        name,
        entry: {
            "bili-data-manager": "./src/index.js",
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename,
            library: {
                name: "BiliDataManager",
                type: "umd",
            },
            globalObject: 'typeof self !== "undefined" ? self : this',
        },
        optimization,
        plugins: [
            new ScriptCatWebpackPlugin({
                file: filename,
                name: "BiliDataManager",
                namespace: "https://github.com/ZBpine/bili-data-manager",
                version: "1.0.0",
                description: "BiliDataManager 是一个 Bilibili 数据管理工具库，旨在为开发者提供简洁的接口来抓取和处理 Bilibili 的各种数据。",
                author: "ZBpine",
                metadata: {
                    icon: "https://www.bilibili.com/favicon.ico",
                    license: "MIT",
                },
            }),
        ],
    }
};
const lib_min = getlibConfig("library", "bili-data-manager.min.js", { minimize: true });
const lib_bundle = getlibConfig("library-bundle", "bili-data-manager.bundle.js", {
    minimize: true, // 开启“最小化”过程，但我们要自定义这个过程
    minimizer: [
        new TerserPlugin({
            terserOptions: {
                compress: false,   // 关闭代码压缩（保留空格、换行）
                mangle: false,     // 关键：禁止修改变量名和函数名
                output: {
                    beautify: true,  // 关键：强制格式化代码，使其美观可读
                    comments: true,  // 保留注释
                },
            },
            extractComments: false, // 不将注释提取到单独文件
        }),
    ],
});

module.exports = [
    lib_min,
    lib_bundle,
    {
        name: "test-script",
        entry: {
            "bili-data-manager-test": "./src/test.js",
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].user.js",
        },
        optimization: { minimize: false },
        plugins: [
            new ScriptCatWebpackPlugin({
                file: "bili-data-manager-test.user.js",
                name: "B站视频弹幕数据管理库 测试脚本",
                namespace: "https://github.com/ZBpine/bili-data-manager",
                version: "1.0.0",
                description: "B站（bv视频/ep番剧）弹幕数据管理库测试脚本",
                author: "ZBpine",
                metadata: {
                    icon: "https://www.bilibili.com/favicon.ico",
                    match: [
                        "https://www.bilibili.com/*",
                        "https://t.bilibili.com/*",
                        "https://www.baidu.com/*",
                    ],
                    grant: ["GM_xmlhttpRequest", "unsafeWindow"],
                    connect: ["api.bilibili.com"],
                    require: [
                        "https://update.greasyfork.org/scripts/563577/1739686/BiliDataManager.js",
                        "http://localhost:8000/dist/bili-data-manager.min.js?" + Date.now(),
                    ],
                    license: "MIT",
                },
            }),
        ],
    }
];
