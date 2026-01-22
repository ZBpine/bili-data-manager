// src/test_show_danmaku.js

const UI_ID = "__bdm_danmaku_float_ui__";
const STYLE_ID = "__bdm_danmaku_float_style__";
const ROW_HEIGHT = 30; // 固定行高

export function createBiliDanmakuUI(dmMgr) {
    if (!dmMgr?.data?.danmaku_list) {
        console.error("createBiliDanmakuUI: 数据无效", dmMgr);
        return;
    }

    const existing = document.getElementById(UI_ID);
    if (existing) {
        existing.style.display = "flex";
        return;
    }

    injectStyle();

    // 1. 数据预处理（添加索引以支持恢复原始顺序，预格式化显示字符）
    const rawData = dmMgr.data.danmaku_list.map((item, index) => {
        const dmid = item.idStr || String(item.id);
        return {
            ...item,
            dmid,
            _displayProgress: formatProgress(item.progress),
            _displayCtime: formatDate(item.ctime)
        };
    });

    let displayData = [...rawData];
    let state = {
        search: "",
        sortKey: null, // 初始不排序
        sortOrder: 1,  // 1: 升序, -1: 降序
    };

    // 2. DOM 结构
    const root = document.createElement("div");
    root.id = UI_ID;
    root.className = "bdm-float";

    const header = document.createElement("div");
    header.className = "bdm-float-header";
    header.innerHTML = `
        <div class="bdm-float-title">弹幕列表 (${rawData.length})</div>
        <input class="bdm-search-input" placeholder="搜索内容或 dmid..." />
        <button class="bdm-close" title="关闭 (Esc)">&times;</button>
    `;

    const tableHead = document.createElement("div");
    tableHead.className = "bdm-table-head";
    tableHead.innerHTML = `
        <div class="bdm-col col-time" data-key="progress">时间<span class="sort-icon"></span></div>
        <div class="bdm-col col-content" data-key="content">弹幕内容<span class="sort-icon"></span></div>
        <div class="bdm-col col-date" data-key="ctime">发送时间<span class="sort-icon"></span></div>
    `;

    const viewport = document.createElement("div");
    viewport.className = "bdm-viewport";

    const scrollSpacer = document.createElement("div");
    scrollSpacer.className = "bdm-scroll-spacer";

    const contentArea = document.createElement("div");
    contentArea.className = "bdm-content-area";

    viewport.appendChild(scrollSpacer);
    viewport.appendChild(contentArea);
    root.appendChild(header);
    root.appendChild(tableHead);
    root.appendChild(viewport);
    document.body.appendChild(root);

    // 3. 排序与过滤逻辑
    const updateDisplayData = () => {
        let filtered = rawData;

        // 搜索过滤
        if (state.search) {
            const s = state.search.toLowerCase();
            filtered = rawData.filter(d =>
                d.content.toLowerCase().includes(s) || d.dmid.includes(s)
            );
        } else {
            // 如果没有搜索，使用全部数据（注意要 copy 数组以免污染 rawData）
            filtered = [...rawData];
        }

        // 排序逻辑
        if (state.sortKey) {
            filtered.sort((a, b) => {
                const valA = a[state.sortKey];
                const valB = b[state.sortKey];

                if (state.sortKey === "content") {
                    return valA.localeCompare(valB) * state.sortOrder;
                }
                return (Number(valA) - Number(valB)) * state.sortOrder;
            });
        }
        // else: 保持 _index 顺序（即原始顺序）

        displayData = filtered;
        renderVirtualList();
        updateSortUI();
    };

    // 4. 虚拟列表渲染
    const renderVirtualList = () => {
        const scrollTop = viewport.scrollTop;
        const containerHeight = viewport.clientHeight;

        scrollSpacer.style.height = `${displayData.length * ROW_HEIGHT}px`;

        let startIndex = Math.floor(scrollTop / ROW_HEIGHT);
        let endIndex = Math.ceil((scrollTop + containerHeight) / ROW_HEIGHT);

        startIndex = Math.max(0, startIndex - 5);
        endIndex = Math.min(displayData.length, endIndex + 5);

        contentArea.style.transform = `translateY(${startIndex * ROW_HEIGHT}px)`;

        const fragment = document.createDocumentFragment();
        for (let i = startIndex; i < endIndex; i++) {
            const item = displayData[i];
            const row = document.createElement("div");
            row.className = "bdm-row";
            row.style.height = `${ROW_HEIGHT}px`;
            row.dataset.dmid = item.dmid;
            row.innerHTML = `
                <div class="bdm-col col-time">${item._displayProgress}</div>
                <div class="bdm-col col-content" title="${escapeHTML(item.content)}">${escapeHTML(item.content)}</div>
                <div class="bdm-col col-date">${item._displayCtime}</div>
            `;
            fragment.appendChild(row);
        }
        contentArea.innerHTML = "";
        contentArea.appendChild(fragment);
        contentArea.onclick = (e) => {
            const row = e.target.closest(".bdm-row");
            if (!row) return;
            const dmid = row.dataset.dmid;
            console.log(dmid, dmMgr.dmDict?.[dmid]);
        };
    };

    // 5. 事件监听
    viewport.addEventListener("scroll", renderVirtualList);

    const searchInput = header.querySelector(".bdm-search-input");
    searchInput.addEventListener("input", (e) => {
        state.search = e.target.value.trim();
        updateDisplayData();
        viewport.scrollTop = 0;
    });

    tableHead.addEventListener("click", (e) => {
        const col = e.target.closest(".bdm-col");
        if (!col) return;
        const key = col.dataset.key;

        if (state.sortKey === key) {
            state.sortOrder *= -1; // 切换正序/倒序
        } else {
            state.sortKey = key;
            state.sortOrder = 1;  // 默认升序
        }
        updateDisplayData();
    });

    const closeBtn = header.querySelector(".bdm-close");
    const hide = () => { root.style.display = "none"; };
    closeBtn.addEventListener("click", hide);

    const onEsc = (e) => { if (e.key === "Escape" && root.style.display !== "none") hide(); };
    window.addEventListener("keydown", onEsc);

    enableDrag(root, header);

    // 初始化
    const resizeObs = new ResizeObserver(renderVirtualList);
    resizeObs.observe(viewport);
    updateDisplayData();

    function updateSortUI() {
        tableHead.querySelectorAll(".bdm-col").forEach(col => {
            const key = col.dataset.key;
            const icon = col.querySelector(".sort-icon");
            if (key === state.sortKey) {
                col.classList.add("active");
                icon.textContent = state.sortOrder === 1 ? "▼" : "▲";
            } else {
                col.classList.remove("active");
                icon.textContent = "";
            }
        });
    }
}

