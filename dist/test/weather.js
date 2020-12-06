"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var weather_service_1 = __importDefault(require("./weather-service"));
var weatherService = new weather_service_1.default();
weatherService.getRegionCountry().then(function (res) {
    console.log(res.data);
});
console.log(weatherService.requestXml);
weatherService.getRegionDataset().then(function (res) {
    console.log(res.data);
});
