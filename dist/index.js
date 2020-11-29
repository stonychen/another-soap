"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var another_soap_1 = __importDefault(require("./another-soap"));
var another_xml2json_1 = require("another-xml2json");
var anotherSoap = new another_soap_1.default();
anotherSoap.method = "GetData";
// anotherSoap.defaultEnt = ""
// anotherSoap.tem = ""
// anotherSoap.methodNs = "m"
// anotherSoap.methodNsUrl = "http://tempurl.org/"
anotherSoap.bodyEntities = [
    {
        name: "sessionId",
        object: "XXXXX",
    },
    {
        name: "requestData",
        // ns: "Foo",
        // nsUrl: "http://schemas.datacontract.org/2004/07/Foo.Entities",
        object: {
            foo: "foo",
            bar: "bar>",
            empty: "",
            tata: null,
            bars: ["bar1", ""],
            numbers: [1, 2],
            booleans: [true, false],
            cars: [
                {
                    car: {
                        name: "car1",
                        brand: "Volkswagen"
                    },
                },
                {
                    car: {
                        name: "car2<>&\"'<>&\"'",
                        brand: "BMW"
                    },
                },
            ],
        },
    },
];
var xml = anotherSoap.toXML();
// const beautifiedXML = formatter(xml, { indentation: '  ', collapseContent: true, })
// console.log(xml)
console.log(JSON.stringify(another_xml2json_1.xml2json(xml, {
    escape: true,
    arrayNodes: [
        /requestData\.bars$/,
        /GetData\.requestData\.numbers$/,
        /requestData\.booleans$/,
        /Envelope.[\S]+.requestData.cars$/
    ]
})));
