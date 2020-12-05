"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
var SampleService = /** @class */ (function (_super) {
    __extends(SampleService, _super);
    function SampleService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @param RequestHeader the parameters of header section
     */
    SampleService.prototype.setHeader = function (RequestHeader) {
        return _super.prototype.setHeader.call(this, RequestHeader);
    };
    /**
     *
     * @param firstParameter the first parameter
     * @param secondParameter  the second parameter
     */
    SampleService.prototype.getAdUnitsByStatement = function (firstParameter, secondParameter) {
        return this.request("getAdUnitsByStatement", firstParameter, secondParameter);
    };
    SampleService.prototype.getAnother = function () {
        return this.request("getAnother");
    };
    __decorate([
        index_1.XmlnsForParameters(0, "RequestHeader", [
            { ns: "soapenv:actor", nsUrl: "http://schemas.xmlsoap.org/soap/actor/next" },
            { ns: "soapenv:mustUnderstand", nsUrl: "0" },
            { ns: "xmlns:ns1", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: index_1.NsType.Namespace }
        ])
    ], SampleService.prototype, "setHeader", null);
    __decorate([
        index_1.Xmlns("xmlns", "https://www.google.com/apis/ads/publisher/v202011"),
        index_1.AxiosConfig({ method: "GET" }),
        index_1.XmlnsForParameters(0, "firstParameter", [
            { ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011" }
        ]),
        index_1.XmlnsForParameters(1, "secondParameter", [
            { ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011" }
        ])
    ], SampleService.prototype, "getAdUnitsByStatement", null);
    __decorate([
        index_1.Xmlns("xmlns", "https://www.google.com/apis/ads/publisher/v202011"),
        index_1.AxiosConfig({
            url: "https://webservicesample.com/sample.svc/getAnother",
            method: "POST"
        })
    ], SampleService.prototype, "getAnother", null);
    SampleService = __decorate([
        index_1.Xmlns("soapenv", "http://schemas.xmlsoap.org/soap/envelope/", index_1.NsType.Namespace),
        index_1.Xmlns("xsd", "http://www.w3.org/2001/XMLSchema", index_1.NsType.XMLSchema),
        index_1.Xmlns("xsi", "http://www.w3.org/2001/XMLSchema-instance", index_1.NsType.XMLSchemaInstance),
        index_1.AxiosConfig({
            url: "https://webservicesample.com/sample.svc",
            headers: { "soap-action": "value" }
        })
    ], SampleService);
    return SampleService;
}(index_1.SoapService));
exports.default = SampleService;
