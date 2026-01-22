/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

const $Reader = $protobuf.Reader, $util = $protobuf.util;

const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const bilibili = $root.bilibili = (() => {

    const bilibili = {};

    bilibili.community = (function() {

        const community = {};

        community.service = (function() {

            const service = {};

            service.dm = (function() {

                const dm = {};

                dm.v1 = (function() {

                    const v1 = {};

                    v1.DmSegMobileReply = (function() {

                        function DmSegMobileReply(p) {
                            this.elems = [];
                            this.colorfulSrc = [];
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        DmSegMobileReply.prototype.elems = $util.emptyArray;
                        DmSegMobileReply.prototype.state = 0;
                        DmSegMobileReply.prototype.aiFlag = null;
                        DmSegMobileReply.prototype.colorfulSrc = $util.emptyArray;

                        DmSegMobileReply.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.DmSegMobileReply();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        if (!(m.elems && m.elems.length))
                                            m.elems = [];
                                        m.elems.push($root.bilibili.community.service.dm.v1.DanmakuElem.decode(r, r.uint32()));
                                        break;
                                    }
                                case 2: {
                                        m.state = r.int32();
                                        break;
                                    }
                                case 3: {
                                        m.aiFlag = $root.bilibili.community.service.dm.v1.DanmakuAIFlag.decode(r, r.uint32());
                                        break;
                                    }
                                case 5: {
                                        if (!(m.colorfulSrc && m.colorfulSrc.length))
                                            m.colorfulSrc = [];
                                        m.colorfulSrc.push($root.bilibili.community.service.dm.v1.DmColorful.decode(r, r.uint32()));
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        DmSegMobileReply.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.DmSegMobileReply)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.DmSegMobileReply();
                            if (d.elems) {
                                if (!Array.isArray(d.elems))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmSegMobileReply.elems: array expected");
                                m.elems = [];
                                for (var i = 0; i < d.elems.length; ++i) {
                                    if (typeof d.elems[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.DmSegMobileReply.elems: object expected");
                                    m.elems[i] = $root.bilibili.community.service.dm.v1.DanmakuElem.fromObject(d.elems[i]);
                                }
                            }
                            if (d.state != null) {
                                m.state = d.state | 0;
                            }
                            if (d.aiFlag != null) {
                                if (typeof d.aiFlag !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.DmSegMobileReply.aiFlag: object expected");
                                m.aiFlag = $root.bilibili.community.service.dm.v1.DanmakuAIFlag.fromObject(d.aiFlag);
                            }
                            if (d.colorfulSrc) {
                                if (!Array.isArray(d.colorfulSrc))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmSegMobileReply.colorfulSrc: array expected");
                                m.colorfulSrc = [];
                                for (var i = 0; i < d.colorfulSrc.length; ++i) {
                                    if (typeof d.colorfulSrc[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.DmSegMobileReply.colorfulSrc: object expected");
                                    m.colorfulSrc[i] = $root.bilibili.community.service.dm.v1.DmColorful.fromObject(d.colorfulSrc[i]);
                                }
                            }
                            return m;
                        };

                        DmSegMobileReply.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.arrays || o.defaults) {
                                d.elems = [];
                                d.colorfulSrc = [];
                            }
                            if (o.defaults) {
                                d.state = 0;
                                d.aiFlag = null;
                            }
                            if (m.elems && m.elems.length) {
                                d.elems = [];
                                for (var j = 0; j < m.elems.length; ++j) {
                                    d.elems[j] = $root.bilibili.community.service.dm.v1.DanmakuElem.toObject(m.elems[j], o);
                                }
                            }
                            if (m.state != null && m.hasOwnProperty("state")) {
                                d.state = m.state;
                            }
                            if (m.aiFlag != null && m.hasOwnProperty("aiFlag")) {
                                d.aiFlag = $root.bilibili.community.service.dm.v1.DanmakuAIFlag.toObject(m.aiFlag, o);
                            }
                            if (m.colorfulSrc && m.colorfulSrc.length) {
                                d.colorfulSrc = [];
                                for (var j = 0; j < m.colorfulSrc.length; ++j) {
                                    d.colorfulSrc[j] = $root.bilibili.community.service.dm.v1.DmColorful.toObject(m.colorfulSrc[j], o);
                                }
                            }
                            return d;
                        };

                        DmSegMobileReply.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        DmSegMobileReply.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DmSegMobileReply";
                        };

                        return DmSegMobileReply;
                    })();

                    v1.DmWebViewReply = (function() {

                        function DmWebViewReply(p) {
                            this.specialDms = [];
                            this.commandDms = [];
                            this.reportFilterContent = [];
                            this.expressions = [];
                            this.postPanel = [];
                            this.activityMeta = [];
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        DmWebViewReply.prototype.state = 0;
                        DmWebViewReply.prototype.text = "";
                        DmWebViewReply.prototype.textSide = "";
                        DmWebViewReply.prototype.dmSge = null;
                        DmWebViewReply.prototype.flag = null;
                        DmWebViewReply.prototype.specialDms = $util.emptyArray;
                        DmWebViewReply.prototype.checkBox = false;
                        DmWebViewReply.prototype.count = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        DmWebViewReply.prototype.commandDms = $util.emptyArray;
                        DmWebViewReply.prototype.playerConfig = null;
                        DmWebViewReply.prototype.reportFilterContent = $util.emptyArray;
                        DmWebViewReply.prototype.expressions = $util.emptyArray;
                        DmWebViewReply.prototype.postPanel = $util.emptyArray;
                        DmWebViewReply.prototype.activityMeta = $util.emptyArray;

                        DmWebViewReply.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.DmWebViewReply();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        m.state = r.int32();
                                        break;
                                    }
                                case 2: {
                                        m.text = r.string();
                                        break;
                                    }
                                case 3: {
                                        m.textSide = r.string();
                                        break;
                                    }
                                case 4: {
                                        m.dmSge = $root.bilibili.community.service.dm.v1.DmSegConfig.decode(r, r.uint32());
                                        break;
                                    }
                                case 5: {
                                        m.flag = $root.bilibili.community.service.dm.v1.DanmakuFlagConfig.decode(r, r.uint32());
                                        break;
                                    }
                                case 6: {
                                        if (!(m.specialDms && m.specialDms.length))
                                            m.specialDms = [];
                                        m.specialDms.push(r.string());
                                        break;
                                    }
                                case 7: {
                                        m.checkBox = r.bool();
                                        break;
                                    }
                                case 8: {
                                        m.count = r.int64();
                                        break;
                                    }
                                case 9: {
                                        if (!(m.commandDms && m.commandDms.length))
                                            m.commandDms = [];
                                        m.commandDms.push($root.bilibili.community.service.dm.v1.CommandDm.decode(r, r.uint32()));
                                        break;
                                    }
                                case 10: {
                                        m.playerConfig = $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig.decode(r, r.uint32());
                                        break;
                                    }
                                case 11: {
                                        if (!(m.reportFilterContent && m.reportFilterContent.length))
                                            m.reportFilterContent = [];
                                        m.reportFilterContent.push(r.string());
                                        break;
                                    }
                                case 12: {
                                        if (!(m.expressions && m.expressions.length))
                                            m.expressions = [];
                                        m.expressions.push($root.bilibili.community.service.dm.v1.Expressions.decode(r, r.uint32()));
                                        break;
                                    }
                                case 13: {
                                        if (!(m.postPanel && m.postPanel.length))
                                            m.postPanel = [];
                                        m.postPanel.push($root.bilibili.community.service.dm.v1.PostPanel.decode(r, r.uint32()));
                                        break;
                                    }
                                case 14: {
                                        if (!(m.activityMeta && m.activityMeta.length))
                                            m.activityMeta = [];
                                        m.activityMeta.push(r.string());
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        DmWebViewReply.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.DmWebViewReply)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.DmWebViewReply();
                            if (d.state != null) {
                                m.state = d.state | 0;
                            }
                            if (d.text != null) {
                                m.text = String(d.text);
                            }
                            if (d.textSide != null) {
                                m.textSide = String(d.textSide);
                            }
                            if (d.dmSge != null) {
                                if (typeof d.dmSge !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.dmSge: object expected");
                                m.dmSge = $root.bilibili.community.service.dm.v1.DmSegConfig.fromObject(d.dmSge);
                            }
                            if (d.flag != null) {
                                if (typeof d.flag !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.flag: object expected");
                                m.flag = $root.bilibili.community.service.dm.v1.DanmakuFlagConfig.fromObject(d.flag);
                            }
                            if (d.specialDms) {
                                if (!Array.isArray(d.specialDms))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.specialDms: array expected");
                                m.specialDms = [];
                                for (var i = 0; i < d.specialDms.length; ++i) {
                                    m.specialDms[i] = String(d.specialDms[i]);
                                }
                            }
                            if (d.checkBox != null) {
                                m.checkBox = Boolean(d.checkBox);
                            }
                            if (d.count != null) {
                                if ($util.Long)
                                    (m.count = $util.Long.fromValue(d.count)).unsigned = false;
                                else if (typeof d.count === "string")
                                    m.count = parseInt(d.count, 10);
                                else if (typeof d.count === "number")
                                    m.count = d.count;
                                else if (typeof d.count === "object")
                                    m.count = new $util.LongBits(d.count.low >>> 0, d.count.high >>> 0).toNumber();
                            }
                            if (d.commandDms) {
                                if (!Array.isArray(d.commandDms))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.commandDms: array expected");
                                m.commandDms = [];
                                for (var i = 0; i < d.commandDms.length; ++i) {
                                    if (typeof d.commandDms[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.commandDms: object expected");
                                    m.commandDms[i] = $root.bilibili.community.service.dm.v1.CommandDm.fromObject(d.commandDms[i]);
                                }
                            }
                            if (d.playerConfig != null) {
                                if (typeof d.playerConfig !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.playerConfig: object expected");
                                m.playerConfig = $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig.fromObject(d.playerConfig);
                            }
                            if (d.reportFilterContent) {
                                if (!Array.isArray(d.reportFilterContent))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.reportFilterContent: array expected");
                                m.reportFilterContent = [];
                                for (var i = 0; i < d.reportFilterContent.length; ++i) {
                                    m.reportFilterContent[i] = String(d.reportFilterContent[i]);
                                }
                            }
                            if (d.expressions) {
                                if (!Array.isArray(d.expressions))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.expressions: array expected");
                                m.expressions = [];
                                for (var i = 0; i < d.expressions.length; ++i) {
                                    if (typeof d.expressions[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.expressions: object expected");
                                    m.expressions[i] = $root.bilibili.community.service.dm.v1.Expressions.fromObject(d.expressions[i]);
                                }
                            }
                            if (d.postPanel) {
                                if (!Array.isArray(d.postPanel))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.postPanel: array expected");
                                m.postPanel = [];
                                for (var i = 0; i < d.postPanel.length; ++i) {
                                    if (typeof d.postPanel[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.postPanel: object expected");
                                    m.postPanel[i] = $root.bilibili.community.service.dm.v1.PostPanel.fromObject(d.postPanel[i]);
                                }
                            }
                            if (d.activityMeta) {
                                if (!Array.isArray(d.activityMeta))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.activityMeta: array expected");
                                m.activityMeta = [];
                                for (var i = 0; i < d.activityMeta.length; ++i) {
                                    m.activityMeta[i] = String(d.activityMeta[i]);
                                }
                            }
                            return m;
                        };

                        DmWebViewReply.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.arrays || o.defaults) {
                                d.specialDms = [];
                                d.commandDms = [];
                                d.reportFilterContent = [];
                                d.expressions = [];
                                d.postPanel = [];
                                d.activityMeta = [];
                            }
                            if (o.defaults) {
                                d.state = 0;
                                d.text = "";
                                d.textSide = "";
                                d.dmSge = null;
                                d.flag = null;
                                d.checkBox = false;
                                if ($util.Long) {
                                    var n = new $util.Long(0, 0, false);
                                    d.count = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                                } else
                                    d.count = o.longs === String ? "0" : 0;
                                d.playerConfig = null;
                            }
                            if (m.state != null && m.hasOwnProperty("state")) {
                                d.state = m.state;
                            }
                            if (m.text != null && m.hasOwnProperty("text")) {
                                d.text = m.text;
                            }
                            if (m.textSide != null && m.hasOwnProperty("textSide")) {
                                d.textSide = m.textSide;
                            }
                            if (m.dmSge != null && m.hasOwnProperty("dmSge")) {
                                d.dmSge = $root.bilibili.community.service.dm.v1.DmSegConfig.toObject(m.dmSge, o);
                            }
                            if (m.flag != null && m.hasOwnProperty("flag")) {
                                d.flag = $root.bilibili.community.service.dm.v1.DanmakuFlagConfig.toObject(m.flag, o);
                            }
                            if (m.specialDms && m.specialDms.length) {
                                d.specialDms = [];
                                for (var j = 0; j < m.specialDms.length; ++j) {
                                    d.specialDms[j] = m.specialDms[j];
                                }
                            }
                            if (m.checkBox != null && m.hasOwnProperty("checkBox")) {
                                d.checkBox = m.checkBox;
                            }
                            if (m.count != null && m.hasOwnProperty("count")) {
                                if (typeof m.count === "number")
                                    d.count = o.longs === String ? String(m.count) : m.count;
                                else
                                    d.count = o.longs === String ? $util.Long.prototype.toString.call(m.count) : o.longs === Number ? new $util.LongBits(m.count.low >>> 0, m.count.high >>> 0).toNumber() : m.count;
                            }
                            if (m.commandDms && m.commandDms.length) {
                                d.commandDms = [];
                                for (var j = 0; j < m.commandDms.length; ++j) {
                                    d.commandDms[j] = $root.bilibili.community.service.dm.v1.CommandDm.toObject(m.commandDms[j], o);
                                }
                            }
                            if (m.playerConfig != null && m.hasOwnProperty("playerConfig")) {
                                d.playerConfig = $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig.toObject(m.playerConfig, o);
                            }
                            if (m.reportFilterContent && m.reportFilterContent.length) {
                                d.reportFilterContent = [];
                                for (var j = 0; j < m.reportFilterContent.length; ++j) {
                                    d.reportFilterContent[j] = m.reportFilterContent[j];
                                }
                            }
                            if (m.expressions && m.expressions.length) {
                                d.expressions = [];
                                for (var j = 0; j < m.expressions.length; ++j) {
                                    d.expressions[j] = $root.bilibili.community.service.dm.v1.Expressions.toObject(m.expressions[j], o);
                                }
                            }
                            if (m.postPanel && m.postPanel.length) {
                                d.postPanel = [];
                                for (var j = 0; j < m.postPanel.length; ++j) {
                                    d.postPanel[j] = $root.bilibili.community.service.dm.v1.PostPanel.toObject(m.postPanel[j], o);
                                }
                            }
                            if (m.activityMeta && m.activityMeta.length) {
                                d.activityMeta = [];
                                for (var j = 0; j < m.activityMeta.length; ++j) {
                                    d.activityMeta[j] = m.activityMeta[j];
                                }
                            }
                            return d;
                        };

                        DmWebViewReply.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        DmWebViewReply.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DmWebViewReply";
                        };

                        return DmWebViewReply;
                    })();

                    v1.DanmakuElem = (function() {

                        function DanmakuElem(p) {
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        DanmakuElem.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        DanmakuElem.prototype.progress = 0;
                        DanmakuElem.prototype.mode = 0;
                        DanmakuElem.prototype.fontsize = 0;
                        DanmakuElem.prototype.color = 0;
                        DanmakuElem.prototype.midHash = "";
                        DanmakuElem.prototype.content = "";
                        DanmakuElem.prototype.ctime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        DanmakuElem.prototype.weight = 0;
                        DanmakuElem.prototype.action = "";
                        DanmakuElem.prototype.pool = 0;
                        DanmakuElem.prototype.idStr = "";
                        DanmakuElem.prototype.attr = 0;
                        DanmakuElem.prototype.animation = "";
                        DanmakuElem.prototype.colorful = 0;

                        DanmakuElem.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.DanmakuElem();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        m.id = r.int64();
                                        break;
                                    }
                                case 2: {
                                        m.progress = r.int32();
                                        break;
                                    }
                                case 3: {
                                        m.mode = r.int32();
                                        break;
                                    }
                                case 4: {
                                        m.fontsize = r.int32();
                                        break;
                                    }
                                case 5: {
                                        m.color = r.uint32();
                                        break;
                                    }
                                case 6: {
                                        m.midHash = r.string();
                                        break;
                                    }
                                case 7: {
                                        m.content = r.string();
                                        break;
                                    }
                                case 8: {
                                        m.ctime = r.int64();
                                        break;
                                    }
                                case 9: {
                                        m.weight = r.int32();
                                        break;
                                    }
                                case 10: {
                                        m.action = r.string();
                                        break;
                                    }
                                case 11: {
                                        m.pool = r.int32();
                                        break;
                                    }
                                case 12: {
                                        m.idStr = r.string();
                                        break;
                                    }
                                case 13: {
                                        m.attr = r.int32();
                                        break;
                                    }
                                case 22: {
                                        m.animation = r.string();
                                        break;
                                    }
                                case 24: {
                                        m.colorful = r.int32();
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        DanmakuElem.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.DanmakuElem)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.DanmakuElem();
                            if (d.id != null) {
                                if ($util.Long)
                                    (m.id = $util.Long.fromValue(d.id)).unsigned = false;
                                else if (typeof d.id === "string")
                                    m.id = parseInt(d.id, 10);
                                else if (typeof d.id === "number")
                                    m.id = d.id;
                                else if (typeof d.id === "object")
                                    m.id = new $util.LongBits(d.id.low >>> 0, d.id.high >>> 0).toNumber();
                            }
                            if (d.progress != null) {
                                m.progress = d.progress | 0;
                            }
                            if (d.mode != null) {
                                m.mode = d.mode | 0;
                            }
                            if (d.fontsize != null) {
                                m.fontsize = d.fontsize | 0;
                            }
                            if (d.color != null) {
                                m.color = d.color >>> 0;
                            }
                            if (d.midHash != null) {
                                m.midHash = String(d.midHash);
                            }
                            if (d.content != null) {
                                m.content = String(d.content);
                            }
                            if (d.ctime != null) {
                                if ($util.Long)
                                    (m.ctime = $util.Long.fromValue(d.ctime)).unsigned = false;
                                else if (typeof d.ctime === "string")
                                    m.ctime = parseInt(d.ctime, 10);
                                else if (typeof d.ctime === "number")
                                    m.ctime = d.ctime;
                                else if (typeof d.ctime === "object")
                                    m.ctime = new $util.LongBits(d.ctime.low >>> 0, d.ctime.high >>> 0).toNumber();
                            }
                            if (d.weight != null) {
                                m.weight = d.weight | 0;
                            }
                            if (d.action != null) {
                                m.action = String(d.action);
                            }
                            if (d.pool != null) {
                                m.pool = d.pool | 0;
                            }
                            if (d.idStr != null) {
                                m.idStr = String(d.idStr);
                            }
                            if (d.attr != null) {
                                m.attr = d.attr | 0;
                            }
                            if (d.animation != null) {
                                m.animation = String(d.animation);
                            }
                            switch (d.colorful) {
                            default:
                                if (typeof d.colorful === "number") {
                                    m.colorful = d.colorful;
                                    break;
                                }
                                break;
                            case "NoneType":
                            case 0:
                                m.colorful = 0;
                                break;
                            case "VipGradualColor":
                            case 60001:
                                m.colorful = 60001;
                                break;
                            }
                            return m;
                        };

                        DanmakuElem.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.defaults) {
                                if ($util.Long) {
                                    var n = new $util.Long(0, 0, false);
                                    d.id = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                                } else
                                    d.id = o.longs === String ? "0" : 0;
                                d.progress = 0;
                                d.mode = 0;
                                d.fontsize = 0;
                                d.color = 0;
                                d.midHash = "";
                                d.content = "";
                                if ($util.Long) {
                                    var n = new $util.Long(0, 0, false);
                                    d.ctime = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                                } else
                                    d.ctime = o.longs === String ? "0" : 0;
                                d.weight = 0;
                                d.action = "";
                                d.pool = 0;
                                d.idStr = "";
                                d.attr = 0;
                                d.animation = "";
                                d.colorful = o.enums === String ? "NoneType" : 0;
                            }
                            if (m.id != null && m.hasOwnProperty("id")) {
                                if (typeof m.id === "number")
                                    d.id = o.longs === String ? String(m.id) : m.id;
                                else
                                    d.id = o.longs === String ? $util.Long.prototype.toString.call(m.id) : o.longs === Number ? new $util.LongBits(m.id.low >>> 0, m.id.high >>> 0).toNumber() : m.id;
                            }
                            if (m.progress != null && m.hasOwnProperty("progress")) {
                                d.progress = m.progress;
                            }
                            if (m.mode != null && m.hasOwnProperty("mode")) {
                                d.mode = m.mode;
                            }
                            if (m.fontsize != null && m.hasOwnProperty("fontsize")) {
                                d.fontsize = m.fontsize;
                            }
                            if (m.color != null && m.hasOwnProperty("color")) {
                                d.color = m.color;
                            }
                            if (m.midHash != null && m.hasOwnProperty("midHash")) {
                                d.midHash = m.midHash;
                            }
                            if (m.content != null && m.hasOwnProperty("content")) {
                                d.content = m.content;
                            }
                            if (m.ctime != null && m.hasOwnProperty("ctime")) {
                                if (typeof m.ctime === "number")
                                    d.ctime = o.longs === String ? String(m.ctime) : m.ctime;
                                else
                                    d.ctime = o.longs === String ? $util.Long.prototype.toString.call(m.ctime) : o.longs === Number ? new $util.LongBits(m.ctime.low >>> 0, m.ctime.high >>> 0).toNumber() : m.ctime;
                            }
                            if (m.weight != null && m.hasOwnProperty("weight")) {
                                d.weight = m.weight;
                            }
                            if (m.action != null && m.hasOwnProperty("action")) {
                                d.action = m.action;
                            }
                            if (m.pool != null && m.hasOwnProperty("pool")) {
                                d.pool = m.pool;
                            }
                            if (m.idStr != null && m.hasOwnProperty("idStr")) {
                                d.idStr = m.idStr;
                            }
                            if (m.attr != null && m.hasOwnProperty("attr")) {
                                d.attr = m.attr;
                            }
                            if (m.animation != null && m.hasOwnProperty("animation")) {
                                d.animation = m.animation;
                            }
                            if (m.colorful != null && m.hasOwnProperty("colorful")) {
                                d.colorful = o.enums === String ? $root.bilibili.community.service.dm.v1.DmColorfulType[m.colorful] === undefined ? m.colorful : $root.bilibili.community.service.dm.v1.DmColorfulType[m.colorful] : m.colorful;
                            }
                            return d;
                        };

                        DanmakuElem.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        DanmakuElem.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DanmakuElem";
                        };

                        return DanmakuElem;
                    })();

                    v1.DanmakuAIFlag = (function() {

                        function DanmakuAIFlag(p) {
                            this.dmFlags = [];
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        DanmakuAIFlag.prototype.dmFlags = $util.emptyArray;

                        DanmakuAIFlag.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.DanmakuAIFlag();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        if (!(m.dmFlags && m.dmFlags.length))
                                            m.dmFlags = [];
                                        m.dmFlags.push($root.bilibili.community.service.dm.v1.DanmakuFlag.decode(r, r.uint32()));
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        DanmakuAIFlag.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.DanmakuAIFlag)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.DanmakuAIFlag();
                            if (d.dmFlags) {
                                if (!Array.isArray(d.dmFlags))
                                    throw TypeError(".bilibili.community.service.dm.v1.DanmakuAIFlag.dmFlags: array expected");
                                m.dmFlags = [];
                                for (var i = 0; i < d.dmFlags.length; ++i) {
                                    if (typeof d.dmFlags[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.DanmakuAIFlag.dmFlags: object expected");
                                    m.dmFlags[i] = $root.bilibili.community.service.dm.v1.DanmakuFlag.fromObject(d.dmFlags[i]);
                                }
                            }
                            return m;
                        };

                        DanmakuAIFlag.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.arrays || o.defaults) {
                                d.dmFlags = [];
                            }
                            if (m.dmFlags && m.dmFlags.length) {
                                d.dmFlags = [];
                                for (var j = 0; j < m.dmFlags.length; ++j) {
                                    d.dmFlags[j] = $root.bilibili.community.service.dm.v1.DanmakuFlag.toObject(m.dmFlags[j], o);
                                }
                            }
                            return d;
                        };

                        DanmakuAIFlag.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        DanmakuAIFlag.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DanmakuAIFlag";
                        };

                        return DanmakuAIFlag;
                    })();

                    v1.DmColorful = (function() {

                        function DmColorful(p) {
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        DmColorful.prototype.type = 0;
                        DmColorful.prototype.src = "";

                        DmColorful.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.DmColorful();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        m.type = r.int32();
                                        break;
                                    }
                                case 2: {
                                        m.src = r.string();
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        DmColorful.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.DmColorful)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.DmColorful();
                            switch (d.type) {
                            default:
                                if (typeof d.type === "number") {
                                    m.type = d.type;
                                    break;
                                }
                                break;
                            case "NoneType":
                            case 0:
                                m.type = 0;
                                break;
                            case "VipGradualColor":
                            case 60001:
                                m.type = 60001;
                                break;
                            }
                            if (d.src != null) {
                                m.src = String(d.src);
                            }
                            return m;
                        };

                        DmColorful.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.defaults) {
                                d.type = o.enums === String ? "NoneType" : 0;
                                d.src = "";
                            }
                            if (m.type != null && m.hasOwnProperty("type")) {
                                d.type = o.enums === String ? $root.bilibili.community.service.dm.v1.DmColorfulType[m.type] === undefined ? m.type : $root.bilibili.community.service.dm.v1.DmColorfulType[m.type] : m.type;
                            }
                            if (m.src != null && m.hasOwnProperty("src")) {
                                d.src = m.src;
                            }
                            return d;
                        };

                        DmColorful.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        DmColorful.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DmColorful";
                        };

                        return DmColorful;
                    })();

                    v1.DmSegConfig = (function() {

                        function DmSegConfig(p) {
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        DmSegConfig.prototype.pageSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        DmSegConfig.prototype.total = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        DmSegConfig.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.DmSegConfig();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        m.pageSize = r.int64();
                                        break;
                                    }
                                case 2: {
                                        m.total = r.int64();
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        DmSegConfig.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.DmSegConfig)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.DmSegConfig();
                            if (d.pageSize != null) {
                                if ($util.Long)
                                    (m.pageSize = $util.Long.fromValue(d.pageSize)).unsigned = false;
                                else if (typeof d.pageSize === "string")
                                    m.pageSize = parseInt(d.pageSize, 10);
                                else if (typeof d.pageSize === "number")
                                    m.pageSize = d.pageSize;
                                else if (typeof d.pageSize === "object")
                                    m.pageSize = new $util.LongBits(d.pageSize.low >>> 0, d.pageSize.high >>> 0).toNumber();
                            }
                            if (d.total != null) {
                                if ($util.Long)
                                    (m.total = $util.Long.fromValue(d.total)).unsigned = false;
                                else if (typeof d.total === "string")
                                    m.total = parseInt(d.total, 10);
                                else if (typeof d.total === "number")
                                    m.total = d.total;
                                else if (typeof d.total === "object")
                                    m.total = new $util.LongBits(d.total.low >>> 0, d.total.high >>> 0).toNumber();
                            }
                            return m;
                        };

                        DmSegConfig.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.defaults) {
                                if ($util.Long) {
                                    var n = new $util.Long(0, 0, false);
                                    d.pageSize = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                                } else
                                    d.pageSize = o.longs === String ? "0" : 0;
                                if ($util.Long) {
                                    var n = new $util.Long(0, 0, false);
                                    d.total = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                                } else
                                    d.total = o.longs === String ? "0" : 0;
                            }
                            if (m.pageSize != null && m.hasOwnProperty("pageSize")) {
                                if (typeof m.pageSize === "number")
                                    d.pageSize = o.longs === String ? String(m.pageSize) : m.pageSize;
                                else
                                    d.pageSize = o.longs === String ? $util.Long.prototype.toString.call(m.pageSize) : o.longs === Number ? new $util.LongBits(m.pageSize.low >>> 0, m.pageSize.high >>> 0).toNumber() : m.pageSize;
                            }
                            if (m.total != null && m.hasOwnProperty("total")) {
                                if (typeof m.total === "number")
                                    d.total = o.longs === String ? String(m.total) : m.total;
                                else
                                    d.total = o.longs === String ? $util.Long.prototype.toString.call(m.total) : o.longs === Number ? new $util.LongBits(m.total.low >>> 0, m.total.high >>> 0).toNumber() : m.total;
                            }
                            return d;
                        };

                        DmSegConfig.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        DmSegConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DmSegConfig";
                        };

                        return DmSegConfig;
                    })();

                    v1.DanmakuFlagConfig = (function() {

                        function DanmakuFlagConfig(p) {
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        DanmakuFlagConfig.prototype.recFlag = 0;
                        DanmakuFlagConfig.prototype.recText = "";
                        DanmakuFlagConfig.prototype.recSwitch = 0;

                        DanmakuFlagConfig.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.DanmakuFlagConfig();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        m.recFlag = r.int32();
                                        break;
                                    }
                                case 2: {
                                        m.recText = r.string();
                                        break;
                                    }
                                case 3: {
                                        m.recSwitch = r.int32();
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        DanmakuFlagConfig.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.DanmakuFlagConfig)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.DanmakuFlagConfig();
                            if (d.recFlag != null) {
                                m.recFlag = d.recFlag | 0;
                            }
                            if (d.recText != null) {
                                m.recText = String(d.recText);
                            }
                            if (d.recSwitch != null) {
                                m.recSwitch = d.recSwitch | 0;
                            }
                            return m;
                        };

                        DanmakuFlagConfig.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.defaults) {
                                d.recFlag = 0;
                                d.recText = "";
                                d.recSwitch = 0;
                            }
                            if (m.recFlag != null && m.hasOwnProperty("recFlag")) {
                                d.recFlag = m.recFlag;
                            }
                            if (m.recText != null && m.hasOwnProperty("recText")) {
                                d.recText = m.recText;
                            }
                            if (m.recSwitch != null && m.hasOwnProperty("recSwitch")) {
                                d.recSwitch = m.recSwitch;
                            }
                            return d;
                        };

                        DanmakuFlagConfig.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        DanmakuFlagConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DanmakuFlagConfig";
                        };

                        return DanmakuFlagConfig;
                    })();

                    v1.CommandDm = (function() {

                        function CommandDm(p) {
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        CommandDm.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        CommandDm.prototype.oid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        CommandDm.prototype.mid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        CommandDm.prototype.command = "";
                        CommandDm.prototype.content = "";
                        CommandDm.prototype.progress = 0;
                        CommandDm.prototype.ctime = "";
                        CommandDm.prototype.mtime = "";
                        CommandDm.prototype.extra = "";
                        CommandDm.prototype.idStr = "";

                        CommandDm.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.CommandDm();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        m.id = r.int64();
                                        break;
                                    }
                                case 2: {
                                        m.oid = r.int64();
                                        break;
                                    }
                                case 3: {
                                        m.mid = r.int64();
                                        break;
                                    }
                                case 4: {
                                        m.command = r.string();
                                        break;
                                    }
                                case 5: {
                                        m.content = r.string();
                                        break;
                                    }
                                case 6: {
                                        m.progress = r.int32();
                                        break;
                                    }
                                case 7: {
                                        m.ctime = r.string();
                                        break;
                                    }
                                case 8: {
                                        m.mtime = r.string();
                                        break;
                                    }
                                case 9: {
                                        m.extra = r.string();
                                        break;
                                    }
                                case 10: {
                                        m.idStr = r.string();
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        CommandDm.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.CommandDm)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.CommandDm();
                            if (d.id != null) {
                                if ($util.Long)
                                    (m.id = $util.Long.fromValue(d.id)).unsigned = false;
                                else if (typeof d.id === "string")
                                    m.id = parseInt(d.id, 10);
                                else if (typeof d.id === "number")
                                    m.id = d.id;
                                else if (typeof d.id === "object")
                                    m.id = new $util.LongBits(d.id.low >>> 0, d.id.high >>> 0).toNumber();
                            }
                            if (d.oid != null) {
                                if ($util.Long)
                                    (m.oid = $util.Long.fromValue(d.oid)).unsigned = false;
                                else if (typeof d.oid === "string")
                                    m.oid = parseInt(d.oid, 10);
                                else if (typeof d.oid === "number")
                                    m.oid = d.oid;
                                else if (typeof d.oid === "object")
                                    m.oid = new $util.LongBits(d.oid.low >>> 0, d.oid.high >>> 0).toNumber();
                            }
                            if (d.mid != null) {
                                if ($util.Long)
                                    (m.mid = $util.Long.fromValue(d.mid)).unsigned = false;
                                else if (typeof d.mid === "string")
                                    m.mid = parseInt(d.mid, 10);
                                else if (typeof d.mid === "number")
                                    m.mid = d.mid;
                                else if (typeof d.mid === "object")
                                    m.mid = new $util.LongBits(d.mid.low >>> 0, d.mid.high >>> 0).toNumber();
                            }
                            if (d.command != null) {
                                m.command = String(d.command);
                            }
                            if (d.content != null) {
                                m.content = String(d.content);
                            }
                            if (d.progress != null) {
                                m.progress = d.progress | 0;
                            }
                            if (d.ctime != null) {
                                m.ctime = String(d.ctime);
                            }
                            if (d.mtime != null) {
                                m.mtime = String(d.mtime);
                            }
                            if (d.extra != null) {
                                m.extra = String(d.extra);
                            }
                            if (d.idStr != null) {
                                m.idStr = String(d.idStr);
                            }
                            return m;
                        };

                        CommandDm.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.defaults) {
                                if ($util.Long) {
                                    var n = new $util.Long(0, 0, false);
                                    d.id = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                                } else
                                    d.id = o.longs === String ? "0" : 0;
                                if ($util.Long) {
                                    var n = new $util.Long(0, 0, false);
                                    d.oid = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                                } else
                                    d.oid = o.longs === String ? "0" : 0;
                                if ($util.Long) {
                                    var n = new $util.Long(0, 0, false);
                                    d.mid = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                                } else
                                    d.mid = o.longs === String ? "0" : 0;
                                d.command = "";
                                d.content = "";
                                d.progress = 0;
                                d.ctime = "";
                                d.mtime = "";
                                d.extra = "";
                                d.idStr = "";
                            }
                            if (m.id != null && m.hasOwnProperty("id")) {
                                if (typeof m.id === "number")
                                    d.id = o.longs === String ? String(m.id) : m.id;
                                else
                                    d.id = o.longs === String ? $util.Long.prototype.toString.call(m.id) : o.longs === Number ? new $util.LongBits(m.id.low >>> 0, m.id.high >>> 0).toNumber() : m.id;
                            }
                            if (m.oid != null && m.hasOwnProperty("oid")) {
                                if (typeof m.oid === "number")
                                    d.oid = o.longs === String ? String(m.oid) : m.oid;
                                else
                                    d.oid = o.longs === String ? $util.Long.prototype.toString.call(m.oid) : o.longs === Number ? new $util.LongBits(m.oid.low >>> 0, m.oid.high >>> 0).toNumber() : m.oid;
                            }
                            if (m.mid != null && m.hasOwnProperty("mid")) {
                                if (typeof m.mid === "number")
                                    d.mid = o.longs === String ? String(m.mid) : m.mid;
                                else
                                    d.mid = o.longs === String ? $util.Long.prototype.toString.call(m.mid) : o.longs === Number ? new $util.LongBits(m.mid.low >>> 0, m.mid.high >>> 0).toNumber() : m.mid;
                            }
                            if (m.command != null && m.hasOwnProperty("command")) {
                                d.command = m.command;
                            }
                            if (m.content != null && m.hasOwnProperty("content")) {
                                d.content = m.content;
                            }
                            if (m.progress != null && m.hasOwnProperty("progress")) {
                                d.progress = m.progress;
                            }
                            if (m.ctime != null && m.hasOwnProperty("ctime")) {
                                d.ctime = m.ctime;
                            }
                            if (m.mtime != null && m.hasOwnProperty("mtime")) {
                                d.mtime = m.mtime;
                            }
                            if (m.extra != null && m.hasOwnProperty("extra")) {
                                d.extra = m.extra;
                            }
                            if (m.idStr != null && m.hasOwnProperty("idStr")) {
                                d.idStr = m.idStr;
                            }
                            return d;
                        };

                        CommandDm.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        CommandDm.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.CommandDm";
                        };

                        return CommandDm;
                    })();

                    v1.DanmuWebPlayerConfig = (function() {

                        function DanmuWebPlayerConfig(p) {
                            this.aiLevelV2Map = {};
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        DanmuWebPlayerConfig.prototype.dmSwitch = false;
                        DanmuWebPlayerConfig.prototype.aiSwitch = false;
                        DanmuWebPlayerConfig.prototype.aiLevel = 0;
                        DanmuWebPlayerConfig.prototype.blocktop = false;
                        DanmuWebPlayerConfig.prototype.blockscroll = false;
                        DanmuWebPlayerConfig.prototype.blockbottom = false;
                        DanmuWebPlayerConfig.prototype.blockcolor = false;
                        DanmuWebPlayerConfig.prototype.blockspecial = false;
                        DanmuWebPlayerConfig.prototype.preventshade = false;
                        DanmuWebPlayerConfig.prototype.dmask = false;
                        DanmuWebPlayerConfig.prototype.opacity = 0;
                        DanmuWebPlayerConfig.prototype.dmarea = 0;
                        DanmuWebPlayerConfig.prototype.speedplus = 0;
                        DanmuWebPlayerConfig.prototype.fontsize = 0;
                        DanmuWebPlayerConfig.prototype.screensync = false;
                        DanmuWebPlayerConfig.prototype.speedsync = false;
                        DanmuWebPlayerConfig.prototype.fontfamily = "";
                        DanmuWebPlayerConfig.prototype.bold = false;
                        DanmuWebPlayerConfig.prototype.fontborder = 0;
                        DanmuWebPlayerConfig.prototype.drawType = "";
                        DanmuWebPlayerConfig.prototype.seniorModeSwitch = 0;
                        DanmuWebPlayerConfig.prototype.aiLevelV2 = 0;
                        DanmuWebPlayerConfig.prototype.aiLevelV2Map = $util.emptyObject;

                        DanmuWebPlayerConfig.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig(), k, value;
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        m.dmSwitch = r.bool();
                                        break;
                                    }
                                case 2: {
                                        m.aiSwitch = r.bool();
                                        break;
                                    }
                                case 3: {
                                        m.aiLevel = r.int32();
                                        break;
                                    }
                                case 4: {
                                        m.blocktop = r.bool();
                                        break;
                                    }
                                case 5: {
                                        m.blockscroll = r.bool();
                                        break;
                                    }
                                case 6: {
                                        m.blockbottom = r.bool();
                                        break;
                                    }
                                case 7: {
                                        m.blockcolor = r.bool();
                                        break;
                                    }
                                case 8: {
                                        m.blockspecial = r.bool();
                                        break;
                                    }
                                case 9: {
                                        m.preventshade = r.bool();
                                        break;
                                    }
                                case 10: {
                                        m.dmask = r.bool();
                                        break;
                                    }
                                case 11: {
                                        m.opacity = r.float();
                                        break;
                                    }
                                case 12: {
                                        m.dmarea = r.int32();
                                        break;
                                    }
                                case 13: {
                                        m.speedplus = r.float();
                                        break;
                                    }
                                case 14: {
                                        m.fontsize = r.float();
                                        break;
                                    }
                                case 15: {
                                        m.screensync = r.bool();
                                        break;
                                    }
                                case 16: {
                                        m.speedsync = r.bool();
                                        break;
                                    }
                                case 17: {
                                        m.fontfamily = r.string();
                                        break;
                                    }
                                case 18: {
                                        m.bold = r.bool();
                                        break;
                                    }
                                case 19: {
                                        m.fontborder = r.int32();
                                        break;
                                    }
                                case 20: {
                                        m.drawType = r.string();
                                        break;
                                    }
                                case 21: {
                                        m.seniorModeSwitch = r.int32();
                                        break;
                                    }
                                case 22: {
                                        m.aiLevelV2 = r.int32();
                                        break;
                                    }
                                case 23: {
                                        if (m.aiLevelV2Map === $util.emptyObject)
                                            m.aiLevelV2Map = {};
                                        var c2 = r.uint32() + r.pos;
                                        k = 0;
                                        value = 0;
                                        while (r.pos < c2) {
                                            var tag2 = r.uint32();
                                            switch (tag2 >>> 3) {
                                            case 1:
                                                k = r.int32();
                                                break;
                                            case 2:
                                                value = r.int32();
                                                break;
                                            default:
                                                r.skipType(tag2 & 7);
                                                break;
                                            }
                                        }
                                        m.aiLevelV2Map[k] = value;
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        DanmuWebPlayerConfig.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig();
                            if (d.dmSwitch != null) {
                                m.dmSwitch = Boolean(d.dmSwitch);
                            }
                            if (d.aiSwitch != null) {
                                m.aiSwitch = Boolean(d.aiSwitch);
                            }
                            if (d.aiLevel != null) {
                                m.aiLevel = d.aiLevel | 0;
                            }
                            if (d.blocktop != null) {
                                m.blocktop = Boolean(d.blocktop);
                            }
                            if (d.blockscroll != null) {
                                m.blockscroll = Boolean(d.blockscroll);
                            }
                            if (d.blockbottom != null) {
                                m.blockbottom = Boolean(d.blockbottom);
                            }
                            if (d.blockcolor != null) {
                                m.blockcolor = Boolean(d.blockcolor);
                            }
                            if (d.blockspecial != null) {
                                m.blockspecial = Boolean(d.blockspecial);
                            }
                            if (d.preventshade != null) {
                                m.preventshade = Boolean(d.preventshade);
                            }
                            if (d.dmask != null) {
                                m.dmask = Boolean(d.dmask);
                            }
                            if (d.opacity != null) {
                                m.opacity = Number(d.opacity);
                            }
                            if (d.dmarea != null) {
                                m.dmarea = d.dmarea | 0;
                            }
                            if (d.speedplus != null) {
                                m.speedplus = Number(d.speedplus);
                            }
                            if (d.fontsize != null) {
                                m.fontsize = Number(d.fontsize);
                            }
                            if (d.screensync != null) {
                                m.screensync = Boolean(d.screensync);
                            }
                            if (d.speedsync != null) {
                                m.speedsync = Boolean(d.speedsync);
                            }
                            if (d.fontfamily != null) {
                                m.fontfamily = String(d.fontfamily);
                            }
                            if (d.bold != null) {
                                m.bold = Boolean(d.bold);
                            }
                            if (d.fontborder != null) {
                                m.fontborder = d.fontborder | 0;
                            }
                            if (d.drawType != null) {
                                m.drawType = String(d.drawType);
                            }
                            if (d.seniorModeSwitch != null) {
                                m.seniorModeSwitch = d.seniorModeSwitch | 0;
                            }
                            if (d.aiLevelV2 != null) {
                                m.aiLevelV2 = d.aiLevelV2 | 0;
                            }
                            if (d.aiLevelV2Map) {
                                if (typeof d.aiLevelV2Map !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.DanmuWebPlayerConfig.aiLevelV2Map: object expected");
                                m.aiLevelV2Map = {};
                                for (var ks = Object.keys(d.aiLevelV2Map), i = 0; i < ks.length; ++i) {
                                    m.aiLevelV2Map[ks[i]] = d.aiLevelV2Map[ks[i]] | 0;
                                }
                            }
                            return m;
                        };

                        DanmuWebPlayerConfig.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.objects || o.defaults) {
                                d.aiLevelV2Map = {};
                            }
                            if (o.defaults) {
                                d.dmSwitch = false;
                                d.aiSwitch = false;
                                d.aiLevel = 0;
                                d.blocktop = false;
                                d.blockscroll = false;
                                d.blockbottom = false;
                                d.blockcolor = false;
                                d.blockspecial = false;
                                d.preventshade = false;
                                d.dmask = false;
                                d.opacity = 0;
                                d.dmarea = 0;
                                d.speedplus = 0;
                                d.fontsize = 0;
                                d.screensync = false;
                                d.speedsync = false;
                                d.fontfamily = "";
                                d.bold = false;
                                d.fontborder = 0;
                                d.drawType = "";
                                d.seniorModeSwitch = 0;
                                d.aiLevelV2 = 0;
                            }
                            if (m.dmSwitch != null && m.hasOwnProperty("dmSwitch")) {
                                d.dmSwitch = m.dmSwitch;
                            }
                            if (m.aiSwitch != null && m.hasOwnProperty("aiSwitch")) {
                                d.aiSwitch = m.aiSwitch;
                            }
                            if (m.aiLevel != null && m.hasOwnProperty("aiLevel")) {
                                d.aiLevel = m.aiLevel;
                            }
                            if (m.blocktop != null && m.hasOwnProperty("blocktop")) {
                                d.blocktop = m.blocktop;
                            }
                            if (m.blockscroll != null && m.hasOwnProperty("blockscroll")) {
                                d.blockscroll = m.blockscroll;
                            }
                            if (m.blockbottom != null && m.hasOwnProperty("blockbottom")) {
                                d.blockbottom = m.blockbottom;
                            }
                            if (m.blockcolor != null && m.hasOwnProperty("blockcolor")) {
                                d.blockcolor = m.blockcolor;
                            }
                            if (m.blockspecial != null && m.hasOwnProperty("blockspecial")) {
                                d.blockspecial = m.blockspecial;
                            }
                            if (m.preventshade != null && m.hasOwnProperty("preventshade")) {
                                d.preventshade = m.preventshade;
                            }
                            if (m.dmask != null && m.hasOwnProperty("dmask")) {
                                d.dmask = m.dmask;
                            }
                            if (m.opacity != null && m.hasOwnProperty("opacity")) {
                                d.opacity = o.json && !isFinite(m.opacity) ? String(m.opacity) : m.opacity;
                            }
                            if (m.dmarea != null && m.hasOwnProperty("dmarea")) {
                                d.dmarea = m.dmarea;
                            }
                            if (m.speedplus != null && m.hasOwnProperty("speedplus")) {
                                d.speedplus = o.json && !isFinite(m.speedplus) ? String(m.speedplus) : m.speedplus;
                            }
                            if (m.fontsize != null && m.hasOwnProperty("fontsize")) {
                                d.fontsize = o.json && !isFinite(m.fontsize) ? String(m.fontsize) : m.fontsize;
                            }
                            if (m.screensync != null && m.hasOwnProperty("screensync")) {
                                d.screensync = m.screensync;
                            }
                            if (m.speedsync != null && m.hasOwnProperty("speedsync")) {
                                d.speedsync = m.speedsync;
                            }
                            if (m.fontfamily != null && m.hasOwnProperty("fontfamily")) {
                                d.fontfamily = m.fontfamily;
                            }
                            if (m.bold != null && m.hasOwnProperty("bold")) {
                                d.bold = m.bold;
                            }
                            if (m.fontborder != null && m.hasOwnProperty("fontborder")) {
                                d.fontborder = m.fontborder;
                            }
                            if (m.drawType != null && m.hasOwnProperty("drawType")) {
                                d.drawType = m.drawType;
                            }
                            if (m.seniorModeSwitch != null && m.hasOwnProperty("seniorModeSwitch")) {
                                d.seniorModeSwitch = m.seniorModeSwitch;
                            }
                            if (m.aiLevelV2 != null && m.hasOwnProperty("aiLevelV2")) {
                                d.aiLevelV2 = m.aiLevelV2;
                            }
                            var ks2;
                            if (m.aiLevelV2Map && (ks2 = Object.keys(m.aiLevelV2Map)).length) {
                                d.aiLevelV2Map = {};
                                for (var j = 0; j < ks2.length; ++j) {
                                    d.aiLevelV2Map[ks2[j]] = m.aiLevelV2Map[ks2[j]];
                                }
                            }
                            return d;
                        };

                        DanmuWebPlayerConfig.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        DanmuWebPlayerConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DanmuWebPlayerConfig";
                        };

                        return DanmuWebPlayerConfig;
                    })();

                    v1.Expressions = (function() {

                        function Expressions(p) {
                            this.data = [];
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        Expressions.prototype.data = $util.emptyArray;

                        Expressions.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.Expressions();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        if (!(m.data && m.data.length))
                                            m.data = [];
                                        m.data.push($root.bilibili.community.service.dm.v1.Expression.decode(r, r.uint32()));
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        Expressions.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.Expressions)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.Expressions();
                            if (d.data) {
                                if (!Array.isArray(d.data))
                                    throw TypeError(".bilibili.community.service.dm.v1.Expressions.data: array expected");
                                m.data = [];
                                for (var i = 0; i < d.data.length; ++i) {
                                    if (typeof d.data[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.Expressions.data: object expected");
                                    m.data[i] = $root.bilibili.community.service.dm.v1.Expression.fromObject(d.data[i]);
                                }
                            }
                            return m;
                        };

                        Expressions.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.arrays || o.defaults) {
                                d.data = [];
                            }
                            if (m.data && m.data.length) {
                                d.data = [];
                                for (var j = 0; j < m.data.length; ++j) {
                                    d.data[j] = $root.bilibili.community.service.dm.v1.Expression.toObject(m.data[j], o);
                                }
                            }
                            return d;
                        };

                        Expressions.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        Expressions.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Expressions";
                        };

                        return Expressions;
                    })();

                    v1.PostPanel = (function() {

                        function PostPanel(p) {
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        PostPanel.prototype.start = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        PostPanel.prototype.end = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        PostPanel.prototype.priority = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        PostPanel.prototype.bizId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        PostPanel.prototype.bizType = 0;
                        PostPanel.prototype.clickButton = null;
                        PostPanel.prototype.textInput = null;
                        PostPanel.prototype.checkBox = null;
                        PostPanel.prototype.toast = null;

                        PostPanel.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.PostPanel();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        m.start = r.int64();
                                        break;
                                    }
                                case 2: {
                                        m.end = r.int64();
                                        break;
                                    }
                                case 3: {
                                        m.priority = r.int64();
                                        break;
                                    }
                                case 4: {
                                        m.bizId = r.int64();
                                        break;
                                    }
                                case 5: {
                                        m.bizType = r.int32();
                                        break;
                                    }
                                case 6: {
                                        m.clickButton = $root.bilibili.community.service.dm.v1.ClickButton.decode(r, r.uint32());
                                        break;
                                    }
                                case 7: {
                                        m.textInput = $root.bilibili.community.service.dm.v1.TextInput.decode(r, r.uint32());
                                        break;
                                    }
                                case 8: {
                                        m.checkBox = $root.bilibili.community.service.dm.v1.CheckBox.decode(r, r.uint32());
                                        break;
                                    }
                                case 9: {
                                        m.toast = $root.bilibili.community.service.dm.v1.Toast.decode(r, r.uint32());
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        PostPanel.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.PostPanel)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.PostPanel();
                            if (d.start != null) {
                                if ($util.Long)
                                    (m.start = $util.Long.fromValue(d.start)).unsigned = false;
                                else if (typeof d.start === "string")
                                    m.start = parseInt(d.start, 10);
                                else if (typeof d.start === "number")
                                    m.start = d.start;
                                else if (typeof d.start === "object")
                                    m.start = new $util.LongBits(d.start.low >>> 0, d.start.high >>> 0).toNumber();
                            }
                            if (d.end != null) {
                                if ($util.Long)
                                    (m.end = $util.Long.fromValue(d.end)).unsigned = false;
                                else if (typeof d.end === "string")
                                    m.end = parseInt(d.end, 10);
                                else if (typeof d.end === "number")
                                    m.end = d.end;
                                else if (typeof d.end === "object")
                                    m.end = new $util.LongBits(d.end.low >>> 0, d.end.high >>> 0).toNumber();
                            }
                            if (d.priority != null) {
                                if ($util.Long)
                                    (m.priority = $util.Long.fromValue(d.priority)).unsigned = false;
                                else if (typeof d.priority === "string")
                                    m.priority = parseInt(d.priority, 10);
                                else if (typeof d.priority === "number")
                                    m.priority = d.priority;
                                else if (typeof d.priority === "object")
                                    m.priority = new $util.LongBits(d.priority.low >>> 0, d.priority.high >>> 0).toNumber();
                            }
                            if (d.bizId != null) {
                                if ($util.Long)
                                    (m.bizId = $util.Long.fromValue(d.bizId)).unsigned = false;
                                else if (typeof d.bizId === "string")
                                    m.bizId = parseInt(d.bizId, 10);
                                else if (typeof d.bizId === "number")
                                    m.bizId = d.bizId;
                                else if (typeof d.bizId === "object")
                                    m.bizId = new $util.LongBits(d.bizId.low >>> 0, d.bizId.high >>> 0).toNumber();
                            }
                            switch (d.bizType) {
                            default:
                                if (typeof d.bizType === "number") {
                                    m.bizType = d.bizType;
                                    break;
                                }
                                break;
                            case "PostPanelBizTypeNone":
                            case 0:
                                m.bizType = 0;
                                break;
                            case "PostPanelBizTypeEncourage":
                            case 1:
                                m.bizType = 1;
                                break;
                            case "PostPanelBizTypeColorDM":
                            case 2:
                                m.bizType = 2;
                                break;
                            case "PostPanelBizTypeNFTDM":
                            case 3:
                                m.bizType = 3;
                                break;
                            case "PostPanelBizTypeFragClose":
                            case 4:
                                m.bizType = 4;
                                break;
                            case "PostPanelBizTypeRecommend":
                            case 5:
                                m.bizType = 5;
                                break;
                            }
                            if (d.clickButton != null) {
                                if (typeof d.clickButton !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.PostPanel.clickButton: object expected");
                                m.clickButton = $root.bilibili.community.service.dm.v1.ClickButton.fromObject(d.clickButton);
                            }
                            if (d.textInput != null) {
                                if (typeof d.textInput !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.PostPanel.textInput: object expected");
                                m.textInput = $root.bilibili.community.service.dm.v1.TextInput.fromObject(d.textInput);
                            }
                            if (d.checkBox != null) {
                                if (typeof d.checkBox !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.PostPanel.checkBox: object expected");
                                m.checkBox = $root.bilibili.community.service.dm.v1.CheckBox.fromObject(d.checkBox);
                            }
                            if (d.toast != null) {
                                if (typeof d.toast !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.PostPanel.toast: object expected");
                                m.toast = $root.bilibili.community.service.dm.v1.Toast.fromObject(d.toast);
                            }
                            return m;
                        };

                        PostPanel.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.defaults) {
                                if ($util.Long) {
                                    var n = new $util.Long(0, 0, false);
                                    d.start = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                                } else
                                    d.start = o.longs === String ? "0" : 0;
                                if ($util.Long) {
                                    var n = new $util.Long(0, 0, false);
                                    d.end = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                                } else
                                    d.end = o.longs === String ? "0" : 0;
                                if ($util.Long) {
                                    var n = new $util.Long(0, 0, false);
                                    d.priority = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                                } else
                                    d.priority = o.longs === String ? "0" : 0;
                                if ($util.Long) {
                                    var n = new $util.Long(0, 0, false);
                                    d.bizId = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                                } else
                                    d.bizId = o.longs === String ? "0" : 0;
                                d.bizType = o.enums === String ? "PostPanelBizTypeNone" : 0;
                                d.clickButton = null;
                                d.textInput = null;
                                d.checkBox = null;
                                d.toast = null;
                            }
                            if (m.start != null && m.hasOwnProperty("start")) {
                                if (typeof m.start === "number")
                                    d.start = o.longs === String ? String(m.start) : m.start;
                                else
                                    d.start = o.longs === String ? $util.Long.prototype.toString.call(m.start) : o.longs === Number ? new $util.LongBits(m.start.low >>> 0, m.start.high >>> 0).toNumber() : m.start;
                            }
                            if (m.end != null && m.hasOwnProperty("end")) {
                                if (typeof m.end === "number")
                                    d.end = o.longs === String ? String(m.end) : m.end;
                                else
                                    d.end = o.longs === String ? $util.Long.prototype.toString.call(m.end) : o.longs === Number ? new $util.LongBits(m.end.low >>> 0, m.end.high >>> 0).toNumber() : m.end;
                            }
                            if (m.priority != null && m.hasOwnProperty("priority")) {
                                if (typeof m.priority === "number")
                                    d.priority = o.longs === String ? String(m.priority) : m.priority;
                                else
                                    d.priority = o.longs === String ? $util.Long.prototype.toString.call(m.priority) : o.longs === Number ? new $util.LongBits(m.priority.low >>> 0, m.priority.high >>> 0).toNumber() : m.priority;
                            }
                            if (m.bizId != null && m.hasOwnProperty("bizId")) {
                                if (typeof m.bizId === "number")
                                    d.bizId = o.longs === String ? String(m.bizId) : m.bizId;
                                else
                                    d.bizId = o.longs === String ? $util.Long.prototype.toString.call(m.bizId) : o.longs === Number ? new $util.LongBits(m.bizId.low >>> 0, m.bizId.high >>> 0).toNumber() : m.bizId;
                            }
                            if (m.bizType != null && m.hasOwnProperty("bizType")) {
                                d.bizType = o.enums === String ? $root.bilibili.community.service.dm.v1.PostPanelBizType[m.bizType] === undefined ? m.bizType : $root.bilibili.community.service.dm.v1.PostPanelBizType[m.bizType] : m.bizType;
                            }
                            if (m.clickButton != null && m.hasOwnProperty("clickButton")) {
                                d.clickButton = $root.bilibili.community.service.dm.v1.ClickButton.toObject(m.clickButton, o);
                            }
                            if (m.textInput != null && m.hasOwnProperty("textInput")) {
                                d.textInput = $root.bilibili.community.service.dm.v1.TextInput.toObject(m.textInput, o);
                            }
                            if (m.checkBox != null && m.hasOwnProperty("checkBox")) {
                                d.checkBox = $root.bilibili.community.service.dm.v1.CheckBox.toObject(m.checkBox, o);
                            }
                            if (m.toast != null && m.hasOwnProperty("toast")) {
                                d.toast = $root.bilibili.community.service.dm.v1.Toast.toObject(m.toast, o);
                            }
                            return d;
                        };

                        PostPanel.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        PostPanel.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.PostPanel";
                        };

                        return PostPanel;
                    })();

                    v1.DmColorfulType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "NoneType"] = 0;
                        values[valuesById[60001] = "VipGradualColor"] = 60001;
                        return values;
                    })();

                    v1.DanmakuFlag = (function() {

                        function DanmakuFlag(p) {
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        DanmakuFlag.prototype.dmid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        DanmakuFlag.prototype.flag = 0;

                        DanmakuFlag.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.DanmakuFlag();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        m.dmid = r.int64();
                                        break;
                                    }
                                case 2: {
                                        m.flag = r.uint32();
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        DanmakuFlag.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.DanmakuFlag)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.DanmakuFlag();
                            if (d.dmid != null) {
                                if ($util.Long)
                                    (m.dmid = $util.Long.fromValue(d.dmid)).unsigned = false;
                                else if (typeof d.dmid === "string")
                                    m.dmid = parseInt(d.dmid, 10);
                                else if (typeof d.dmid === "number")
                                    m.dmid = d.dmid;
                                else if (typeof d.dmid === "object")
                                    m.dmid = new $util.LongBits(d.dmid.low >>> 0, d.dmid.high >>> 0).toNumber();
                            }
                            if (d.flag != null) {
                                m.flag = d.flag >>> 0;
                            }
                            return m;
                        };

                        DanmakuFlag.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.defaults) {
                                if ($util.Long) {
                                    var n = new $util.Long(0, 0, false);
                                    d.dmid = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                                } else
                                    d.dmid = o.longs === String ? "0" : 0;
                                d.flag = 0;
                            }
                            if (m.dmid != null && m.hasOwnProperty("dmid")) {
                                if (typeof m.dmid === "number")
                                    d.dmid = o.longs === String ? String(m.dmid) : m.dmid;
                                else
                                    d.dmid = o.longs === String ? $util.Long.prototype.toString.call(m.dmid) : o.longs === Number ? new $util.LongBits(m.dmid.low >>> 0, m.dmid.high >>> 0).toNumber() : m.dmid;
                            }
                            if (m.flag != null && m.hasOwnProperty("flag")) {
                                d.flag = m.flag;
                            }
                            return d;
                        };

                        DanmakuFlag.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        DanmakuFlag.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DanmakuFlag";
                        };

                        return DanmakuFlag;
                    })();

                    v1.Expression = (function() {

                        function Expression(p) {
                            this.keyword = [];
                            this.period = [];
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        Expression.prototype.keyword = $util.emptyArray;
                        Expression.prototype.url = "";
                        Expression.prototype.period = $util.emptyArray;

                        Expression.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.Expression();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        if (!(m.keyword && m.keyword.length))
                                            m.keyword = [];
                                        m.keyword.push(r.string());
                                        break;
                                    }
                                case 2: {
                                        m.url = r.string();
                                        break;
                                    }
                                case 3: {
                                        if (!(m.period && m.period.length))
                                            m.period = [];
                                        m.period.push($root.bilibili.community.service.dm.v1.Period.decode(r, r.uint32()));
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        Expression.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.Expression)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.Expression();
                            if (d.keyword) {
                                if (!Array.isArray(d.keyword))
                                    throw TypeError(".bilibili.community.service.dm.v1.Expression.keyword: array expected");
                                m.keyword = [];
                                for (var i = 0; i < d.keyword.length; ++i) {
                                    m.keyword[i] = String(d.keyword[i]);
                                }
                            }
                            if (d.url != null) {
                                m.url = String(d.url);
                            }
                            if (d.period) {
                                if (!Array.isArray(d.period))
                                    throw TypeError(".bilibili.community.service.dm.v1.Expression.period: array expected");
                                m.period = [];
                                for (var i = 0; i < d.period.length; ++i) {
                                    if (typeof d.period[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.Expression.period: object expected");
                                    m.period[i] = $root.bilibili.community.service.dm.v1.Period.fromObject(d.period[i]);
                                }
                            }
                            return m;
                        };

                        Expression.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.arrays || o.defaults) {
                                d.keyword = [];
                                d.period = [];
                            }
                            if (o.defaults) {
                                d.url = "";
                            }
                            if (m.keyword && m.keyword.length) {
                                d.keyword = [];
                                for (var j = 0; j < m.keyword.length; ++j) {
                                    d.keyword[j] = m.keyword[j];
                                }
                            }
                            if (m.url != null && m.hasOwnProperty("url")) {
                                d.url = m.url;
                            }
                            if (m.period && m.period.length) {
                                d.period = [];
                                for (var j = 0; j < m.period.length; ++j) {
                                    d.period[j] = $root.bilibili.community.service.dm.v1.Period.toObject(m.period[j], o);
                                }
                            }
                            return d;
                        };

                        Expression.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        Expression.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Expression";
                        };

                        return Expression;
                    })();

                    v1.PostPanelBizType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "PostPanelBizTypeNone"] = 0;
                        values[valuesById[1] = "PostPanelBizTypeEncourage"] = 1;
                        values[valuesById[2] = "PostPanelBizTypeColorDM"] = 2;
                        values[valuesById[3] = "PostPanelBizTypeNFTDM"] = 3;
                        values[valuesById[4] = "PostPanelBizTypeFragClose"] = 4;
                        values[valuesById[5] = "PostPanelBizTypeRecommend"] = 5;
                        return values;
                    })();

                    v1.ClickButton = (function() {

                        function ClickButton(p) {
                            this.portraitText = [];
                            this.landscapeText = [];
                            this.portraitTextFocus = [];
                            this.landscapeTextFocus = [];
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        ClickButton.prototype.portraitText = $util.emptyArray;
                        ClickButton.prototype.landscapeText = $util.emptyArray;
                        ClickButton.prototype.portraitTextFocus = $util.emptyArray;
                        ClickButton.prototype.landscapeTextFocus = $util.emptyArray;
                        ClickButton.prototype.renderType = 0;
                        ClickButton.prototype.show = false;
                        ClickButton.prototype.bubble = null;

                        ClickButton.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.ClickButton();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        if (!(m.portraitText && m.portraitText.length))
                                            m.portraitText = [];
                                        m.portraitText.push(r.string());
                                        break;
                                    }
                                case 2: {
                                        if (!(m.landscapeText && m.landscapeText.length))
                                            m.landscapeText = [];
                                        m.landscapeText.push(r.string());
                                        break;
                                    }
                                case 3: {
                                        if (!(m.portraitTextFocus && m.portraitTextFocus.length))
                                            m.portraitTextFocus = [];
                                        m.portraitTextFocus.push(r.string());
                                        break;
                                    }
                                case 4: {
                                        if (!(m.landscapeTextFocus && m.landscapeTextFocus.length))
                                            m.landscapeTextFocus = [];
                                        m.landscapeTextFocus.push(r.string());
                                        break;
                                    }
                                case 5: {
                                        m.renderType = r.int32();
                                        break;
                                    }
                                case 6: {
                                        m.show = r.bool();
                                        break;
                                    }
                                case 7: {
                                        m.bubble = $root.bilibili.community.service.dm.v1.Bubble.decode(r, r.uint32());
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        ClickButton.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.ClickButton)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.ClickButton();
                            if (d.portraitText) {
                                if (!Array.isArray(d.portraitText))
                                    throw TypeError(".bilibili.community.service.dm.v1.ClickButton.portraitText: array expected");
                                m.portraitText = [];
                                for (var i = 0; i < d.portraitText.length; ++i) {
                                    m.portraitText[i] = String(d.portraitText[i]);
                                }
                            }
                            if (d.landscapeText) {
                                if (!Array.isArray(d.landscapeText))
                                    throw TypeError(".bilibili.community.service.dm.v1.ClickButton.landscapeText: array expected");
                                m.landscapeText = [];
                                for (var i = 0; i < d.landscapeText.length; ++i) {
                                    m.landscapeText[i] = String(d.landscapeText[i]);
                                }
                            }
                            if (d.portraitTextFocus) {
                                if (!Array.isArray(d.portraitTextFocus))
                                    throw TypeError(".bilibili.community.service.dm.v1.ClickButton.portraitTextFocus: array expected");
                                m.portraitTextFocus = [];
                                for (var i = 0; i < d.portraitTextFocus.length; ++i) {
                                    m.portraitTextFocus[i] = String(d.portraitTextFocus[i]);
                                }
                            }
                            if (d.landscapeTextFocus) {
                                if (!Array.isArray(d.landscapeTextFocus))
                                    throw TypeError(".bilibili.community.service.dm.v1.ClickButton.landscapeTextFocus: array expected");
                                m.landscapeTextFocus = [];
                                for (var i = 0; i < d.landscapeTextFocus.length; ++i) {
                                    m.landscapeTextFocus[i] = String(d.landscapeTextFocus[i]);
                                }
                            }
                            switch (d.renderType) {
                            default:
                                if (typeof d.renderType === "number") {
                                    m.renderType = d.renderType;
                                    break;
                                }
                                break;
                            case "RenderTypeNone":
                            case 0:
                                m.renderType = 0;
                                break;
                            case "RenderTypeSingle":
                            case 1:
                                m.renderType = 1;
                                break;
                            case "RenderTypeRotation":
                            case 2:
                                m.renderType = 2;
                                break;
                            }
                            if (d.show != null) {
                                m.show = Boolean(d.show);
                            }
                            if (d.bubble != null) {
                                if (typeof d.bubble !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.ClickButton.bubble: object expected");
                                m.bubble = $root.bilibili.community.service.dm.v1.Bubble.fromObject(d.bubble);
                            }
                            return m;
                        };

                        ClickButton.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.arrays || o.defaults) {
                                d.portraitText = [];
                                d.landscapeText = [];
                                d.portraitTextFocus = [];
                                d.landscapeTextFocus = [];
                            }
                            if (o.defaults) {
                                d.renderType = o.enums === String ? "RenderTypeNone" : 0;
                                d.show = false;
                                d.bubble = null;
                            }
                            if (m.portraitText && m.portraitText.length) {
                                d.portraitText = [];
                                for (var j = 0; j < m.portraitText.length; ++j) {
                                    d.portraitText[j] = m.portraitText[j];
                                }
                            }
                            if (m.landscapeText && m.landscapeText.length) {
                                d.landscapeText = [];
                                for (var j = 0; j < m.landscapeText.length; ++j) {
                                    d.landscapeText[j] = m.landscapeText[j];
                                }
                            }
                            if (m.portraitTextFocus && m.portraitTextFocus.length) {
                                d.portraitTextFocus = [];
                                for (var j = 0; j < m.portraitTextFocus.length; ++j) {
                                    d.portraitTextFocus[j] = m.portraitTextFocus[j];
                                }
                            }
                            if (m.landscapeTextFocus && m.landscapeTextFocus.length) {
                                d.landscapeTextFocus = [];
                                for (var j = 0; j < m.landscapeTextFocus.length; ++j) {
                                    d.landscapeTextFocus[j] = m.landscapeTextFocus[j];
                                }
                            }
                            if (m.renderType != null && m.hasOwnProperty("renderType")) {
                                d.renderType = o.enums === String ? $root.bilibili.community.service.dm.v1.RenderType[m.renderType] === undefined ? m.renderType : $root.bilibili.community.service.dm.v1.RenderType[m.renderType] : m.renderType;
                            }
                            if (m.show != null && m.hasOwnProperty("show")) {
                                d.show = m.show;
                            }
                            if (m.bubble != null && m.hasOwnProperty("bubble")) {
                                d.bubble = $root.bilibili.community.service.dm.v1.Bubble.toObject(m.bubble, o);
                            }
                            return d;
                        };

                        ClickButton.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        ClickButton.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.ClickButton";
                        };

                        return ClickButton;
                    })();

                    v1.TextInput = (function() {

                        function TextInput(p) {
                            this.portraitPlaceholder = [];
                            this.landscapePlaceholder = [];
                            this.avatar = [];
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        TextInput.prototype.portraitPlaceholder = $util.emptyArray;
                        TextInput.prototype.landscapePlaceholder = $util.emptyArray;
                        TextInput.prototype.renderType = 0;
                        TextInput.prototype.placeholderPost = false;
                        TextInput.prototype.show = false;
                        TextInput.prototype.avatar = $util.emptyArray;
                        TextInput.prototype.postStatus = 0;
                        TextInput.prototype.label = null;

                        TextInput.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.TextInput();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        if (!(m.portraitPlaceholder && m.portraitPlaceholder.length))
                                            m.portraitPlaceholder = [];
                                        m.portraitPlaceholder.push(r.string());
                                        break;
                                    }
                                case 2: {
                                        if (!(m.landscapePlaceholder && m.landscapePlaceholder.length))
                                            m.landscapePlaceholder = [];
                                        m.landscapePlaceholder.push(r.string());
                                        break;
                                    }
                                case 3: {
                                        m.renderType = r.int32();
                                        break;
                                    }
                                case 4: {
                                        m.placeholderPost = r.bool();
                                        break;
                                    }
                                case 5: {
                                        m.show = r.bool();
                                        break;
                                    }
                                case 6: {
                                        if (!(m.avatar && m.avatar.length))
                                            m.avatar = [];
                                        m.avatar.push($root.bilibili.community.service.dm.v1.Avatar.decode(r, r.uint32()));
                                        break;
                                    }
                                case 7: {
                                        m.postStatus = r.int32();
                                        break;
                                    }
                                case 8: {
                                        m.label = $root.bilibili.community.service.dm.v1.Label.decode(r, r.uint32());
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        TextInput.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.TextInput)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.TextInput();
                            if (d.portraitPlaceholder) {
                                if (!Array.isArray(d.portraitPlaceholder))
                                    throw TypeError(".bilibili.community.service.dm.v1.TextInput.portraitPlaceholder: array expected");
                                m.portraitPlaceholder = [];
                                for (var i = 0; i < d.portraitPlaceholder.length; ++i) {
                                    m.portraitPlaceholder[i] = String(d.portraitPlaceholder[i]);
                                }
                            }
                            if (d.landscapePlaceholder) {
                                if (!Array.isArray(d.landscapePlaceholder))
                                    throw TypeError(".bilibili.community.service.dm.v1.TextInput.landscapePlaceholder: array expected");
                                m.landscapePlaceholder = [];
                                for (var i = 0; i < d.landscapePlaceholder.length; ++i) {
                                    m.landscapePlaceholder[i] = String(d.landscapePlaceholder[i]);
                                }
                            }
                            switch (d.renderType) {
                            default:
                                if (typeof d.renderType === "number") {
                                    m.renderType = d.renderType;
                                    break;
                                }
                                break;
                            case "RenderTypeNone":
                            case 0:
                                m.renderType = 0;
                                break;
                            case "RenderTypeSingle":
                            case 1:
                                m.renderType = 1;
                                break;
                            case "RenderTypeRotation":
                            case 2:
                                m.renderType = 2;
                                break;
                            }
                            if (d.placeholderPost != null) {
                                m.placeholderPost = Boolean(d.placeholderPost);
                            }
                            if (d.show != null) {
                                m.show = Boolean(d.show);
                            }
                            if (d.avatar) {
                                if (!Array.isArray(d.avatar))
                                    throw TypeError(".bilibili.community.service.dm.v1.TextInput.avatar: array expected");
                                m.avatar = [];
                                for (var i = 0; i < d.avatar.length; ++i) {
                                    if (typeof d.avatar[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.TextInput.avatar: object expected");
                                    m.avatar[i] = $root.bilibili.community.service.dm.v1.Avatar.fromObject(d.avatar[i]);
                                }
                            }
                            switch (d.postStatus) {
                            default:
                                if (typeof d.postStatus === "number") {
                                    m.postStatus = d.postStatus;
                                    break;
                                }
                                break;
                            case "PostStatusNormal":
                            case 0:
                                m.postStatus = 0;
                                break;
                            case "PostStatusClosed":
                            case 1:
                                m.postStatus = 1;
                                break;
                            }
                            if (d.label != null) {
                                if (typeof d.label !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.TextInput.label: object expected");
                                m.label = $root.bilibili.community.service.dm.v1.Label.fromObject(d.label);
                            }
                            return m;
                        };

                        TextInput.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.arrays || o.defaults) {
                                d.portraitPlaceholder = [];
                                d.landscapePlaceholder = [];
                                d.avatar = [];
                            }
                            if (o.defaults) {
                                d.renderType = o.enums === String ? "RenderTypeNone" : 0;
                                d.placeholderPost = false;
                                d.show = false;
                                d.postStatus = o.enums === String ? "PostStatusNormal" : 0;
                                d.label = null;
                            }
                            if (m.portraitPlaceholder && m.portraitPlaceholder.length) {
                                d.portraitPlaceholder = [];
                                for (var j = 0; j < m.portraitPlaceholder.length; ++j) {
                                    d.portraitPlaceholder[j] = m.portraitPlaceholder[j];
                                }
                            }
                            if (m.landscapePlaceholder && m.landscapePlaceholder.length) {
                                d.landscapePlaceholder = [];
                                for (var j = 0; j < m.landscapePlaceholder.length; ++j) {
                                    d.landscapePlaceholder[j] = m.landscapePlaceholder[j];
                                }
                            }
                            if (m.renderType != null && m.hasOwnProperty("renderType")) {
                                d.renderType = o.enums === String ? $root.bilibili.community.service.dm.v1.RenderType[m.renderType] === undefined ? m.renderType : $root.bilibili.community.service.dm.v1.RenderType[m.renderType] : m.renderType;
                            }
                            if (m.placeholderPost != null && m.hasOwnProperty("placeholderPost")) {
                                d.placeholderPost = m.placeholderPost;
                            }
                            if (m.show != null && m.hasOwnProperty("show")) {
                                d.show = m.show;
                            }
                            if (m.avatar && m.avatar.length) {
                                d.avatar = [];
                                for (var j = 0; j < m.avatar.length; ++j) {
                                    d.avatar[j] = $root.bilibili.community.service.dm.v1.Avatar.toObject(m.avatar[j], o);
                                }
                            }
                            if (m.postStatus != null && m.hasOwnProperty("postStatus")) {
                                d.postStatus = o.enums === String ? $root.bilibili.community.service.dm.v1.PostStatus[m.postStatus] === undefined ? m.postStatus : $root.bilibili.community.service.dm.v1.PostStatus[m.postStatus] : m.postStatus;
                            }
                            if (m.label != null && m.hasOwnProperty("label")) {
                                d.label = $root.bilibili.community.service.dm.v1.Label.toObject(m.label, o);
                            }
                            return d;
                        };

                        TextInput.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        TextInput.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.TextInput";
                        };

                        return TextInput;
                    })();

                    v1.CheckBox = (function() {

                        function CheckBox(p) {
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        CheckBox.prototype.text = "";
                        CheckBox.prototype.type = 0;
                        CheckBox.prototype.defaultValue = false;
                        CheckBox.prototype.show = false;

                        CheckBox.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.CheckBox();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        m.text = r.string();
                                        break;
                                    }
                                case 2: {
                                        m.type = r.int32();
                                        break;
                                    }
                                case 3: {
                                        m.defaultValue = r.bool();
                                        break;
                                    }
                                case 4: {
                                        m.show = r.bool();
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        CheckBox.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.CheckBox)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.CheckBox();
                            if (d.text != null) {
                                m.text = String(d.text);
                            }
                            switch (d.type) {
                            default:
                                if (typeof d.type === "number") {
                                    m.type = d.type;
                                    break;
                                }
                                break;
                            case "CheckboxTypeNone":
                            case 0:
                                m.type = 0;
                                break;
                            case "CheckboxTypeEncourage":
                            case 1:
                                m.type = 1;
                                break;
                            case "CheckboxTypeColorDM":
                            case 2:
                                m.type = 2;
                                break;
                            }
                            if (d.defaultValue != null) {
                                m.defaultValue = Boolean(d.defaultValue);
                            }
                            if (d.show != null) {
                                m.show = Boolean(d.show);
                            }
                            return m;
                        };

                        CheckBox.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.defaults) {
                                d.text = "";
                                d.type = o.enums === String ? "CheckboxTypeNone" : 0;
                                d.defaultValue = false;
                                d.show = false;
                            }
                            if (m.text != null && m.hasOwnProperty("text")) {
                                d.text = m.text;
                            }
                            if (m.type != null && m.hasOwnProperty("type")) {
                                d.type = o.enums === String ? $root.bilibili.community.service.dm.v1.CheckboxType[m.type] === undefined ? m.type : $root.bilibili.community.service.dm.v1.CheckboxType[m.type] : m.type;
                            }
                            if (m.defaultValue != null && m.hasOwnProperty("defaultValue")) {
                                d.defaultValue = m.defaultValue;
                            }
                            if (m.show != null && m.hasOwnProperty("show")) {
                                d.show = m.show;
                            }
                            return d;
                        };

                        CheckBox.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        CheckBox.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.CheckBox";
                        };

                        return CheckBox;
                    })();

                    v1.Toast = (function() {

                        function Toast(p) {
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        Toast.prototype.text = "";
                        Toast.prototype.duration = 0;
                        Toast.prototype.show = false;
                        Toast.prototype.button = null;

                        Toast.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.Toast();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        m.text = r.string();
                                        break;
                                    }
                                case 2: {
                                        m.duration = r.int32();
                                        break;
                                    }
                                case 3: {
                                        m.show = r.bool();
                                        break;
                                    }
                                case 4: {
                                        m.button = $root.bilibili.community.service.dm.v1.Button.decode(r, r.uint32());
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        Toast.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.Toast)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.Toast();
                            if (d.text != null) {
                                m.text = String(d.text);
                            }
                            if (d.duration != null) {
                                m.duration = d.duration | 0;
                            }
                            if (d.show != null) {
                                m.show = Boolean(d.show);
                            }
                            if (d.button != null) {
                                if (typeof d.button !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.Toast.button: object expected");
                                m.button = $root.bilibili.community.service.dm.v1.Button.fromObject(d.button);
                            }
                            return m;
                        };

                        Toast.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.defaults) {
                                d.text = "";
                                d.duration = 0;
                                d.show = false;
                                d.button = null;
                            }
                            if (m.text != null && m.hasOwnProperty("text")) {
                                d.text = m.text;
                            }
                            if (m.duration != null && m.hasOwnProperty("duration")) {
                                d.duration = m.duration;
                            }
                            if (m.show != null && m.hasOwnProperty("show")) {
                                d.show = m.show;
                            }
                            if (m.button != null && m.hasOwnProperty("button")) {
                                d.button = $root.bilibili.community.service.dm.v1.Button.toObject(m.button, o);
                            }
                            return d;
                        };

                        Toast.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        Toast.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Toast";
                        };

                        return Toast;
                    })();

                    v1.Period = (function() {

                        function Period(p) {
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        Period.prototype.start = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        Period.prototype.end = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        Period.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.Period();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        m.start = r.int64();
                                        break;
                                    }
                                case 2: {
                                        m.end = r.int64();
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        Period.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.Period)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.Period();
                            if (d.start != null) {
                                if ($util.Long)
                                    (m.start = $util.Long.fromValue(d.start)).unsigned = false;
                                else if (typeof d.start === "string")
                                    m.start = parseInt(d.start, 10);
                                else if (typeof d.start === "number")
                                    m.start = d.start;
                                else if (typeof d.start === "object")
                                    m.start = new $util.LongBits(d.start.low >>> 0, d.start.high >>> 0).toNumber();
                            }
                            if (d.end != null) {
                                if ($util.Long)
                                    (m.end = $util.Long.fromValue(d.end)).unsigned = false;
                                else if (typeof d.end === "string")
                                    m.end = parseInt(d.end, 10);
                                else if (typeof d.end === "number")
                                    m.end = d.end;
                                else if (typeof d.end === "object")
                                    m.end = new $util.LongBits(d.end.low >>> 0, d.end.high >>> 0).toNumber();
                            }
                            return m;
                        };

                        Period.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.defaults) {
                                if ($util.Long) {
                                    var n = new $util.Long(0, 0, false);
                                    d.start = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                                } else
                                    d.start = o.longs === String ? "0" : 0;
                                if ($util.Long) {
                                    var n = new $util.Long(0, 0, false);
                                    d.end = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                                } else
                                    d.end = o.longs === String ? "0" : 0;
                            }
                            if (m.start != null && m.hasOwnProperty("start")) {
                                if (typeof m.start === "number")
                                    d.start = o.longs === String ? String(m.start) : m.start;
                                else
                                    d.start = o.longs === String ? $util.Long.prototype.toString.call(m.start) : o.longs === Number ? new $util.LongBits(m.start.low >>> 0, m.start.high >>> 0).toNumber() : m.start;
                            }
                            if (m.end != null && m.hasOwnProperty("end")) {
                                if (typeof m.end === "number")
                                    d.end = o.longs === String ? String(m.end) : m.end;
                                else
                                    d.end = o.longs === String ? $util.Long.prototype.toString.call(m.end) : o.longs === Number ? new $util.LongBits(m.end.low >>> 0, m.end.high >>> 0).toNumber() : m.end;
                            }
                            return d;
                        };

                        Period.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        Period.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Period";
                        };

                        return Period;
                    })();

                    v1.RenderType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "RenderTypeNone"] = 0;
                        values[valuesById[1] = "RenderTypeSingle"] = 1;
                        values[valuesById[2] = "RenderTypeRotation"] = 2;
                        return values;
                    })();

                    v1.Bubble = (function() {

                        function Bubble(p) {
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        Bubble.prototype.text = "";
                        Bubble.prototype.url = "";

                        Bubble.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.Bubble();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        m.text = r.string();
                                        break;
                                    }
                                case 2: {
                                        m.url = r.string();
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        Bubble.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.Bubble)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.Bubble();
                            if (d.text != null) {
                                m.text = String(d.text);
                            }
                            if (d.url != null) {
                                m.url = String(d.url);
                            }
                            return m;
                        };

                        Bubble.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.defaults) {
                                d.text = "";
                                d.url = "";
                            }
                            if (m.text != null && m.hasOwnProperty("text")) {
                                d.text = m.text;
                            }
                            if (m.url != null && m.hasOwnProperty("url")) {
                                d.url = m.url;
                            }
                            return d;
                        };

                        Bubble.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        Bubble.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Bubble";
                        };

                        return Bubble;
                    })();

                    v1.Avatar = (function() {

                        function Avatar(p) {
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        Avatar.prototype.id = "";
                        Avatar.prototype.url = "";
                        Avatar.prototype.avatarType = 0;

                        Avatar.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.Avatar();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        m.id = r.string();
                                        break;
                                    }
                                case 2: {
                                        m.url = r.string();
                                        break;
                                    }
                                case 3: {
                                        m.avatarType = r.int32();
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        Avatar.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.Avatar)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.Avatar();
                            if (d.id != null) {
                                m.id = String(d.id);
                            }
                            if (d.url != null) {
                                m.url = String(d.url);
                            }
                            switch (d.avatarType) {
                            default:
                                if (typeof d.avatarType === "number") {
                                    m.avatarType = d.avatarType;
                                    break;
                                }
                                break;
                            case "AvatarTypeNone":
                            case 0:
                                m.avatarType = 0;
                                break;
                            case "AvatarTypeNFT":
                            case 1:
                                m.avatarType = 1;
                                break;
                            }
                            return m;
                        };

                        Avatar.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.defaults) {
                                d.id = "";
                                d.url = "";
                                d.avatarType = o.enums === String ? "AvatarTypeNone" : 0;
                            }
                            if (m.id != null && m.hasOwnProperty("id")) {
                                d.id = m.id;
                            }
                            if (m.url != null && m.hasOwnProperty("url")) {
                                d.url = m.url;
                            }
                            if (m.avatarType != null && m.hasOwnProperty("avatarType")) {
                                d.avatarType = o.enums === String ? $root.bilibili.community.service.dm.v1.AvatarType[m.avatarType] === undefined ? m.avatarType : $root.bilibili.community.service.dm.v1.AvatarType[m.avatarType] : m.avatarType;
                            }
                            return d;
                        };

                        Avatar.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        Avatar.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Avatar";
                        };

                        return Avatar;
                    })();

                    v1.PostStatus = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "PostStatusNormal"] = 0;
                        values[valuesById[1] = "PostStatusClosed"] = 1;
                        return values;
                    })();

                    v1.Label = (function() {

                        function Label(p) {
                            this.content = [];
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        Label.prototype.title = "";
                        Label.prototype.content = $util.emptyArray;

                        Label.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.Label();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        m.title = r.string();
                                        break;
                                    }
                                case 2: {
                                        if (!(m.content && m.content.length))
                                            m.content = [];
                                        m.content.push(r.string());
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        Label.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.Label)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.Label();
                            if (d.title != null) {
                                m.title = String(d.title);
                            }
                            if (d.content) {
                                if (!Array.isArray(d.content))
                                    throw TypeError(".bilibili.community.service.dm.v1.Label.content: array expected");
                                m.content = [];
                                for (var i = 0; i < d.content.length; ++i) {
                                    m.content[i] = String(d.content[i]);
                                }
                            }
                            return m;
                        };

                        Label.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.arrays || o.defaults) {
                                d.content = [];
                            }
                            if (o.defaults) {
                                d.title = "";
                            }
                            if (m.title != null && m.hasOwnProperty("title")) {
                                d.title = m.title;
                            }
                            if (m.content && m.content.length) {
                                d.content = [];
                                for (var j = 0; j < m.content.length; ++j) {
                                    d.content[j] = m.content[j];
                                }
                            }
                            return d;
                        };

                        Label.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        Label.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Label";
                        };

                        return Label;
                    })();

                    v1.CheckboxType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "CheckboxTypeNone"] = 0;
                        values[valuesById[1] = "CheckboxTypeEncourage"] = 1;
                        values[valuesById[2] = "CheckboxTypeColorDM"] = 2;
                        return values;
                    })();

                    v1.Button = (function() {

                        function Button(p) {
                            if (p)
                                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                    if (p[ks[i]] != null)
                                        this[ks[i]] = p[ks[i]];
                        }

                        Button.prototype.text = "";
                        Button.prototype.action = 0;

                        Button.decode = function decode(r, l, e) {
                            if (!(r instanceof $Reader))
                                r = $Reader.create(r);
                            var c = l === undefined ? r.len : r.pos + l, m = new $root.bilibili.community.service.dm.v1.Button();
                            while (r.pos < c) {
                                var t = r.uint32();
                                if (t === e)
                                    break;
                                switch (t >>> 3) {
                                case 1: {
                                        m.text = r.string();
                                        break;
                                    }
                                case 2: {
                                        m.action = r.int32();
                                        break;
                                    }
                                default:
                                    r.skipType(t & 7);
                                    break;
                                }
                            }
                            return m;
                        };

                        Button.fromObject = function fromObject(d) {
                            if (d instanceof $root.bilibili.community.service.dm.v1.Button)
                                return d;
                            var m = new $root.bilibili.community.service.dm.v1.Button();
                            if (d.text != null) {
                                m.text = String(d.text);
                            }
                            switch (d.action) {
                            default:
                                if (typeof d.action === "number") {
                                    m.action = d.action;
                                    break;
                                }
                                break;
                            case "ToastFunctionTypeNone":
                            case 0:
                                m.action = 0;
                                break;
                            case "ToastFunctionTypePostPanel":
                            case 1:
                                m.action = 1;
                                break;
                            }
                            return m;
                        };

                        Button.toObject = function toObject(m, o) {
                            if (!o)
                                o = {};
                            var d = {};
                            if (o.defaults) {
                                d.text = "";
                                d.action = o.enums === String ? "ToastFunctionTypeNone" : 0;
                            }
                            if (m.text != null && m.hasOwnProperty("text")) {
                                d.text = m.text;
                            }
                            if (m.action != null && m.hasOwnProperty("action")) {
                                d.action = o.enums === String ? $root.bilibili.community.service.dm.v1.ToastFunctionType[m.action] === undefined ? m.action : $root.bilibili.community.service.dm.v1.ToastFunctionType[m.action] : m.action;
                            }
                            return d;
                        };

                        Button.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        Button.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Button";
                        };

                        return Button;
                    })();

                    v1.AvatarType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "AvatarTypeNone"] = 0;
                        values[valuesById[1] = "AvatarTypeNFT"] = 1;
                        return values;
                    })();

                    v1.ToastFunctionType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "ToastFunctionTypeNone"] = 0;
                        values[valuesById[1] = "ToastFunctionTypePostPanel"] = 1;
                        return values;
                    })();

                    return v1;
                })();

                return dm;
            })();

            return service;
        })();

        return community;
    })();

    return bilibili;
})();

export { $root as default };
