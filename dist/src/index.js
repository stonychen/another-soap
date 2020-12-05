"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NsType = exports.SoapService = exports.XmlnsForParameters = exports.XmlnsForMethod = exports.XmlnsForClass = exports.AxiosConfig = void 0;
require("reflect-metadata");
var def_1 = require("./def");
Object.defineProperty(exports, "AxiosConfig", { enumerable: true, get: function () { return def_1.AxiosConfig; } });
Object.defineProperty(exports, "XmlnsForClass", { enumerable: true, get: function () { return def_1.XmlnsForClass; } });
Object.defineProperty(exports, "XmlnsForMethod", { enumerable: true, get: function () { return def_1.XmlnsForMethod; } });
Object.defineProperty(exports, "XmlnsForParameters", { enumerable: true, get: function () { return def_1.XmlnsForParameters; } });
Object.defineProperty(exports, "NsType", { enumerable: true, get: function () { return def_1.NsType; } });
/**
 * The most easiest Soap Service for node.js
 */
var SoapService = /** @class */ (function () {
    function SoapService() {
        this.header = [];
        this.headerXmlnsList = [];
        this.body = [];
        this.protocol = "";
        this._axiosConfig = {};
        this.nsList = [];
        this._reflectOnce = false;
        this._flag = {};
    }
    SoapService.prototype.reflect = function (method) {
        if (!this._reflectOnce) {
            this.protocol = this._protocol;
            this.nsList = this._nsList;
            console.log('this.nsList', this.nsList);
            // console.log('this._nsList', this._nsList)
            this._axiosConfig = def_1.getAxiosConfig(this);
            console.log('this._axiosConfig', this._axiosConfig);
            this._reflectOnce = true;
        }
        // let axiosConfig = getAxiosConfig(this) || {}
        if (!this._flag[method]) {
            var methodNs = def_1.getXmlns(this, method);
            var paramNsList = def_1.getXmlnsForParameters(this, method);
            var axiosConfigMethod = def_1.getAxiosConfig(this, method);
            axiosConfigMethod = Object.assign(axiosConfigMethod, this._axiosConfig);
            this._flag[method] = {
                methodNs: methodNs,
                axiosConfigMethod: axiosConfigMethod,
                paramNsList: paramNsList
            };
        }
    };
    /**
     * Used fot setup header for XML header
     * @param parameters the parameters of the XML header
     */
    SoapService.prototype.setHeader = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        var nsList = def_1.getXmlnsForParameters(this, "setHeader");
        this.header = parameters;
        this.headerXmlnsList = nsList;
        return this;
    };
    /**
     *
     * @param method the name of the request action under XML Body, like "GetData"
     * @param parameters the parameters of the method
     */
    SoapService.prototype.request = function (method) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        this.body = parameters;
        this.reflect(method);
        var requestXml = this.toXml(method);
        console.log(requestXml);
        return new Promise(function (resolve, reject) {
            resolve("success");
        });
        // return new Promise((resolve, reject) => {
        //   axios.request(
        //     {
        //       ...axiosConfig,
        //       data: requestXml
        //     }).then(res => {
        //       resolve(xml2json(res.data, {
        //         escape: true,
        //       }))
        //     }).catch(err => {
        //       reject("Fail")
        //     })
        // })
    };
    SoapService.prototype.buildNs = function (nsArr) {
        return nsArr.map(function (m) { return m.ns + "=\"" + m.nsUrl + "\""; }).join(" ");
    };
    SoapService.prototype.toXml = function (method) {
        var strHeader = this.encapsulateSection("", this.header, this.headerXmlnsList, true);
        var strBody = this.encapsulateSection(method, this.body, this._flag[method].paramNsList);
        var nsStr = this.buildNs(this.nsList);
        return "<" + this.ns + ":Envelope " + nsStr + ">" + (strHeader + strBody) + "</" + this.ns + ":Envelope>";
    };
    SoapService.prototype.encapsulateSection = function (method, entities, entNS, header) {
        if (header === void 0) { header = false; }
        var tag = header ? "Header" : "Body";
        tag = this.ns ? this.ns + ":" + tag : tag;
        var inner = "";
        if (!header) {
            var strNS = this.buildNs(this._flag[method].methodNs);
            var ns = this.getNs(this._flag[method].methodNs, def_1.NsType.Tem);
            var tempTem = this.tem ? this.tem + ":" : "";
            tempTem = ns ? ns + ":" : tempTem;
            inner = this.encapsulateEnt(entities, entNS);
            inner = entities.length === 0 ? "<" + tempTem + method + " " + strNS + "/>"
                : "<" + tempTem + method + " " + strNS + ">" + inner + "</" + tempTem + method + " " + strNS + "/>";
        }
        else {
            inner = this.encapsulateEnt(entities, entNS);
        }
        return header && entities.length === 0 ?
            "<" + tag + "/>" : "<" + tag + ">" + inner + "</" + tag + ">";
    };
    SoapService.prototype.encapsulateEnt = function (ent, entNS) {
        return "";
    };
    SoapService.prototype.getNs = function (xmlns, nsType) {
        var tempNs = xmlns.filter(function (m) { return m.nsType === nsType; });
        return tempNs.length > 0 ? tempNs[0].ns : "";
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
        def_1.Protocol("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
    ], SoapService);
    return SoapService;
}());
exports.SoapService = SoapService;
