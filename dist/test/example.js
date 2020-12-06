"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var example_service_1 = __importDefault(require("./example-service"));
var newService = new example_service_1.default().setHeader({
    networkCode: "networkCode",
    applicationName: "applicationName"
});
newService.GetAdUnitsByStatement({
    queries: [
        {
            id: "1",
            name: "san"
        }
    ],
    uuid: "uuid"
}, "").then(function (res) {
    console.log(res);
});
newService.GetAnother().then(function (res) {
    console.log(res);
});
