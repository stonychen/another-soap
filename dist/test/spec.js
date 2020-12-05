"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sample_service_1 = __importDefault(require("./sample-service"));
var newService = new sample_service_1.default().setHeader({
    networkCode: "networkCode",
    applicationName: "applicationName"
});
newService.getAdUnitsByStatement({ query: "" }, {}).then(function (res) {
    console.log(res);
});
newService.getAnother().then(function (res) {
    console.log(res);
});
