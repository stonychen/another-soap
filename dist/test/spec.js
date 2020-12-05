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
// const requiredMetadataKey = Symbol("required")
// function required(
//   target: Object,
//   propertyKey: string | symbol,
//   parameterIndex: number
// ) {
//   let existingRequiredParameters: number[] =
//     Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || []
//   existingRequiredParameters.push(parameterIndex)
//   Reflect.defineMetadata(
//     requiredMetadataKey,
//     existingRequiredParameters,
//     target,
//     propertyKey
//   )
// }
var NewService = /** @class */ (function (_super) {
    __extends(NewService, _super);
    function NewService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.envelope = null;
        _this.header = [];
        _this.body = [];
        return _this;
    }
    NewService.prototype.getAdUnitsByStatement = function (
    // @Xmlns("xsi", "http://www.w3.org/2001/XMLSchema-instance", NamespaceType.XMLSchemaInstance)
    filterStatement) {
        this.body = [filterStatement];
        return this.request("getAdUnitsByStatement");
    };
    NewService.prototype.getAnother = function () {
        this.body = [];
        return this.request("getAnother");
    };
    __decorate([
        index_1.Xmlns("soapenv", "http://schemas.xmlsoap.org/soap/envelope/", index_1.NamespaceType.Envelope),
        index_1.Xmlns("xsd", "http://www.w3.org/2001/XMLSchema", index_1.NamespaceType.XMLSchema),
        index_1.Xmlns("xsi", "http://www.w3.org/2001/XMLSchema-instance", index_1.NamespaceType.XMLSchemaInstance)
    ], NewService.prototype, "envelope", void 0);
    __decorate([
        index_1.Xmlns("soapenv:actor", "http://schemas.xmlsoap.org/soap/actor/next"),
        index_1.Xmlns("soapenv:mustUnderstand", "0"),
        index_1.Xmlns("xmlns:ns1", "https://www.google.com/apis/ads/publisher/v202011", index_1.NamespaceType.EntityNS)
    ], NewService.prototype, "header", void 0);
    __decorate([
        index_1.Xmlns("soapenv:actor", "http://schemas.xmlsoap.org/soap/actor/next"),
        index_1.Xmlns("soapenv:mustUnderstand", "0"),
        index_1.Xmlns("xmlns:ns1", "https://www.google.com/apis/ads/publisher/v202011", index_1.NamespaceType.EntityNS)
    ], NewService.prototype, "body", void 0);
    __decorate([
        index_1.Xmlns("xmlns", "https://www.google.com/apis/ads/publisher/v202011"),
        index_1.AxiosConfig({
            url: "https://webservicesample.com/sample.svc/getAdUnitsByStatement",
            method: "GET"
        })
    ], NewService.prototype, "getAdUnitsByStatement", null);
    __decorate([
        index_1.Xmlns("xmlns", "https://www.google.com/apis/ads/publisher/v202011"),
        index_1.AxiosConfig({
            url: "https://webservicesample.com/sample.svc/getAnother",
            method: "POST"
        })
    ], NewService.prototype, "getAnother", null);
    NewService = __decorate([
        index_1.AxiosConfig({
            url: "https://webservicesample.com/sample.svc",
            headers: {
                "soap-action": "value"
            }
        })
    ], NewService);
    return NewService;
}(index_1.SoapService));
var newService = new NewService();
newService.getAdUnitsByStatement({ query: "" });
newService.getAnother();
