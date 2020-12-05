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
    SampleService.prototype.setHeader = function (requestHeader) {
        return _super.prototype.setHeader.call(this, requestHeader);
    };
    /**
     *
     * @param firstParameter the first parameter
     * @param secondParameter  the second parameter
     */
    SampleService.prototype.GetAdUnitsByStatement = function (firstParameter, secondParameter) {
        return _super.prototype.request.call(this, "GetAdUnitsByStatement", firstParameter, secondParameter);
    };
    SampleService.prototype.GetAnother = function () {
        return _super.prototype.request.call(this, "GetAnother");
    };
    __decorate([
        index_1.XmlnsForParameters(0, "RequestHeader", [
            { ns: "soapenv:actor", nsUrl: "http://schemas.xmlsoap.org/soap/actor/next" },
            { ns: "soapenv:mustUnderstand", nsUrl: "0" },
            { ns: "xmlns:ns1", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: index_1.NsType.Namespace }
        ])
    ], SampleService.prototype, "setHeader", null);
    __decorate([
        index_1.XmlnsForMethod([{ ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: index_1.NsType.Namespace }]),
        index_1.AxiosConfig({ method: "GET" }),
        index_1.XmlnsForParameters(0, "firstParameter", [
        // { ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: NsType.Namespace }
        ]),
        index_1.XmlnsForParameters(1, "secondParameter")
    ], SampleService.prototype, "GetAdUnitsByStatement", null);
    __decorate([
        index_1.XmlnsForMethod([{ ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: index_1.NsType.Namespace }]),
        index_1.AxiosConfig({ method: "POST", url: "https://webservicesample.com/sample.svc/getAnother" })
    ], SampleService.prototype, "GetAnother", null);
    SampleService = __decorate([
        index_1.XmlnsForCls([
            { ns: "xmlns:soapenv", nsUrl: "http://schemas.xmlsoap.org/soap/envelope/", nsType: index_1.NsType.Namespace },
            { ns: "xmlns:xsd", nsUrl: "http://www.w3.org/2001/XMLSchema", nsType: index_1.NsType.XMLSchema },
            { ns: "xmlns:xsi", nsUrl: "http://www.w3.org/2001/XMLSchema-instance", nsType: index_1.NsType.XMLSchemaInstance }
        ]),
        index_1.AxiosConfigForCls({
            url: "https://webservicesample.com/sample.svc",
            headers: { "soap-action": "value" }
        })
    ], SampleService);
    return SampleService;
}(index_1.SoapService));
exports.default = SampleService;
