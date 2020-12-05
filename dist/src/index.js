"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NsType = exports.SoapService = exports.XmlnsForParameters = exports.Xmlns = exports.AxiosConfig = void 0;
require("reflect-metadata");
var NsType;
(function (NsType) {
    NsType[NsType["Namespace"] = 0] = "Namespace";
    NsType[NsType["EntityNS"] = 1] = "EntityNS";
    NsType[NsType["XMLSchema"] = 2] = "XMLSchema";
    NsType[NsType["XMLSchemaInstance"] = 3] = "XMLSchemaInstance";
    NsType[NsType["Array"] = 4] = "Array";
    NsType[NsType["Tem"] = 5] = "Tem";
    NsType[NsType["Undefined"] = 6] = "Undefined";
})(NsType || (NsType = {}));
exports.NsType = NsType;
function Xmlns(namespace, namespaceUrl, namespaceType) {
    if (namespaceType === void 0) { namespaceType = NsType.Undefined; }
    return Reflect.metadata("xmlns:" + Math.random(), {
        namespace: namespace,
        namespaceUrl: namespaceUrl,
        namespaceType: namespaceType
    });
}
exports.Xmlns = Xmlns;
function XmlnsForParameters(index, name, nsList) {
    return Reflect.metadata("xmlnsForParameters:" + Math.random(), {
        index: index,
        name: name,
        nsList: nsList
    });
}
exports.XmlnsForParameters = XmlnsForParameters;
function getXmlns(target, propertyKey) {
    if (propertyKey === void 0) { propertyKey = ""; }
    if (propertyKey) {
        return Reflect.getMetadataKeys(target, propertyKey)
            .filter(function (key) { return ("" + key).startsWith("xmlns:"); })
            .map(function (key) {
            return Reflect.getMetadata(key, target, propertyKey);
        });
    }
    else {
        return Reflect.getMetadataKeys(target)
            .filter(function (key) { return ("" + key).startsWith("xmlns:"); })
            .map(function (key) {
            return Reflect.getMetadata(key, target);
        });
    }
}
function getXmlnsForParameters(target, propertyKey) {
    return Reflect.getMetadataKeys(target, propertyKey)
        .filter(function (key) { return ("" + key).startsWith("xmlnsForParameters:"); })
        .map(function (key) {
        return Reflect.getMetadata(key, target, propertyKey);
    });
}
function Protocol(val) {
    return function (constructor) {
        constructor.prototype.protocol = val;
        return constructor;
    };
}
var AxiosConfigKey = "AxiosConfigKey";
function AxiosConfig(config) {
    if (config === void 0) { config = {}; }
    return Reflect.metadata(AxiosConfigKey, config);
}
exports.AxiosConfig = AxiosConfig;
function getAxiosConfig(target, propertyKey) {
    if (propertyKey === void 0) { propertyKey = ""; }
    if (propertyKey)
        return Reflect.getMetadata(AxiosConfigKey, target, propertyKey);
    else {
        return Reflect.getMetadata(AxiosConfigKey, target);
    }
}
/**
 * The most easiest Soap Service for node.js
 */
var SoapService = /** @class */ (function () {
    function SoapService() {
        /**
         * envelope is used for override, and put namespaces
         */
        this.envelope = null;
        this.header = [];
        this.headerXmlnsList = [];
        this.body = [];
        this.bodyXmlnsList = [];
        this._protocol = "";
        this._envNs = [];
        this._method = {};
        this._axiosConfig = {};
        this._parseFlag = {};
    }
    SoapService.prototype.reflect = function (method) {
        if (!this._parseFlag.$__) {
            this._protocol = this.protocol;
            this._envNs = getXmlns(this, "envelope");
            this._axiosConfig = getAxiosConfig(this);
            this._parseFlag.$__ = true;
        }
        // let axiosConfig = getAxiosConfig(this) || {}
        if (!this._parseFlag[method]) {
            var xmlns = getXmlns(this, method);
            var axiosConfigMethod = getAxiosConfig(this, method);
            axiosConfigMethod = Object.assign(axiosConfigMethod, this._axiosConfig);
            this._parseFlag[method] = {
                xmlns: xmlns,
                axiosConfigMethod: axiosConfigMethod
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
        var nsList = getXmlnsForParameters(this, "setHeader");
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
        var nsList = getXmlnsForParameters(this, method);
        this.bodyXmlnsList = nsList;
        this.body = parameters;
        this.reflect(method);
        console.log("nsList", nsList);
        var requestXml = "";
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
    SoapService = __decorate([
        Protocol("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
    ], SoapService);
    return SoapService;
}());
exports.SoapService = SoapService;
