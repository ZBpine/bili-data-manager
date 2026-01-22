const fs = require('fs');

const INPUT = './src/proto/dm_full.proto';
const OUTPUT = './src/proto/dm_filt.proto';
// ⚠️ 请根据【第一步】探测到的真实名称修改这里
const SEED_MESSAGES = ['DmSegMobileReply', 'DmWebViewReply'];

const content = fs.readFileSync(INPUT, 'utf8');

// 改进的正则：匹配 message/enum/service 块
// 处理了没有空格的情况 message Name{...}
const blockRegex = /(message|enum|service)\s+(\w+)\s*\{([\s\S]*?)\}/g;

const allTypes = new Map();
let match;
while ((match = blockRegex.exec(content)) !== null) {
    allTypes.set(match[2], match[0]);
}

// console.log("发现的所有类型:", Array.from(allTypes.keys()));

const keptTypes = new Set();
const queue = SEED_MESSAGES.filter(s => {
    if (!allTypes.has(s)) {
        console.warn(`❌ 警告: 在文件中未找到种子类型: ${s}`);
        return false;
    }
    return true;
});

while (queue.length > 0) {
    const name = queue.shift();
    if (keptTypes.has(name)) continue;
    keptTypes.add(name);

    const body = allTypes.get(name);
    // 匹配 body 中所有可能是类型的单词
    const deps = body.match(/\b\w+\b/g) || [];
    for (const dep of deps) {
        if (allTypes.has(dep) && !keptTypes.has(dep)) {
            queue.push(dep);
        }
    }
}

if (keptTypes.size > 0) {
    let finalProto = `syntax = "proto3";\n\n`;
    // 尝试提取原文件中的 package 定义
    const packageMatch = content.match(/package\s+[\w.]+;/);
    if (packageMatch) finalProto += packageMatch[0] + "\n\n";

    keptTypes.forEach(t => finalProto += allTypes.get(t) + "\n\n");
    fs.writeFileSync(OUTPUT, finalProto);
    console.log(`\n✅ 成功提取 ${keptTypes.size} 个类型到 ${OUTPUT}`);
} else {
    console.error("\n[错误] 没有提取到任何内容，请检查 SEED_MESSAGES 是否拼写正确。");
}