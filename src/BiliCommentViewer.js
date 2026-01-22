// src/BiliCommentViewer.js

const LIKE_SVG = `
<svg class="bcv-like-ico" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
  <path d="M9.283433333333333 2.0303066666666663C9.095466666666667 2.0083933333333333 8.921333333333333 2.09014 8.828166666666666 2.1991199999999997C8.424633333333333 2.6711333333333336 8.332133333333333 3.3649466666666665 8.029333333333334 3.9012466666666663C7.630633333333333 4.607453333333333 7.258833333333333 5.034486666666666 6.800866666666666 5.436006666666666C6.42382 5.7665733333333336 6.042199999999999 5.987959999999999 5.666666666666666 6.09112L5.666666666666666 13.1497C6.19062 13.1611 6.751966666666666 13.168333333333333 7.333333333333333 13.168333333333333C8.831233333333333 13.168333333333333 10.1019 13.120766666666665 10.958166666666665 13.076699999999999C11.565133333333332 13.045433333333332 12.091966666666666 12.7451 12.366466666666668 12.256733333333333C12.7516 11.571599999999998 13.2264 10.5669 13.514166666666664 9.3835C13.7823 8.2808 13.904599999999999 7.374333333333333 13.959466666666666 6.734999999999999C13.984933333333332 6.438646666666667 13.750433333333334 6.166686666666667 13.386666666666665 6.166686666666667L10.065133333333332 6.166686666666667C9.898433333333333 6.166686666666667 9.742666666666667 6.08362 9.649833333333333 5.945166666666666C9.536066666666667 5.775493333333333 9.560033333333333 5.5828533333333334 9.6312 5.403346666666666C9.783966666666666 5.013846666666666 9.983933333333333 4.432846666666666 10.062766666666667 3.90454C10.1406 3.3830066666666667 10.121599999999999 2.9639466666666667 9.917133333333332 2.57626C9.697399999999998 2.1596933333333332 9.448266666666665 2.0495266666666665 9.283433333333333 2.0303066666666663zM10.773433333333333 5.166686666666666L13.386666666666665 5.166686666666666C14.269133333333333 5.166686666666666 15.036999999999999 5.875273333333333 14.9558 6.8206C14.897 7.505533333333333 14.767199999999999 8.462733333333333 14.485833333333334 9.6198C14.170333333333334 10.917200000000001 13.6532 12.008466666666665 13.238166666666666 12.746766666666666C12.7729 13.574433333333333 11.910266666666667 14.029 11.009566666666666 14.075366666666667C10.14 14.120166666666666 8.851766666666666 14.168333333333333 7.333333333333333 14.168333333333333C5.862206666666666 14.168333333333333 4.51776 14.1231 3.565173333333333 14.079633333333334C2.4932333333333334 14.030733333333332 1.5939999999999999 13.234466666666666 1.4786599999999999 12.143466666666665C1.4028 11.426066666666665 1.3333333333333333 10.4978 1.3333333333333333 9.501666666666665C1.3333333333333333 8.588966666666666 1.3916466666666667 7.761233333333333 1.4598999999999998 7.104466666666667C1.5791666666666666 5.95696 2.5641 5.166686666666666 3.671693333333333 5.166686666666666L5.166666666666666 5.166686666666666C5.3793066666666665 5.166686666666666 5.709213333333333 5.063186666666667 6.141613333333333 4.68408C6.516733333333333 4.355193333333333 6.816366666666667 4.015666666666666 7.158533333333333 3.409613333333333C7.5023 2.8007333333333335 7.6041 2.0920066666666663 8.068066666666667 1.54932C8.372133333333332 1.1936466666666665 8.8718 0.9755333333333334 9.399233333333333 1.03704C9.949866666666665 1.10124 10.457733333333334 1.4577866666666666 10.801633333333331 2.109713333333333C11.148866666666665 2.767993333333333 11.143799999999999 3.4356599999999995 11.051833333333335 4.0520933333333335C10.993899999999998 4.44022 10.875366666666666 4.852359999999999 10.773433333333333 5.166686666666666zM4.666666666666666 13.122166666666667L4.666666666666666 6.166686666666667L3.671693333333333 6.166686666666667C3.029613333333333 6.166686666666667 2.5161533333333335 6.615046666666666 2.4545466666666664 7.207833333333333C2.3890599999999997 7.837933333333333 2.333333333333333 8.630433333333333 2.333333333333333 9.501666666666665C2.333333333333333 10.453433333333333 2.399833333333333 11.345266666666667 2.473113333333333 12.038333333333334C2.533993333333333 12.614133333333331 3.0083466666666667 13.053199999999999 3.6107466666666665 13.0807C3.9228066666666668 13.094899999999999 4.278173333333333 13.109333333333334 4.666666666666666 13.122166666666667z"
  fill="currentColor"></path>
</svg>
`;

