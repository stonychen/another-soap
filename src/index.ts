import AnotherSoap from './another-soap'
import { xml2json } from 'another-xml2json'

const anotherSoap = new AnotherSoap()
anotherSoap.method = "GetData"
// anotherSoap.defaultEnt = ""
// anotherSoap.tem = ""
// anotherSoap.methodNs = "m"
// anotherSoap.methodNsUrl = "http://tempurl.org/"

anotherSoap.bodyEntities = [
  {
    name: "sessionId",
    object: "XXXXX",
    // ns: "ent",
    // nsUrl: "http://tempurl.org/"
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
            name: `car2<>&\"'<>&\"'`,
            brand: "BMW"
          },
        },
      ],
    },
  },
]

const xml = anotherSoap.toXML()

console.log(JSON.stringify(xml2json(xml, {
  escape: true,
  arrayNodes: [
    /requestData\.bars$/,
    /GetData\.requestData\.numbers$/,
    /requestData\.booleans$/,
    /Envelope.[\S]+.requestData.cars$/
  ]
})))




