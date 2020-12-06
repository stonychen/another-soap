"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NsType = exports.param = exports.xmlns = exports.axiosConfigForMethod = exports.axiosConfig = exports.envelope = exports.SoapService = void 0;
require("reflect-metadata");
var axios_1 = __importDefault(require("axios"));
var another_xml2json_1 = require("another-xml2json");
var def_1 = require("./def");
Object.defineProperty(exports, "axiosConfig", { enumerable: true, get: function () { return def_1.axiosConfig; } });
Object.defineProperty(exports, "axiosConfigForMethod", { enumerable: true, get: function () { return def_1.axiosConfigForMethod; } });
Object.defineProperty(exports, "envelope", { enumerable: true, get: function () { return def_1.envelope; } });
Object.defineProperty(exports, "xmlns", { enumerable: true, get: function () { return def_1.xmlns; } });
Object.defineProperty(exports, "param", { enumerable: true, get: function () { return def_1.param; } });
Object.defineProperty(exports, "NsType", { enumerable: true, get: function () { return def_1.NsType; } });
var SoapService = /** @class */ (function () {
    function SoapService() {
        this.header = [];
        this.headerIXmlnsList = [];
        this.protocol = "";
        this.axiosConfig = {};
        this.nsList = [];
        this._reflectOnce = false;
        this._requestXml = "";
        this._flag = {};
    }
    Object.defineProperty(SoapService.prototype, "requestXml", {
        get: function () {
            return this._requestXml;
        },
        enumerable: false,
        configurable: true
    });
    SoapService.prototype.reflect = function (method) {
        if (!this._reflectOnce) {
            this.protocol = this._protocol;
            this.nsList = this._nsList;
            this.axiosConfig = this._axiosConfig;
            this._reflectOnce = true;
        }
        if (!this._flag[method]) {
            var nsList = def_1.getXmlns(this, method);
            var paramNsList = def_1.getParam(this, method);
            var axiosConfigMethod = def_1.getAxiosConfig(this, method);
            axiosConfigMethod = Object.assign(axiosConfigMethod, this.axiosConfig);
            this._flag[method] = {
                nsList: nsList,
                axiosConfigMethod: axiosConfigMethod,
                paramNsList: paramNsList
            };
        }
    };
    /**
     * Used fot setup header for XML header
     * @param params the params of the XML header
     */
    SoapService.prototype.setHeader = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var nsList = def_1.getParam(this, "setHeader");
        this.header = params;
        this.headerIXmlnsList = nsList;
        return this;
    };
    /**
     *
     * @param method the name of the request action under XML Body, like "GetData"
     * @param params the params of the method
     */
    SoapService.prototype.request = function (method) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.reflect(method);
        var requestXml = this.toXml(method, params);
        var config = this._flag[method].axiosConfigMethod || {};
        var headers = config.headers || {};
        if (!headers["Content-Type"]) {
            headers["Content-Type"] = "text/xml; charset=utf-8";
        }
        this._requestXml = requestXml;
        var options = __assign(__assign({}, def_1.axiosConfig), { headers: headers, data: requestXml, transformResponse: [function (res) {
                    if (res)
                        return another_xml2json_1.xml2json(res, {
                            escape: true,
                        });
                    else
                        return {};
                }] });
        return axios_1.default.request(options);
    };
    SoapService.prototype.buildNs = function (nsArr) {
        return nsArr.map(function (m) { return m.ns + "=\"" + m.nsUrl + "\""; }).join(" ");
    };
    SoapService.prototype.toXml = function (method, params) {
        var strHeader = this._strHeader ? this._strHeader : this.buildSection(method, this.header, this.headerIXmlnsList, true);
        this._strHeader = strHeader;
        var strBody = this.buildSection(method, params, this._flag[method].paramNsList);
        var nsStr = this.buildNs(this.nsList);
        return this.protocol + "<" + this.ns + ":envelope " + nsStr + ">" + (strHeader + strBody) + "</" + this.ns + ":envelope>";
    };
    SoapService.prototype.buildSection = function (method, entities, entNS, header) {
        if (header === void 0) { header = false; }
        var tag = header ? "Header" : "Body";
        tag = this.ns ? this.ns + ":" + tag : tag;
        var inner = "";
        if (!header) {
            var strNS = this.buildNs(this._flag[method].nsList);
            var ns = this.getNs(this._flag[method].nsList, def_1.NsType.Namespace);
            var tempTem = this.tem ? this.tem + ":" : "";
            tempTem = ns ? ns + ":" : tempTem;
            inner = this.encapsulateEntities(entities, entNS, tempTem);
            inner = entities.length === 0 ? "<" + tempTem + method + " " + strNS + "/>"
                : "<" + tempTem + method + " " + strNS + ">" + inner + "</" + tempTem + method + "/>";
        }
        else {
            inner = this.encapsulateEntities(entities, entNS);
        }
        return header && entities.length === 0 ?
            "<" + tag + "/>" : "<" + tag + ">" + inner + "</" + tag + ">";
    };
    SoapService.prototype.encapsulateEntities = function (entities, paramNSList, methodNs) {
        var _this = this;
        if (methodNs === void 0) { methodNs = ""; }
        return entities.map(function (item, index) {
            var paramNs = paramNSList.find(function (e) { return e.index === index; });
            if (!paramNs)
                throw "Should config a namespace for the params.";
            var ns = _this.getNs(paramNs.nsList, def_1.NsType.Namespace);
            var name = (paramNs === null || paramNs === void 0 ? void 0 : paramNs.name) || "";
            var tempTem = _this.tem ? _this.tem : "";
            tempTem = methodNs ? methodNs : tempTem;
            return _this.generateXml("", "", name, item, ns ? "" + ns : _this.ent, paramNs.nsList, tempTem);
        }).join("");
    };
    SoapService.prototype.generateXml = function (parentStart, parentEnd, nodeName, node, ns, nsList, tem) {
        var _this = this;
        var temNs = tem ? tem : ns;
        temNs = temNs ? temNs + ":" : "";
        var nsStr = this.buildNs(nsList || []);
        nsStr = nsStr ? " " + nsStr : "";
        if (node === null ||
            node === undefined ||
            node === "") {
            var isNil = node === null ? " i:nil=\"true\"" : "";
            return nodeName
                ? "<" + temNs + nodeName + isNil + "/>"
                : "<" + this.arr + ":string/>";
        }
        if (typeof node === "object" && Array.isArray(node)) {
            var inner = node.map(function (item) {
                return _this.generateXml(parentStart, parentEnd, "", item, ns);
            }).join("");
            return inner
                ? "<" + temNs + nodeName + nsStr + ">" + inner + "</" + temNs + nodeName + ">"
                : "</" + temNs + nodeName + nsStr + ">";
        }
        else if (typeof node === "object" && !Array.isArray(node)) {
            var inner = Object.getOwnPropertyNames(node).map(function (item) {
                return _this.generateXml(parentStart, parentEnd, item, node[item], ns);
            }).join("");
            if (nodeName) {
                return inner
                    ? "<" + temNs + nodeName + nsStr + ">" + inner + "</" + temNs + nodeName + ">"
                    : "</" + temNs + nodeName + nsStr + ">";
            }
            else {
                return inner;
            }
        }
        else {
            var val = typeof node === "string" ? node
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;') : node;
            return nodeName
                ? "<" + temNs + nodeName + nsStr + ">" + val + "</" + temNs + nodeName + ">"
                : "<" + this.arr + ":" + typeof node + ">" + val + "</" + this.arr + ":" + typeof node + ">";
        }
    };
    SoapService.prototype.getNs = function (ns, nsType) {
        var tempNs = ns.filter(function (m) { return m.nsType === nsType; });
        var namespace = tempNs.length > 0 ? tempNs[0].ns : "";
        return namespace.replace(/xmlns/ig, "").replace(/:/ig, "");
    };
    Object.defineProperty(SoapService.prototype, "tem", {
        get: function () {
            return this.getNs(this.nsList, def_1.NsType.Tem);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SoapService.prototype, "ns", {
        get: function () {
            return this.getNs(this.nsList, def_1.NsType.Namespace);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SoapService.prototype, "arr", {
        get: function () {
            return this.getNs(this.nsList, def_1.NsType.Array);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SoapService.prototype, "ent", {
        get: function () {
            return this.getNs(this.nsList, def_1.NsType.EntityNS);
        },
        enumerable: false,
        configurable: true
    });
    SoapService = __decorate([
        def_1.protocol("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
    ], SoapService);
    return SoapService;
}());
exports.SoapService = SoapService;