const LINK_SVG = `
<svg class="bcv-link-ico" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M11.7148 3.3904L12.1883 2.80873V2.80873L11.7148 3.3904ZM10.0835 7.11906L10.1675 7.86434C10.5469 7.82159 10.8335 7.50077 10.8335 7.11906H10.0835ZM2.40872 16.249L1.66281 16.1708L2.40872 16.249ZM3.41451 16.5323L2.78976 16.1174H2.78976L3.41451 16.5323ZM10.0835 12.9746H10.8335C10.8335 12.5859 10.5366 12.2616 10.1494 12.2275L10.0835 12.9746ZM11.7148 16.7765L11.2414 16.1948L11.7148 16.7765ZM18.5084 11.2469L18.035 10.6652H18.035L18.5084 11.2469ZM18.5085 8.92019L18.9819 8.33852L18.5085 8.92019ZM10.8335 4.16596C10.8335 3.95534 11.078 3.83911 11.2414 3.97206L12.1883 2.80873C11.0449 1.87805 9.33354 2.69168 9.33354 4.16596H10.8335ZM10.8335 7.11906V4.16596H9.33354V7.11906H10.8335ZM3.15463 16.3272C3.51573 12.883 4.69455 10.8613 6.01872 9.66171C7.35327 8.45275 8.91679 8.00533 10.1675 7.86434L9.99953 6.37378C8.54838 6.53736 6.65086 7.06509 5.01166 8.55003C3.36208 10.0444 2.05444 12.4353 1.66281 16.1708L3.15463 16.3272ZM2.78976 16.1174C2.84989 16.0268 2.94169 16.0279 2.97464 16.0369C2.99716 16.043 3.04471 16.0623 3.0897 16.1195C3.14262 16.1869 3.16079 16.2684 3.15463 16.3272L1.66281 16.1708C1.58766 16.8875 2.09197 17.3518 2.58225 17.4846C3.05748 17.6134 3.68033 17.4877 4.03925 16.9473L2.78976 16.1174ZM10.1494 12.2275C8.06107 12.0433 5.11428 12.6176 2.78976 16.1174L4.03925 16.9473C6.01112 13.9785 8.38309 13.5775 10.0177 13.7217L10.1494 12.2275ZM10.8335 16.0009V12.9746H9.33354V16.0009H10.8335ZM11.2414 16.1948C11.078 16.3278 10.8335 16.2116 10.8335 16.0009H9.33354C9.33354 17.4752 11.0449 18.2888 12.1883 17.3582L11.2414 16.1948ZM18.035 10.6652L11.2414 16.1948L12.1883 17.3582L18.9819 11.8285L18.035 10.6652ZM18.035 9.50185C18.4037 9.80199 18.4037 10.3651 18.035 10.6652L18.9819 11.8285C20.0881 10.9282 20.0881 9.23891 18.9819 8.33852L18.035 9.50185ZM11.2414 3.97206L18.035 9.50185L18.9819 8.33852L12.1883 2.80873L11.2414 3.97206Z"
    fill="currentColor" transform="translate(0, 2.5)"></path>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0126 2.74638C10.9645 1.89326 9.39575 2.63908 9.39575 3.9905V6.52347C8.04285 6.7607 6.42622 7.33445 5.01037 8.63537C3.36503 10.1472 2.06603 12.5719 1.70486 16.3755C1.64281 17.029 2.10319 17.4525 2.5535 17.5729C2.99132 17.6899 3.56409 17.5696 3.88706 17.0656C4.90489 15.4772 6.02606 14.6008 7.07814 14.1323C7.88831 13.7715 8.68279 13.6415 9.39575 13.6345V16.176C9.39575 17.5275 10.9645 18.2733 12.0126 17.4202L19.0613 11.683C20.0753 10.8576 20.0753 9.30912 19.0613 8.48377L12.0126 2.74638ZM10.7707 3.9905C10.7707 3.79744 10.9949 3.6909 11.1446 3.81277L18.1933 9.55016C18.5313 9.82528 18.5313 10.3414 18.1933 10.6166L11.1446 16.3538C10.9949 16.4756 10.7707 16.3691 10.7707 16.176V12.9744C10.7707 12.6181 10.4986 12.3209 10.1436 12.2896C9.10884 12.1983 7.8347 12.2902 6.51878 12.8763C5.36413 13.3904 4.20995 14.2707 3.17068 15.6812C3.60099 12.6381 4.70283 10.7852 5.94069 9.64786C7.29583 8.40271 8.89001 7.94525 10.1603 7.80206C10.508 7.76287 10.7707 7.46879 10.7707 7.11889V3.9905Z"
    fill="currentColor" transform="translate(0, 2.5)"></path>
</svg>
`;

const AVATAR_PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
    <rect width="100%" height="100%" fill="#f1f2f3"/>
    <circle cx="40" cy="32" r="14" fill="#d5d8dc"/>
    <rect x="18" y="52" width="44" height="16" rx="8" fill="#d5d8dc"/>
  </svg>`
)}`;

