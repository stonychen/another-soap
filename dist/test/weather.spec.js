"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var should_1 = __importDefault(require("should"));
var weather_service_1 = __importDefault(require("./weather-service"));
var weatherService = new weather_service_1.default();
describe('request test', function () {
    it('request getRegionCountry', function () {
        weatherService.getRegionCountry().then(function (res) {
            should_1.default(res.data.ArrayOfString.length).be.greaterThan(0);
        });
    });
    it('Request getRegionDataset', function () {
        weatherService.getRegionDataset().then(function (res) {
            should_1.default(!!res.data.DataSet).be.equal(true);
        });
    });
});
