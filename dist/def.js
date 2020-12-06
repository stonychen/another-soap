"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxiosConfig = exports.getParam = exports.getXmlns = exports.NsType = exports.param = exports.envelope = exports.xmlns = exports.axiosConfigForMethod = exports.axiosConfig = exports.protocol = void 0;
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
function envelope(nsList) {
    return function (constructor) {
        constructor.prototype._nsList = nsList;
        return constructor;
    };
}
exports.envelope = envelope;
function axiosConfig(config) {
    return function (constructor) {
        constructor.prototype._axiosConfig = config;
        return constructor;
    };
}
exports.axiosConfig = axiosConfig;
function xmlns(nsList) {
    return Reflect.metadata("xmlns:" + Math.random(), nsList);
}
exports.xmlns = xmlns;
function getXmlns(target, propertyKey) {
    var lists = Reflect.getMetadataKeys(target, propertyKey)
        .filter(function (key) { return ("" + key).startsWith("xmlns:"); })
        .map(function (key) {
        return Reflect.getMetadata(key, target, propertyKey);
    });
    return lists.length > 0 ? lists[0] : [];
}
exports.getXmlns = getXmlns;
/**
 *
 * @param index the sequence of the paramters
 * @param name the name of the params, it will be compiled into request XML
 * @param nsList the xmlns definition
 */
function param(index, name, nsList) {
    if (nsList === void 0) { nsList = []; }
    return Reflect.metadata("param:" + Math.random(), {
        index: index,
        name: name,
        nsList: nsList
    });
}
exports.param = param;
function getParam(target, propertyKey) {
    return Reflect.getMetadataKeys(target, propertyKey)
        .filter(function (key) { return ("" + key).startsWith("param:"); })
        .map(function (key) {
        return Reflect.getMetadata(key, target, propertyKey);
    });
}
exports.getParam = getParam;
function protocol(val) {
    return function (constructor) {
        constructor.prototype._protocol = val;
        return constructor;
    };
}
exports.protocol = protocol;
var axiosConfigKey = "axiosConfigKey";
function axiosConfigForMethod(config) {
    if (config === void 0) { config = {}; }
    return Reflect.metadata(axiosConfigKey, config);
}
exports.axiosConfigForMethod = axiosConfigForMethod;
function getAxiosConfig(target, propertyKey) {
    if (propertyKey === void 0) { propertyKey = ""; }
    if (propertyKey)
        return Reflect.getMetadata(axiosConfigKey, target, propertyKey);
    else {
        return Reflect.getMetadata(axiosConfigKey, target);
    }
}
exports.getAxiosConfig = getAxiosConfig;