const PIC_PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240">
    <rect width="100%" height="100%" fill="#f1f2f3"/>
    <path d="M70 150l30-40 30 30 20-25 50 65H70z" fill="#d5d8dc"/>
    <circle cx="95" cy="95" r="12" fill="#d5d8dc"/>
  </svg>`
)}`;

const STYLE_ID = "bili-comment-viewer-style";

const STYLE_CONTENT = `
.bcv-wrap {
    display: flex;
    flex-direction: column;
    color: #18191c;
}

/* 顶部搜索 */
.bcv-search {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 10px;
    background: #fff;
    border-bottom: 1px solid #e3e5e7;
}
.bcv-searchInput {
    flex: 1;
    min-width: 220px;
    padding: 8px 10px;
    border: 1px solid #e3e5e7;
    border-radius: 10px;
    font-size: 14px;
    outline: none;
}
.bcv-searchStat {
    font-size: 12px;
    color: #61666d;
    min-width: 48px;
    text-align: center;
}
.bcv-btn {
    padding: 7px 10px;
    border: 1px solid #e3e5e7;
    border-radius: 10px;
    background: #fff;
    cursor: pointer;
    font-size: 13px;
    color: #18191c;
}
.bcv-btn:hover {
    background: #f6f7f8;
}

/* 虚拟化容器 */
.bcv-scroller {
    flex: 1;
    height: auto;
    overflow: auto;
    background: #fff;
}
.bcv-spacer {
    position: relative;
    width: 100%;
}
.bcv-items {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
}

/* ✅ bcv-items 下直接 bcv-item；bcv-item 自己就是“行” */
.bcv-item {
    position: absolute;
    left: 0;
    right: 0;
    padding: 10px 12px;

    display: flex;
    align-items: stretch;
    gap: 12px; /* ✅ indent/avatar/main 同一个 gap */
}

/* rail：每段 36px */
.bcv-rail {
    width: 36px;
    flex: 0 0 36px;
    position: relative;
}
.bcv-rail::after {
    content: "";
    position: absolute;
    top: -20px;
    bottom: 0;
    right: 0;
    width: 1px;
    background: #e3e5e7;
}
.bcv-rail-off::after {
}
.bcv-rail-click {
    cursor: pointer;
}

/* ✅ hover 整条线：同 ancId 的所有段统一加这个类 */
.bcv-rail-hover::after {
    width: 2px;
}

/* avatar */
.bcv-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    flex: 0 0 36px;
    object-fit: cover;
    background: #f1f2f3;
    cursor: pointer;
    align-self: flex-start;
}

/* 右侧内容 */
.bcv-main {
    flex: 1;
    min-width: 0;
}
.bcv-header {
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 1;
}
.bcv-name {
    font-size: 14px;
    font-weight: 600;
    color: #61666d;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 360px;
}
.bcv-name:hover {
    text-decoration: underline;
}
.bcv-top {
    display: inline-flex;
    align-items: center;
    padding: 1px 6px;
    border-radius: 999px;
    font-size: 12px;
    background: #fff3d6;
    color: #8a5a00;
    border: 1px solid rgba(138, 90, 0, 0.18);
}
.bcv-content {
    margin-top: 6px;
    font-size: 14px;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
}
.bcv-pics {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
.bcv-pic {
    width: 110px;
    height: 110px;
    border-radius: 10px;
    object-fit: cover;
    background: #f1f2f3;
    cursor: pointer;
}

/* meta */
.bcv-meta {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    font-size: 12px;
    color: #9499a0;
}
.bcv-likeWrap {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #9499a0;
}
.bcv-like-ico {
    display: inline-block;
    vertical-align: middle;
}

.bcv-link {
    display: inline-flex;
    align-items: center;
    color: #9499a0;
    text-decoration: none;
}
.bcv-link:hover {
    color: #61666d;
}
.bcv-link svg {
    width: 16px;
    height: 16px;
    display: block;
}

/* 回复切换放 meta */
.bcv-repliesToggleMeta {
    display: inline-flex;
    align-items: center;
    color: #61666d;
    text-decoration: none;
    cursor: pointer;
}
.bcv-repliesToggleMeta:hover {
    text-decoration: underline;
}

/* ✅ 命中高亮：不画边框，只淡背景 */
.bcv-hit {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.035);
}
.bcv-flash {
    outline: none !important;
    box-shadow: none !important;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.06);
    transition: background 260ms ease;
}
`

