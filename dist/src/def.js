"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxiosConfig = exports.getParameter = exports.getXmlns = exports.NsType = exports.Parameter = exports.Envelope = exports.Xmlns = exports.AxiosConfigForMethod = exports.AxiosConfig = exports.Protocol = void 0;
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
function Envelope(nsList) {
    return function (constructor) {
        constructor.prototype._nsList = nsList;
        return constructor;
    };
}
exports.Envelope = Envelope;
function AxiosConfig(config) {
    return function (constructor) {
        constructor.prototype._axiosConfig = config;
        return constructor;
    };
}
exports.AxiosConfig = AxiosConfig;
function Xmlns(nsList) {
    return Reflect.metadata("xmlns:" + Math.random(), nsList);
}
exports.Xmlns = Xmlns;
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
 * @param name the name of the parameters, it will be compiled into request XML
 * @param nsList the xmlns definition
 */
function Parameter(index, name, nsList) {
    if (nsList === void 0) { nsList = []; }
    return Reflect.metadata("Parameter:" + Math.random(), {
        index: index,
        name: name,
        nsList: nsList
    });
}
exports.Parameter = Parameter;
function getParameter(target, propertyKey) {
    return Reflect.getMetadataKeys(target, propertyKey)
        .filter(function (key) { return ("" + key).startsWith("Parameter:"); })
        .map(function (key) {
        return Reflect.getMetadata(key, target, propertyKey);
    });
}
exports.getParameter = getParameter;
function Protocol(val) {
    return function (constructor) {
        constructor.prototype._protocol = val;
        return constructor;
    };
}
exports.Protocol = Protocol;
var AxiosConfigKey = "AxiosConfigKey";
function AxiosConfigForMethod(config) {
    if (config === void 0) { config = {}; }
    return Reflect.metadata(AxiosConfigKey, config);
}
exports.AxiosConfigForMethod = AxiosConfigForMethod;
function getAxiosConfig(target, propertyKey) {
    if (propertyKey === void 0) { propertyKey = ""; }
    if (propertyKey)
        return Reflect.getMetadata(AxiosConfigKey, target, propertyKey);
    else {
        return Reflect.getMetadata(AxiosConfigKey, target);
    }
}
exports.getAxiosConfig = getAxiosConfig;
