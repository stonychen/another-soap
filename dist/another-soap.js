"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnotherSoap = /** @class */ (function () {
    function AnotherSoap() {
        this.firstLine = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>";
        this.env = "soapenv";
        this.envUrl = "http://schemas.xmlsoap.org/soap/envelope/";
        this.tem = "tem";
        this._temUrl = "";
        this.defaultEnt = "ent";
        this.arr = "arr";
        this.arrUrl = "http://schemas.microsoft.com/2003/10/Serialization/Arrays";
        this.method = "GetData";
        this.methodNs = "";
        this.methodNsUrl = "";
        this.headerEntities = [];
        this.bodyEntities = [];
        this.customNamespaces = "";
    }
    Object.defineProperty(AnotherSoap.prototype, "temUrl", {
        get: function () {
            var url = this.tem ? "http://tempurl.org/" : "";
            return this._temUrl ? this._temUrl : url;
        },
        set: function (val) {
            this._temUrl = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnotherSoap.prototype, "defaultEntUrl", {
        get: function () {
            return this.defaultEnt ? "http://schemas.datacontract.org/2004/07/" + this.defaultEnt + ".Entities" : "";
        },
        enumerable: false,
        configurable: true
    });
    AnotherSoap.prototype.toXML = function () {
        var strHeader = this.encapsulateHeader();
        var strBody = this.encapsulateBody();
        return this.firstLine + this.encapsulateEnvelope(strHeader + strBody);
    };
    AnotherSoap.prototype.encapsulateEnvelope = function (inner) {
        var strEnv = this.env ? "xmlns:" + this.env + "=\"" + this.envUrl + "\"  " : "";
        var strTem = this.tem ? "xmlns:" + this.tem + "=\"" + this.temUrl + "\" " : "";
        var strEntities = this.defaultEnt ? "xmlns:" + this.defaultEnt + "=\"" + this.defaultEntUrl + "\" " : "";
        var strArr = this.env ? " xmlns:" + this.arr + "=\"" + this.arrUrl + "\"  " : "";
        return "<" + this.env + ":Envelope " + strEnv + " " + strTem + " " + strEntities + " " + this.customNamespaces + " " + strArr + ">" + inner + "</" + this.env + ":Envelope>";
    };
    AnotherSoap.prototype.encapsulateHeader = function () {
        if (this.headerEntities.length === 0) {
            return "<" + this.env + ":Header/>";
        }
        else {
            var inner = this.encapsulateEntity(this.headerEntities);
            return "<" + this.env + ":Header>" + inner + "</" + this.env + ":Header>";
        }
    };
    AnotherSoap.prototype.encapsulateBody = function () {
        var inner = this.encapsulateEntity(this.bodyEntities);
        var tempTem = this.tem ? this.tem + ":" : "";
        tempTem = this.methodNs ? this.methodNs + ":" : tempTem;
        var decMethodNs = this.methodNs ? "xmlns:" + this.methodNs + "=\"" + this.methodNsUrl + "\" " : "";
        return "<" + this.env + ":Body><" + tempTem + this.method + " " + decMethodNs + ">" + inner + "</" + tempTem + this.method + "></" + this.env + ":Body>";
    };
    AnotherSoap.prototype.encapsulateEntity = function (entities) {
        var _this = this;
        var tempTem = this.tem ? this.tem : "";
        tempTem = this.methodNs ? this.methodNs : tempTem;
        return entities.map(function (item) {
            return _this.convert2xml("", "", item.name, item.object, item.ns ? "" + item.ns : _this.defaultEnt, item.nsUrl, tempTem);
        }).join("");
    };
    AnotherSoap.prototype.convert2xml = function (parentStart, parentEnd, nodeName, node, ns, nsUrl, tem) {
        var _this = this;
        var temNs = tem ? tem : ns;
        temNs = temNs ? temNs + ":" : "";
        var decNs = nsUrl ? " xmlns:" + ns + "=\"" + nsUrl + "\" " : "";
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
                return _this.convert2xml(parentStart, parentEnd, "", item, ns);
            }).join("");
            return inner
                ? "<" + temNs + nodeName + decNs + ">" + inner + "</" + temNs + nodeName + ">"
                : "</" + temNs + nodeName + decNs + ">";
        }
        else if (typeof node === "object" && !Array.isArray(node)) {
            var inner = Object.getOwnPropertyNames(node).map(function (item) {
                return _this.convert2xml(parentStart, parentEnd, item, node[item], ns);
            }).join("");
            if (nodeName) {
                return inner
                    ? "<" + temNs + nodeName + decNs + ">" + inner + "</" + temNs + nodeName + ">"
                    : "</" + temNs + nodeName + decNs + ">";
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
                ? "<" + temNs + nodeName + decNs + ">" + val + "</" + temNs + nodeName + ">"
                : "<" + this.arr + ":" + typeof node + ">" + val + "</" + this.arr + ":" + typeof node + ">";
        }
    };
    AnotherSoap.prototype.handleArrayChildren = function () { };
    return AnotherSoap;
}());
exports.default = AnotherSoap;
