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
var WeatherService = /** @class */ (function (_super) {
    __extends(WeatherService, _super);
    function WeatherService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WeatherService.prototype.getRegionCountry = function () {
        return _super.prototype.request.call(this, "getRegionCountry");
    };
    WeatherService.prototype.getRegionDataset = function () {
        return _super.prototype.request.call(this, "getRegionDataset");
    };
    __decorate([
        index_1.AxiosConfig({
            url: "http://ws.webxml.com.cn/WebServices/WeatherWS.asmx/getRegionCountry",
            headers: {
                "SOAPAction": "http://ws.webxml.com.cn/getRegionCountry",
            }
        }),
        index_1.XmlnsForMethod([{ ns: "xmlns", nsUrl: "http://ws.webxml.com.cn/" }])
    ], WeatherService.prototype, "getRegionCountry", null);
    __decorate([
        index_1.AxiosConfig({
            url: "http://ws.webxml.com.cn/WebServices/WeatherWS.asmx/getRegionDataset",
            headers: {
                "SOAPAction": "http://ws.webxml.com.cn/getRegionDataset",
            }
        }),
        index_1.XmlnsForMethod([{ ns: "xmlns", nsUrl: "http://ws.webxml.com.cn/" }])
    ], WeatherService.prototype, "getRegionDataset", null);
    WeatherService = __decorate([
        index_1.XmlnsForCls([
            { ns: "xmlns:soap", nsUrl: "http://schemas.xmlsoap.org/soap/envelope/", nsType: index_1.NsType.Namespace },
            { ns: "xmlns:xsd", nsUrl: "http://www.w3.org/2001/XMLSchema", nsType: index_1.NsType.XMLSchema },
            { ns: "xmlns:xsi", nsUrl: "http://www.w3.org/2001/XMLSchema-instance", nsType: index_1.NsType.XMLSchemaInstance }
        ]),
        index_1.AxiosConfig({
            headers: {
                "Host": "www.webxml.com.cn",
            },
            method: "POST"
        })
    ], WeatherService);
    return WeatherService;
}(index_1.SoapService));
exports.default = WeatherService;
