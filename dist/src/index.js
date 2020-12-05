"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceType = exports.SoapService = exports.Xmlns = exports.AxiosConfig = void 0;
require("reflect-metadata");
var NamespaceType;
(function (NamespaceType) {
    NamespaceType[NamespaceType["Envelope"] = 0] = "Envelope";
    NamespaceType[NamespaceType["Tem"] = 1] = "Tem";
    NamespaceType[NamespaceType["EntityNS"] = 2] = "EntityNS";
    NamespaceType[NamespaceType["XMLSchema"] = 3] = "XMLSchema";
    NamespaceType[NamespaceType["XMLSchemaInstance"] = 4] = "XMLSchemaInstance";
    NamespaceType[NamespaceType["Undefined"] = 5] = "Undefined";
})(NamespaceType || (NamespaceType = {}));
exports.NamespaceType = NamespaceType;
function Xmlns(namespace, namespaceUrl, namespaceType) {
    if (namespaceType === void 0) { namespaceType = NamespaceType.Undefined; }
    return Reflect.metadata("xmlns" + Math.random(), {
        namespace: namespace,
        namespaceUrl: namespaceUrl,
        namespaceType: namespaceType
    });
}
exports.Xmlns = Xmlns;
function getXmlns(target, propertyKey) {
    return Reflect.getMetadataKeys(target, propertyKey)
        .filter(function (key) { return ("" + key).startsWith("xmlns"); })
        .map(function (key) {
        return Reflect.getMetadata(key, target, propertyKey);
    });
}
function getXmlnsOfObject(target) {
    console.log(Reflect.getMetadataKeys(target));
    return Reflect.getMetadataKeys(target)
        .filter(function (key) { return ("" + key).startsWith("xmlns"); })
        .map(function (key) {
        return Reflect.getMetadata(key, target);
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
var SoapService = /** @class */ (function () {
    function SoapService() {
        this.envelope = null;
        this.header = [];
        this.body = [];
    }
    SoapService.prototype.request = function (method) {
        // const protocolTmp = (this as any).protocol
        // const envNss = getXmlns(this, "envelope")
        // const headerNss = getXmlns(this, "header")
        // const bodyNss = getXmlns(this, "body")
        // const methodNss = getXmlns(this, method)
        // const axiosConfigMethod = getAxiosConfig(this, method)
        // let axiosConfig = getAxiosConfig(this) || {}
        // axiosConfig = Object.assign(axiosConfig, axiosConfigMethod)
        var bodyEntNss = this.body.map(function (ent) {
            console.log(ent);
            return getXmlnsOfObject(ent);
        });
        // console.log("protocol", protocolTmp)
        // console.log("envNss", envNss)
        // console.log("headerNss", headerNss)
        // console.log("bodyNss", bodyNss)
        // console.log("methodNss", methodNss)
        // console.log("requestMethod", requestMethod)
        console.log("bodyEntNss", bodyEntNss);
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