export class BiliCommentViewer {
    constructor({ mount, info, treeData, height = "calc(100vh - 20px)" }) {
        this.mount = this._resolveMount(mount);
        if (!this.mount) throw new Error("BiliCommentViewer: mount not found");

        this.info = info || {};
        this.tree = Array.isArray(treeData) ? treeData : [];

        this.height = height;
        this.visible = []; // [{ id, item, depth, ancestors }]
        this._railOn = [];
        this._rowHeights = new Map(); // id -> px
        this._defaultRowH = 180;
        this._prefix = [];
        this._totalH = 0;
        this._overscan = 8;

        this.expanded = new Set();

        this.byId = new Map();
        this.parent = new Map();
        this.orderAll = [];
        this._buildIndex();
        this._initAutoExpand();

        this._searchQuery = "";
        this._searchHits = [];
        this._searchCursor = -1;
        this._highlightId = null;
        this._pin = null; // { id, offset, until }

        this._hoverAnc = null; // 当前 hover 的 ancId，用来让“整条线”加粗

        this._ensureStyles();
        this._renderShell();

        this._rebuildVisible();
        this._recomputePrefix();
        this._renderVirtual(true);
        this._bind();
    }

    setData(treeData, info) {
        this.info = info || this.info || {};
        this.tree = Array.isArray(treeData) ? treeData : [];

        const oldExpanded = new Set(this.expanded);

        this.byId.clear();
        this.parent.clear();
        this.orderAll = [];
        this._buildIndex();

        this.expanded.clear();
        for (const id of oldExpanded) if (this.byId.has(id)) this.expanded.add(id);
        this._initAutoExpand();

        if (this._searchQuery) this._computeSearchHits(this._searchQuery);

        this._rebuildVisible();
        this._recomputePrefix();
        this._renderVirtual(true);
    }

    destroy() {
        if (this._ro) this._ro.disconnect();
        this.mount.innerHTML = "";
    }

    search(q) {
        const query = String(q ?? "").trim();
        this._searchQuery = query;
        this._computeSearchHits(query);
        if (!query) {
            this._highlightId = null;
            this._searchCursor = -1;
            this._updateSearchStatus();
            this._renderVirtual(true);
            return;
        }
        if (this._searchHits.length) {
            this._searchCursor = 0;
            this._jumpToHit(this._searchCursor);
        } else {
            this._highlightId = null;
            this._searchCursor = -1;
            this._updateSearchStatus();
            this._renderVirtual(true);
        }
    }

    nextHit() {
        if (!this._searchHits.length) return;
        this._searchCursor = (this._searchCursor + 1) % this._searchHits.length;
        this._jumpToHit(this._searchCursor);
    }

    prevHit() {
        if (!this._searchHits.length) return;
        this._searchCursor = (this._searchCursor - 1 + this._searchHits.length) % this._searchHits.length;
        this._jumpToHit(this._searchCursor);
    }

    expandAll() {
        for (const [id, it] of this.byId) {
            if (Array.isArray(it?.children) && it.children.length) this.expanded.add(id);
        }
        this._rebuildVisible();
        this._recomputePrefix();
        this._renderVirtual(true);
    }

    collapseAll() {
        this.expanded.clear();
        this._initAutoExpand();
        this._rebuildVisible();
        this._recomputePrefix();
        this._renderVirtual(true);
    }

    _buildIndex() {
        const walk = (items, parentId) => {
            for (const it of items) {
                const id = this._idOf(it);
                if (!id) continue;
                this.byId.set(id, it);
                this.parent.set(id, parentId);
                this.orderAll.push(id);
                if (Array.isArray(it.children) && it.children.length) walk(it.children, id);
            }
        };
        walk(this.tree, null);
    }

    _initAutoExpand() {
        for (const [id, it] of this.byId) {
            const c = it.rcount ?? 0;
            if (c > 0 && c <= 2) this.expanded.add(id);
        }
    }

    _toggleExpand(id, { focusOnCollapse = true, flashOnFocus = true } = {}) {
        const it = this.byId.get(id);
        const has = Array.isArray(it?.children) && it.children.length;
        if (!has) return;

        const wasOpen = this.expanded.has(id);

        if (wasOpen) this.expanded.delete(id);
        else this.expanded.add(id);

        this._rebuildVisible();
        this._recomputePrefix();

        // ✅ 如果是“收起”，且当前可能在子楼里，就滚回到这条被收起的评论
        if (wasOpen && focusOnCollapse) {
            this._scrollToIdInCurrentVisible(id, { flash: flashOnFocus, offset: 20 });
        } else {
            this._renderVirtual(true);
        }
    }

    _rebuildVisible() {
        const out = [];
        const anc = [];

        const walk = (items, depth) => {
            for (const it of items) {
                const id = this._idOf(it);
                if (!id) continue;

                out.push({ id, item: it, depth, ancestors: anc.slice() });

                const children = Array.isArray(it?.children) ? it.children : [];
                if (children.length && this.expanded.has(id)) {
                    anc.push(id);
                    walk(children, depth + 1);
                    anc.pop();
                }
            }
        };

        walk(this.tree, 0);

        const n = out.length;
        const railOn = new Array(n);
        for (let i = 0; i < n; i++) {
            const d = out[i].depth;
            const nextDepth = i + 1 < n ? out[i + 1].depth : -1;
            const arr = new Array(d).fill(false);
            for (let l = 0; l < d; l++) arr[l] = nextDepth > l;
            railOn[i] = arr;
        }

        this.visible = out;
        this._railOn = railOn;
    }

