// src/test_show_reply.js

import { BiliCommentViewer } from "./BiliCommentViewer.js";

const UI_ID = "__bdm_reply_float_ui__";
const STYLE_ID = "__bdm_reply_float_style__";

export function createBiliCommentUI(cmtMgr, opts = {}) {
    if (!cmtMgr || !cmtMgr.replyTree) throw new Error("createBiliCommentUI: cmtMgr.replyTree 不存在");

    // 已存在：直接显示
    const existing = document.getElementById(UI_ID);
    if (existing) {
        existing.style.display = "block";
        return existing.__ctx?.viewer;
    }

    injectStyle();

    const state = {
        depth: Number(opts.depth ?? 3),
        sort: String(opts.sort ?? "like"),
    };

    // ---------- DOM ----------
    const root = document.createElement("div");
    root.id = UI_ID;
    root.className = "bdm-float";

    const header = document.createElement("div");
    header.className = "bdm-float-header";

    const title = document.createElement("div");
    title.className = "bdm-float-title";
    title.textContent = "评论查看器";

    const controls = document.createElement("div");
    controls.className = "bdm-float-controls";

    const depthSel = document.createElement("select");
    depthSel.innerHTML = `
    <option value="1">一层</option>
    <option value="2">二层</option>
    <option value="3">多层</option>
  `;
    depthSel.value = String(state.depth);

    const sortSel = document.createElement("select");
    sortSel.innerHTML = `
    <option value="time">时间</option>
    <option value="like">点赞数</option>
    <option value="reply">回复数</option>
  `;
    sortSel.value = state.sort;

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "bdm-close";
    closeBtn.textContent = "×";
    closeBtn.title = "关闭（Esc）";

    controls.appendChild(label("缩进层数"));
    controls.appendChild(depthSel);
    controls.appendChild(label("排序"));
    controls.appendChild(sortSel);

    header.appendChild(title);
    header.appendChild(controls);
    header.appendChild(closeBtn);

    const body = document.createElement("div");
    body.className = "bdm-float-body";

    const mount = document.createElement("div");
    mount.className = "bdm-float-mount";
    body.appendChild(mount);

    root.appendChild(header);
    root.appendChild(body);
    document.body.appendChild(root);

    // ---------- 关闭 / ESC ----------
    const hide = () => { root.style.display = "none"; };
    closeBtn.addEventListener("click", hide);

    const onKeyDown = (e) => {
        if (e.key === "Escape") hide();
    };
    window.addEventListener("keydown", onKeyDown);

    // ---------- 拖拽 ----------
    enableDrag(root, header);

    // ---------- Viewer ----------
    const info = cmtMgr.info || cmtMgr.arcInfo || cmtMgr.archiveInfo || {};
    const treeData0 = cmtMgr.replyTree.toTree({ depth: state.depth, sort: state.sort });

    const viewer = new BiliCommentViewer({
        mount,
        info,
        treeData: treeData0,
        height: "100%"
    });

    const ctx = {
        viewer,
        state,
        rebuild() {
            const treeData = cmtMgr.replyTree.toTree({ depth: state.depth, sort: state.sort });
            viewer.setData(treeData, info);
        },
        destroy() {
            window.removeEventListener("keydown", onKeyDown);
            try { viewer.destroy?.(); } catch (_) { }
            root.remove();
        },
        show() { root.style.display = "block"; },
        hide,
    };
    root.__ctx = ctx;

    // ---------- 参数控制 ----------
    const applyParams = () => {
        state.depth = Number(depthSel.value) || 3;
        state.sort = sortSel.value || "reply";
        ctx.rebuild();
    };
    depthSel.addEventListener("change", applyParams);
    sortSel.addEventListener("change", applyParams);

    return viewer;
}

// -------------------- helpers --------------------

function label(text) {
    const s = document.createElement("span");
    s.className = "bdm-lbl";
    s.textContent = text;
    return s;
}

function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const st = document.createElement("style");
    st.id = STYLE_ID;
    st.textContent = `
.bdm-float{
  position:fixed;
  right:16px;
  bottom:16px;
  width:min(1100px, calc(100vw - 32px));
  height:min(78vh, 820px);
  background:#fff;
  border:1px solid #e3e5e7;
  border-radius:12px;
  box-shadow:0 10px 30px rgba(0,0,0,.12);
  z-index:999999;
  overflow:hidden;

  display:flex;
  flex-direction:column;
  min-height:0;
}

.bdm-float-header{
  flex:0 0 auto;
  display:flex;
  align-items:center;
  gap:12px;
  padding:10px 10px;
  border-bottom:1px solid #e3e5e7;
  cursor:move;
  user-select:none;
}

.bdm-float-title{
  font-weight:600;
  color:#18191c;
  white-space:nowrap;
}

.bdm-float-controls{
  display:flex;
  align-items:center;
  gap:8px;
  flex:1;
  min-width:0;
}

.bdm-float-controls select,
.bdm-float-controls button{
  height:30px;
  border:1px solid #e3e5e7;
  border-radius:8px;
  background:#fff;
  color:#18191c;
  font-size:13px;
}
.bdm-float-controls select{ padding:0 8px; }
.bdm-float-controls button{
  padding:0 10px;
  cursor:pointer;
}
.bdm-float-controls button:hover{ background:#f6f7f8; }

.bdm-lbl{ font-size:12px; color:#61666d; }

.bdm-close{
  width:30px;
  height:30px;
  border:1px solid #e3e5e7;
  border-radius:8px;
  background:#fff;
  font-size:20px;
  line-height:26px;
  text-align:center;
  cursor:pointer;
}
.bdm-close:hover{ background:#f6f7f8; }

.bdm-float-body{
  flex:1;
  min-height:0;
  overflow:hidden; /* 不让外层滚 */
  display:flex;
}

.bdm-float-mount{
  flex:1;
  min-height:0; /* 让 viewer 内部滚动生效 */
}
`;
    document.head.appendChild(st);
}

function enableDrag(panel, handle) {
    let dragging = false;
    let sx = 0, sy = 0;
    let startLeft = 0, startTop = 0;

    const toLeftTop = () => {
        const r = panel.getBoundingClientRect();
        panel.style.left = `${r.left}px`;
        panel.style.top = `${r.top}px`;
        panel.style.right = "auto";
        panel.style.bottom = "auto";
    };

    handle.addEventListener("mousedown", (e) => {
        const tag = (e.target?.tagName || "").toLowerCase();
        if (tag === "select" || tag === "button") return;

        dragging = true;
        sx = e.clientX;
        sy = e.clientY;

        toLeftTop();
        const r = panel.getBoundingClientRect();
        startLeft = r.left;
        startTop = r.top;

        e.preventDefault();
    });

    window.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        const dx = e.clientX - sx;
        const dy = e.clientY - sy;

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const r = panel.getBoundingClientRect();

        const left = clamp(startLeft + dx, 0, vw - r.width);
        const top = clamp(startTop + dy, 0, vh - r.height);

        panel.style.left = `${left}px`;
        panel.style.top = `${top}px`;
    });

    window.addEventListener("mouseup", () => { dragging = false; });
}

function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
}