// -------------------- 辅助函数 --------------------

function formatProgress(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');

    return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

function formatDate(ts) {
    const d = new Date(ts * 1000);
    const mon = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${mon}-${day} ${hh}:${mm}`;
}

function escapeHTML(str) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return str.replace(/[&<>"']/g, m => map[m]);
}

function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const st = document.createElement("style");
    st.id = STYLE_ID;
    st.textContent = `
.bdm-float {
    position: fixed; right: 20px; bottom: 20px;
    width: 600px; height: 600px;
    background: #fff; border: 1px solid #e3e5e7;
    border-radius: 12px; box-shadow: 0 12px 40px rgba(0,0,0,.15);
    z-index: 999999; display: flex; flex-direction: column;
    overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.bdm-float-header {
    padding: 10px 16px; display: flex; align-items: center; gap: 15px;
    background: #fff; cursor: move; border-bottom: 1px solid #f1f2f3;
}
.bdm-float-title { font-weight: 600; color: #18191c; font-size: 14px; white-space: nowrap; }
.bdm-search-input {
    flex: 1; height: 28px; border: 1px solid #e3e5e7; border-radius: 6px;
    padding: 0 10px; font-size: 12px; outline: none; background: #f6f7f8;
}
.bdm-search-input:focus { border-color: #00aeec; background: #fff; }
.bdm-close {
    background: none; border: none; font-size: 22px; cursor: pointer; color: #9499a0; line-height: 1;
}
.bdm-close:hover { color: #f85a54; }

.bdm-table-head {
    display: flex; border-bottom: 1px solid #e3e5e7;
    font-size: 12px; color: #61666d; background: #f6f7f8;
    scrollbar-gutter: stable; overflow-y: hidden; flex-shrink: 0;
}
.bdm-viewport {
    flex: 1; overflow-y: scroll; position: relative; will-change: transform; scrollbar-gutter: stable;
}
.bdm-scroll-spacer { position: absolute; top: 0; left: 0; right: 0; pointer-events: none; }
.bdm-content-area { position: absolute; top: 0; left: 0; right: 0; }

.bdm-row {
    display: flex; align-items: center; border-bottom: 1px solid #f1f2f3;
    font-size: 13px; color: #18191c;
}
.bdm-row:hover { background: #f1f2f3; }
.bdm-col { padding: 0 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.col-time { width: 80px; text-align: left; flex-shrink: 0; }
.col-content { flex: 1; }
.col-date { width: 100px; color: #9499a0; font-size: 12px; flex-shrink: 0; text-align: left; }

.bdm-table-head .bdm-col {
    height: 34px; line-height: 34px; cursor: pointer; user-select: none; font-weight: 500;
}
.bdm-table-head .bdm-col:hover { color: #00aeec; }
.bdm-table-head .bdm-col.active { color: #00aeec; }
.sort-icon { display: inline-block; width: 12px; font-size: 10px; margin-left: 4px; vertical-align: baseline; }
    `;
    document.head.appendChild(st);
}

function enableDrag(panel, handle) {
    let dragging = false;
    let sx = 0, sy = 0, startLeft = 0, startTop = 0;
    handle.addEventListener("mousedown", (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON") return;
        dragging = true;
        const r = panel.getBoundingClientRect();
        startLeft = r.left; startTop = r.top;
        sx = e.clientX; sy = e.clientY;
        panel.style.left = startLeft + "px";
        panel.style.top = startTop + "px";
        panel.style.right = "auto"; panel.style.bottom = "auto";
        e.preventDefault();
    });
    window.addEventListener("mousemove", (e) => {
        if (!dragging) return;
        const left = startLeft + (e.clientX - sx);
        const top = startTop + (e.clientY - sy);
        panel.style.left = Math.max(0, Math.min(window.innerWidth - panel.offsetWidth, left)) + "px";
        panel.style.top = Math.max(0, Math.min(window.innerHeight - panel.offsetHeight, top)) + "px";
    });
    window.addEventListener("mouseup", () => dragging = false);
}