    _recomputePrefix() {
        const n = this.visible.length;
        const pref = new Array(n + 1);

        let top = 0;
        for (let i = 0; i < n; i++) {
            pref[i] = top;
            const id = this.visible[i].id;
            const h = this._rowHeights.get(id) ?? this._defaultRowH;
            top += h + 20; // ✅ 每行后面加间距
        }

        // 总高度：最后一行后面不需要 gap
        const total = n > 0 ? Math.max(0, top - 20) : 0;
        pref[n] = total;

        this._prefix = pref;
        this._totalH = total;
        this._spacer.style.height = `${total}px`;
    }

    _findStartIndex(scrollTop) {
        let lo = 0, hi = this.visible.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (this._prefix[mid] < scrollTop) lo = mid + 1;
            else hi = mid;
        }
        return Math.max(0, lo - 1);
    }

    _renderVirtual(force) {
        const viewportH = this._scroller.clientHeight || 600;
        const scrollTop = this._scroller.scrollTop || 0;

        const start = this._findStartIndex(scrollTop);
        const estCount = Math.ceil(viewportH / this._defaultRowH) + this._overscan * 2;
        const from = Math.max(0, start - this._overscan);
        const to = Math.min(this.visible.length, from + estCount);

        const key = `${from}-${to}-${this.visible.length}-${this._totalH}-${this._highlightId ?? ""}-${this._hoverAnc ?? ""}`;
        if (!force && key === this._lastKey) return;
        this._lastKey = key;

        this._itemsHost.innerHTML = "";
        const frag = document.createDocumentFragment();

        for (let i = from; i < to; i++) {
            const { id, item, depth } = this.visible[i];
            const top = this._prefix[i];

            // ✅ bcv-items 下面直接接 bcv-item：bcv-item 自己绝对定位
            const el = this._renderFlatComment(item, depth, i);
            el.style.transform = `translateY(${top}px)`;
            el.dataset.id = id;

            frag.appendChild(el);
        }

        this._itemsHost.appendChild(frag);

        // 渲染完应用 hover 的“整条线加粗”
        this._applyHoverAncToDom();

        this._observeRenderedRows();
    }

    _observeRenderedRows() {
        if (this._ro) this._ro.disconnect();

        const ro = new ResizeObserver((entries) => {
            const sc = this._scroller;
            const beforeScrollTop = sc.scrollTop || 0;
            const anchorIndex = this._findStartIndex(beforeScrollTop);
            const anchorOffset = beforeScrollTop - (this._prefix[anchorIndex] ?? 0);

            let changed = false;
            for (const ent of entries) {
                const el = ent.target;
                const id = el?.dataset?.id;
                if (!id) continue;

                const h = Math.max(60, Math.ceil(ent.contentRect.height));
                const prev = this._rowHeights.get(id);
                if (prev !== h) {
                    this._rowHeights.set(id, h);
                    changed = true;
                }
            }
            if (!changed) return;

            this._recomputePrefix();

            // ✅ 如果正在 pin（比如搜索跳转），每次高度变化都把目标滚回正确位置
            const pin = this._pin;
            if (pin && performance.now() < pin.until) {
                const idx = this.visible.findIndex(x => x.id === pin.id);
                if (idx >= 0) {
                    const top = this._prefix[idx] ?? 0;
                    const viewport = sc.clientHeight || 600;
                    const maxTop = Math.max(0, this._totalH - viewport);
                    sc.scrollTop = Math.max(0, Math.min(top - pin.offset, maxTop));
                    this._renderVirtual(true);
                    return; // ✅ 关键：不再执行你原来的“锚定补偿”，避免把它又拉偏
                }
            } else if (pin) {
                this._pin = null; // 过期清掉
            }

            // ✅ 锚定补偿：保持 anchorIndex 在视口中的相对位置
            const newAnchorTop = this._prefix[anchorIndex] ?? 0;
            const targetScrollTop = newAnchorTop + anchorOffset;

            const viewport = sc.clientHeight || 600;
            const maxTop = Math.max(0, this._totalH - viewport);
            sc.scrollTop = Math.max(0, Math.min(targetScrollTop, maxTop));

            this._renderVirtual(true);
        });

        // ✅ 观察 bcv-item（不再有 bcv-row）
        const items = this._itemsHost.querySelectorAll(".bcv-item");
        for (const it of items) ro.observe(it);
        this._ro = ro;
    }

    _setHoverAnc(ancId) {
        this._hoverAnc = ancId;
        this._applyHoverAncToDom();
    }

    _applyHoverAncToDom() {
        const host = this._itemsHost;
        if (!host) return;

        host.querySelectorAll(".bcv-rail-hover").forEach(el => el.classList.remove("bcv-rail-hover"));

        const anc = this._hoverAnc;
        if (!anc) return;

        const sel = `[data-anc="${CSS.escape(anc)}"]`;
        host.querySelectorAll(sel).forEach(el => el.classList.add("bcv-rail-hover"));
    }

    _renderFlatComment(item, depth, index) {
        const id = this._idOf(item);
        const reply = item?.reply || {};
        const member = reply?.member || {};
        const content = reply?.content || {};
        const uname = String(member?.uname ?? "未知");
        const mid = String(member?.mid ?? member?.mid_str ?? "");

        const children = Array.isArray(item?.children) ? item.children : [];
        const hasChildren = children.length > 0;
        const opened = this.expanded.has(id);

        const wrap = document.createElement("div");
        wrap.className = "bcv-item";
        wrap.dataset.id = id;

        const entry = this.visible[index];
        const rails = entry?.ancestors || [];
        const railOn = this._railOn?.[index] || [];

        for (let l = 0; l < depth; l++) {
            const ancId = rails[l];
            const ancItem = ancId ? this.byId.get(ancId) : null;
            const ancHasChildren = !!(ancItem && Array.isArray(ancItem.children) && ancItem.children.length);

            const seg = document.createElement("div");
            seg.className = "bcv-rail";
            seg.dataset.anc = ancId || "";
            if (!railOn[l]) seg.classList.add("bcv-rail-tail");

            if (ancId && ancHasChildren) {
                seg.classList.add("bcv-rail-click");
                seg.title = this.expanded.has(ancId) ? "收起回复" : "展开回复";
                seg.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this._toggleExpand(ancId);
                });
            }

            if (ancId) {
                seg.addEventListener("mouseenter", () => this._setHoverAnc(ancId));
                seg.addEventListener("mouseleave", () => this._setHoverAnc(null));
            }

            wrap.appendChild(seg);
        }

        const avatar = document.createElement("img");
        avatar.className = "bcv-avatar";
        avatar.loading = "lazy";
        avatar.decoding = "async";
        try { avatar.referrerPolicy = "no-referrer"; } catch (_) { }
        avatar.src = this._toHttps(member?.avatar);
        avatar.alt = uname;
        avatar.addEventListener("error", () => { avatar.src = AVATAR_PLACEHOLDER; }, { once: true });
        avatar.addEventListener("click", () => {
            const u = this._toHttps(member?.avatar);
            if (u) window.open(u, "_blank", "noopener,noreferrer");
        });
        wrap.appendChild(avatar);

        const main = document.createElement("div");
        main.className = "bcv-main";
        if (this._highlightId && id === this._highlightId) main.classList.add("bcv-hit");

        const header = document.createElement("div");
        header.className = "bcv-header";

        const name = document.createElement("a");
        name.className = "bcv-name";
        name.href = mid ? `https://space.bilibili.com/${encodeURIComponent(mid)}` : "javascript:void(0)";
        name.target = "_blank";
        name.rel = "noopener noreferrer";
        name.textContent = uname;
        header.appendChild(name);

        if (item?.isTop) {
            const topBadge = document.createElement("span");
            topBadge.className = "bcv-top";
            topBadge.textContent = "置顶";
            header.appendChild(topBadge);
        }

        main.appendChild(header);

        const msg = document.createElement("div");
        msg.className = "bcv-content";
        msg.textContent = String(content?.message ?? "");
        main.appendChild(msg);

        const picsEl = this._renderPictures(content?.pictures);
        if (picsEl) main.appendChild(picsEl);

        const meta = document.createElement("div");
        meta.className = "bcv-meta";

        const timeDesc = this._formatTime(reply?.ctime);
        const ipDesc = this._ipDesc(reply);
        if (timeDesc) meta.appendChild(this._span(timeDesc));
        if (ipDesc) meta.appendChild(this._span(ipDesc));

        const likeWrap = document.createElement("span");
        likeWrap.className = "bcv-likeWrap";
        likeWrap.innerHTML = `${LIKE_SVG}<span>${this._num(reply?.like)}</span>`;
        meta.appendChild(likeWrap);

        const link = document.createElement("a");
        link.className = "bcv-link";
        link.href = this._commentUrl(id) || "javascript:void(0)";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.title = "打开评论链接";
        link.innerHTML = `${LINK_SVG}<span>${id}</span>`;
        meta.appendChild(link);

        if (hasChildren) {
            const t = document.createElement("a");
            t.href = "javascript:void(0)";
            t.className = "bcv-repliesToggleMeta";
            t.textContent = opened ? "收起回复" : `${item.rcount}条回复`;
            t.addEventListener("click", (e) => {
                e.preventDefault();
                this._toggleExpand(id);
            });
            meta.appendChild(t);
        }

        main.appendChild(meta);
        wrap.appendChild(main);

        return wrap;
    }

    scrollToComment(id, opts = {}) {
        return this._scrollToId(String(id ?? ""), opts);
    }

    // ✅ 通用：滚到某条评论（可选展开祖先链、命中高亮、闪烁）
    _scrollToId(id, {
        expandAncestors = false,
        highlight = false,
        flash = true,
        offset = 20,
    } = {}) {
        if (!id) return;

        if (expandAncestors) {
            let p = this.parent.get(id);
            while (p) {
                this.expanded.add(p);
                p = this.parent.get(p);
            }
        }

        if (highlight) this._highlightId = id;

        // 统一走 rebuild + prefix + 定位
        this._rebuildVisible();
        this._recomputePrefix();
        this._scrollToIdInCurrentVisible(id, { flash, offset });
    }

    _scrollToIdInCurrentVisible(id, { flash = true, offset = 20, onlyIfOutside = true } = {}) {
        const idx = this.visible.findIndex((x) => x.id === id);
        if (idx < 0) return;

        const top = this._prefix[idx] ?? 0;
        const h = this._rowHeights.get(id) ?? this._defaultRowH;

        const sc = this._scroller;
        const viewTop = sc.scrollTop || 0;
        const viewBottom = viewTop + (sc.clientHeight || 600);

        // ✅ 判断：目标是否已经在视野内（允许上下留 offset 的“安全边距”）
        const safeTop = viewTop + offset;
        const safeBottom = viewBottom - offset;

        const itemTop = top;
        const itemBottom = top + h;

        const isInside = itemTop >= safeTop && itemBottom <= safeBottom;

        // ✅ 只有在视野外才滚动
        if (!onlyIfOutside || !isInside) {
            const maxTop = Math.max(0, this._totalH - (sc.clientHeight || 600));
            sc.scrollTop = Math.max(0, Math.min(itemTop - offset, maxTop));
            this._pin = { id, offset, until: performance.now() + 400 };
        } else {
            // 视野内：不动滚动条，但为了拿到 DOM（可能已在虚拟区）仍然渲染一次
            this._pin = null;
        }
        this._renderVirtual(true);
        if (!flash) return;

        requestAnimationFrame(() => {
            const el = this._itemsHost.querySelector(`[data-id="${CSS.escape(id)}"]`);
            const main = el?.querySelector(".bcu-main");
            if (main) {
                main.classList.add("bcv-flash");
                setTimeout(() => main.classList.remove("bcv-flash"), 450);
            }
        });
    }

    _jumpToHit(idx) {
        const id = this._searchHits[idx];
        if (!id) return;

        this._searchCursor = idx;
        this._updateSearchStatus();

        // ✅ 搜索：展开祖先链 + 高亮 + 闪
        this._scrollToId(id, {
            expandAncestors: true,
            highlight: true,
            flash: true,
            offset: 20,
        });
    }

    _computeSearchHits(query) {
        const q = String(query ?? "").trim();
        if (!q) {
            this._searchHits = [];
            this._searchCursor = -1;
            this._updateSearchStatus();
            return;
        }
        const ql = q.toLowerCase();
        const hits = [];

        for (const id of this.orderAll) {
            const it = this.byId.get(id);
            if (!it) continue;

            const r = it.reply || {};
            const m = r.member || {};
            const c = r.content || {};

            const mid = String(m?.mid ?? m?.mid_str ?? "");
            const uname = String(m?.uname ?? "");
            const msg = String(c?.message ?? "");

            if (id.includes(q) || (mid && mid.includes(q)) || uname.toLowerCase().includes(ql) || msg.toLowerCase().includes(ql)) {
                hits.push(id);
            }
        }

        this._searchHits = hits;
        this._searchCursor = hits.length ? 0 : -1;
        this._updateSearchStatus();
    }

    _renderShell() {
        this.mount.innerHTML = "";

        const wrap = document.createElement("div");
        wrap.className = "bcv-wrap";
        wrap.style.height = this._normalizeLength(this.height, "calc(100vh - 20px)");

        const search = document.createElement("div");
        search.className = "bcv-search";

        const input = document.createElement("input");
        input.className = "bcv-searchInput";
        input.placeholder = "搜索 rpid / mid / 用户名 / 内容（Enter 下一条，Shift+Enter 上一条）";

        const stat = document.createElement("div");
        stat.className = "bcv-searchStat";
        stat.textContent = "0/0";

        const prev = document.createElement("button");
        prev.className = "bcv-btn";
        prev.type = "button";
        prev.textContent = "上一个";

        const next = document.createElement("button");
        next.className = "bcv-btn";
        next.type = "button";
        next.textContent = "下一个";

        const allExp = document.createElement("button");
        allExp.className = "bcv-btn";
        allExp.type = "button";
        allExp.textContent = "全部展开";

        const allCol = document.createElement("button");
        allCol.className = "bcv-btn";
        allCol.type = "button";
        allCol.textContent = "全部收起";

        search.appendChild(input);
        search.appendChild(stat);
        search.appendChild(prev);
        search.appendChild(next);
        search.appendChild(allExp);
        search.appendChild(allCol);

        const scroller = document.createElement("div");
        scroller.className = "bcv-scroller";

        const spacer = document.createElement("div");
        spacer.className = "bcv-spacer";

        const itemsHost = document.createElement("div");
        itemsHost.className = "bcv-items";

        spacer.appendChild(itemsHost);
        scroller.appendChild(spacer);

        wrap.appendChild(search);
        wrap.appendChild(scroller);
        this.mount.appendChild(wrap);

        this._searchInput = input;
        this._searchStat = stat;
        this._prevBtn = prev;
        this._nextBtn = next;
        this._allExpBtn = allExp;
        this._allColBtn = allCol;

        this._scroller = scroller;
        this._spacer = spacer;
        this._itemsHost = itemsHost;

        this._updateSearchStatus();
    }

    _bind() {
        this._scroller.addEventListener("scroll", () => this._renderVirtual(false), { passive: true });
        window.addEventListener("resize", () => this._renderVirtual(true));

        this._searchInput.addEventListener("input", () => this.search(this._searchInput.value));
        this._searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                if (e.shiftKey) this.prevHit();
                else this.nextHit();
            }
        });

        this._prevBtn.addEventListener("click", () => this.prevHit());
        this._nextBtn.addEventListener("click", () => this.nextHit());
        this._allExpBtn.addEventListener("click", () => this.expandAll());
        this._allColBtn.addEventListener("click", () => this.collapseAll());
    }

    _updateSearchStatus() {
        const total = this._searchHits.length;
        const cur = total && this._searchCursor >= 0 ? this._searchCursor + 1 : 0;
        this._searchStat.textContent = `${cur}/${total}`;
    }

    _resolveMount(mount) {
        if (!mount) return null;
        if (typeof mount === "string") return document.querySelector(mount);
        if (mount instanceof HTMLElement) return mount;
        return null;
    }

    _idOf(it) {
        const id = it?.rpid_str ?? it?.rpid;
        if (id === undefined || id === null) return "";
        return String(id);
    }

    _num(x) {
        const n = Number(x ?? 0);
        return Number.isFinite(n) ? n : 0;
    }

    _toHttps(url) {
        if (!url) return "";
        const s = String(url);
        if (s.startsWith("//")) return "https:" + s;
        if (s.startsWith("http://")) return "https://" + s.slice(7);
        return s;
    }

    _formatTime(sec) {
        const s = Number(sec || 0);
        if (!Number.isFinite(s) || s <= 0) return "";
        const d = new Date(s * 1000);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const hh = String(d.getHours()).padStart(2, "0");
        const mm = String(d.getMinutes()).padStart(2, "0");
        return `${y}-${m}-${day} ${hh}:${mm}`;
    }

    _normalizeLength(length, df) {
        if (length == null) return df;
        if (typeof length === "number" && Number.isFinite(length)) return `${length}px`;
        const s = String(length).trim();
        // 允许：'100%', '80vh', '600px', 'calc(...)'
        return s || df;
    }

    _ipDesc(reply) {
        const loc = reply?.reply_control?.location;
        if (!loc) return "";
        return String(loc).trim();
    }

    _span(text) {
        const s = document.createElement("span");
        s.textContent = text;
        return s;
    }

    _commentUrl(rpid) {
        const base0 = String(this.info?.url ?? "").trim();
        if (!base0) return "";
        const base = base0.replace(/#.*$/, "");
        if (base.endsWith("/")) return `${base}#reply${encodeURIComponent(String(rpid))}`;
        return `${base}/#reply${encodeURIComponent(String(rpid))}`;
    }

    _renderPictures(pictures) {
        const pics = Array.isArray(pictures) ? pictures : [];
        if (!pics.length) return null;

        const wrap = document.createElement("div");
        wrap.className = "bcv-pics";

        for (const p of pics) {
            const src = this._toHttps(p?.img_src || p?.url || p?.src);
            if (!src) continue;
            const img = document.createElement("img");
            img.className = "bcv-pic";
            img.loading = "lazy";
            img.decoding = "async";
            try { img.referrerPolicy = "no-referrer"; } catch (_) { }
            img.src = src;
            img.addEventListener("error", () => { img.src = PIC_PLACEHOLDER; }, { once: true });
            img.addEventListener("click", () => window.open(img.src, "_blank", "noopener,noreferrer"));
            wrap.appendChild(img);
        }

        return wrap.childElementCount ? wrap : null;
    }

    _ensureStyles() {
        if (document.getElementById(STYLE_ID)) return;
        const st = document.createElement("style");
        st.id = STYLE_ID;
        st.textContent = STYLE_CONTENT;
        document.head.appendChild(st);
    }
}

export default BiliCommentViewer;
