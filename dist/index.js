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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var another_xml2json_1 = require("another-xml2json");
var xml_def_1 = require("./xml-def");
var axios_1 = __importDefault(require("axios"));
var Soap = /** @class */ (function () {
    function Soap() {
        this.xmlDef = new xml_def_1.XmlDef();
        this.arrayNodes = [];
        this.escape = true;
    }
    Soap.prototype.post = function (url, headers, options) {
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = {}; }
        return this.request(url, "post", headers, options);
    };
    Soap.prototype.get = function (url, headers, options) {
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = {}; }
        return this.request(url, "get", headers, options);
    };
    Soap.prototype.delete = function (url, headers, options) {
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = {}; }
        return this.request(url, "delete", headers, options);
    };
    Soap.prototype.put = function (url, headers, options) {
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = {}; }
        return this.request(url, "put", headers, options);
    };
    Soap.prototype.request = function (url, method, headers, options) {
        var _this = this;
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = {}; }
        var xml = this.xmlDef.toXML();
        return new Promise(function (resolve, reject) {
            return axios_1.default(__assign(__assign({ url: url,
                method: method }, options), { headers: __assign(__assign({ "Content-Type": "text/xml; charset=utf-8" }, headers), options.headers), data: xml })).then(function (res) {
                return resolve(another_xml2json_1.xml2json(res.data, {
                    escape: _this.escape,
                    arrayNodes: _this.arrayNodes
                }).Envelope.Body);
            }).catch(function (err) { return reject; });
        });
    };
    return Soap;
}());
exports.default = Soap;
var soap = new Soap();
soap.xmlDef.method = "getRegionCountry";
soap.xmlDef.customNamespaces = "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"";
soap.xmlDef.env = "soap";
soap.arrayNodes = [/getRegionCountryResult$/];
soap.request("http://WebXml.com.cn/WebServices/WeatherWS.asmx", "post", {
    "Host": "www.webxml.com.cn",
    "SOAPAction": "http://WebXml.com.cn/getRegionCountry",
}).then(function (res) {
    console.log(res);
}).catch(function (err) {
    console.log(err);
});
soap.arrayNodes = [/getRegion$/];
soap.request("http://WebXml.com.cn/WebServices/WeatherWS.asmx", "post", {
    "Host": "www.webxml.com.cn",
    "SOAPAction": "http://WebXml.com.cn/getRegionDataset",
}).then(function (res) {
    console.log(JSON.stringify(res));
}).catch(function (err) {
    console.log(err);
});
