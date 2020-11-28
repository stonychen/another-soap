"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sample_xml_1 = __importDefault(require("./sample-xml"));
var XmlNode = /** @class */ (function () {
    function XmlNode() {
        this.$tag = "";
        this.attrs = {};
        this.selfCloseNode = true;
        this.isStart = true;
        this.children = [];
        this.content = "";
    }
    return XmlNode;
}());
function parseXml(xml) {
    var stack = [];
    var matches = xml.match(/(<|<\/)[^<\>]+(>|\/\>)/ig) || [];
    while (matches.length > 0) {
        var currNode = matches.shift();
        var xmlNode = new XmlNode();
        xmlNode.selfCloseNode = /^<.+(\/\>)$/.test(currNode);
        // xmlNode.$tag =
        stack.push(currNode);
    }
}
parseXml(sample_xml_1.default);
