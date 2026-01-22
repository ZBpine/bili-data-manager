import { BiliCommentViewer } from "/src/BiliCommentViewer.js";

const { create } = window.BiliDataManager;

async function loadJSON(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`读取失败: ${url} (${r.status})`);
    return r.json();
}

function dummyHttpRequest() {
    throw new Error("offline viewer: httpRequest should not be called");
}

function buildControls({ mount, initialDepth, initialSort, onChange, title }) {
    mount.innerHTML = "";

    const bar = document.createElement("div");
    bar.style.cssText = `
    height:44px;
    display:flex;
    align-items:center;
    gap:12px;
    padding:0 12px;
    border-bottom:1px solid #e3e5e7;
    background:#fff;
    position:sticky;
    top:0;
    z-index:99999;
  `;

    const makeLabel = (text) => {
        const l = document.createElement("span");
        l.textContent = text;
        l.style.cssText = "font-size:13px;color:#18191c;";
        return l;
    };

    const makeSelect = () => {
        const s = document.createElement("select");
        s.style.cssText = `
      height:30px;
      border:1px solid #e3e5e7;
      border-radius:8px;
      padding:0 8px;
      background:#fff;
      font-size:13px;
      color:#18191c;
      outline:none;
    `;
        return s;
    };

    // depth
    const depthSel = makeSelect();
    depthSel.innerHTML = `
    <option value="1">一层</option>
    <option value="2">二层</option>
    <option value="3">多层</option>
  `;
    depthSel.value = String(initialDepth ?? 3);

    // sort
    const sortSel = makeSelect();
    sortSel.innerHTML = `
    <option value="time">时间</option>
    <option value="like">点赞数</option>
    <option value="reply">回复数</option>
  `;
    sortSel.value = String(initialSort ?? "like");

    const hint = document.createElement("span");
    hint.style.cssText = "margin-left:auto;font-size:12px;color:#9499a0;";
    hint.textContent = title;

    const fire = () => {
        const depth = Number(depthSel.value) || 3;
        const sort = sortSel.value || "like";
        onChange({ depth, sort });
    };

    depthSel.addEventListener("change", fire);
    sortSel.addEventListener("change", fire);

    bar.appendChild(makeLabel("缩进层数"));
    bar.appendChild(depthSel);
    bar.appendChild(makeLabel("排序"));
    bar.appendChild(sortSel);
    bar.appendChild(hint);

    mount.appendChild(bar);

    return { depthSel, sortSel };
}

async function main() {
    const data = await loadJSON("./data.json");
    window.data = data;

    const BDM = create({
        name: "CommentViewer",
        httpRequest: dummyHttpRequest,
        isLog: true,
    });

    const arcMgr = new BDM.BiliArchive();
    const info = arcMgr.setData(data);

    const cmtMgr = new BDM.BiliComment(info);
    cmtMgr.setData(data);

    window.arcMgr = arcMgr;
    window.cmtMgr = cmtMgr;

    // 初始参数
    const state = {
        depth: 3,
        sort: "like",
    };

    // 控件
    const controlsMount = document.querySelector("#controls");
    buildControls({
        mount: controlsMount,
        initialDepth: state.depth,
        initialSort: state.sort,
        onChange: ({ depth, sort }) => {
            state.depth = depth;
            state.sort = sort;

            const treeData = cmtMgr.replyTree.toTree({ depth: state.depth, sort: state.sort });
            window.ui.setData(treeData, info);
        },
        title: info.title ?? info.url ?? "评论区",
    });

    // Viewer
    const treeData0 = cmtMgr.replyTree.toTree({ depth: state.depth, sort: state.sort });
    const ui = new BiliCommentViewer({
        mount: "#app",
        info,
        treeData: treeData0,
        height: "100%",
    });
    window.ui = ui;
}

main().catch((e) => {
    console.error(e);
    document.querySelector("#app").innerHTML =
        `<pre style="white-space:pre-wrap;color:#c00;padding:12px">${String(e?.stack ?? e)}</pre>`;
});
