"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxiosConfig = exports.getXmlnsForParameters = exports.getXmlns = exports.NsType = exports.XmlnsForParameters = exports.XmlnsForCls = exports.XmlnsForMethod = exports.AxiosConfigForCls = exports.AxiosConfig = exports.Protocol = void 0;
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
function XmlnsForCls(nsList) {
    return function (constructor) {
        constructor.prototype._nsList = nsList;
        return constructor;
    };
}
exports.XmlnsForCls = XmlnsForCls;
function AxiosConfigForCls(config) {
    return function (constructor) {
        constructor.prototype._axiosConfig = config;
        return constructor;
    };
}
exports.AxiosConfigForCls = AxiosConfigForCls;
function XmlnsForMethod(nsList) {
    return Reflect.metadata("xmlns:" + Math.random(), nsList);
}
exports.XmlnsForMethod = XmlnsForMethod;
function getXmlns(target, propertyKey) {
    var lists = Reflect.getMetadataKeys(target, propertyKey)
        .filter(function (key) { return ("" + key).startsWith("xmlns:"); })
        .map(function (key) {
        return Reflect.getMetadata(key, target, propertyKey);
    });
    return lists.length > 0 ? lists[0] : [];
}
exports.getXmlns = getXmlns;
function XmlnsForParameters(index, name, nsList) {
    if (nsList === void 0) { nsList = []; }
    return Reflect.metadata("xmlnsForParameters:" + Math.random(), {
        index: index,
        name: name,
        nsList: nsList
    });
}
exports.XmlnsForParameters = XmlnsForParameters;
function getXmlnsForParameters(target, propertyKey) {
    return Reflect.getMetadataKeys(target, propertyKey)
        .filter(function (key) { return ("" + key).startsWith("xmlnsForParameters:"); })
        .map(function (key) {
        return Reflect.getMetadata(key, target, propertyKey);
    });
}
exports.getXmlnsForParameters = getXmlnsForParameters;
function Protocol(val) {
    return function (constructor) {
        constructor.prototype._protocol = val;
        return constructor;
    };
}
exports.Protocol = Protocol;
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
exports.getAxiosConfig = getAxiosConfig;
