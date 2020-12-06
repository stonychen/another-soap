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
var ExampleService = /** @class */ (function (_super) {
    __extends(ExampleService, _super);
    function ExampleService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @param RequestHeader the one of parameters of header section
     */
    ExampleService.prototype.setHeader = function (requestHeader) {
        return _super.prototype.setHeader.call(this, requestHeader);
    };
    /**
     *
     * @param firstParameter the first parameter
     * @param secondParameter  the second parameter
     */
    ExampleService.prototype.GetAdUnitsByStatement = function (firstParameter, secondParameter) {
        return _super.prototype.request.call(this, "GetAdUnitsByStatement", firstParameter, secondParameter);
    };
    ExampleService.prototype.GetAnother = function () {
        return _super.prototype.request.call(this, "GetAnother");
    };
    __decorate([
        index_1.Parameter(0, "RequestHeader", [
            { ns: "soapenv:actor", nsUrl: "http://schemas.xmlsoap.org/soap/actor/next" },
            { ns: "soapenv:mustUnderstand", nsUrl: "0" },
            { ns: "xmlns:ns1", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: index_1.NsType.Namespace }
        ])
    ], ExampleService.prototype, "setHeader", null);
    __decorate([
        index_1.Xmlns([{ ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: index_1.NsType.Namespace }]),
        index_1.AxiosConfigForMethod({ method: "GET" }),
        index_1.Parameter(0, "firstParameter", [
            { ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: index_1.NsType.Namespace }
        ]),
        index_1.Parameter(1, "secondParameter")
    ], ExampleService.prototype, "GetAdUnitsByStatement", null);
    __decorate([
        index_1.Xmlns([{ ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: index_1.NsType.Namespace }]),
        index_1.AxiosConfigForMethod({ method: "POST", url: "https://webservicesample.com/sample.svc/getAnother" })
    ], ExampleService.prototype, "GetAnother", null);
    ExampleService = __decorate([
        index_1.Envelope([
            { ns: "xmlns:soapenv", nsUrl: "http://schemas.xmlsoap.org/soap/envelope/", nsType: index_1.NsType.Namespace },
            { ns: "xmlns:xsd", nsUrl: "http://www.w3.org/2001/XMLSchema", nsType: index_1.NsType.XMLSchema },
            { ns: "xmlns:xsi", nsUrl: "http://www.w3.org/2001/XMLSchema-instance", nsType: index_1.NsType.XMLSchemaInstance }
        ]),
        index_1.AxiosConfig({
            url: "https://webservicesample.com/sample.svc",
            headers: { "soap-action": "value" }
        })
    ], ExampleService);
    return ExampleService;
}(index_1.SoapService));
exports.default = ExampleService;
