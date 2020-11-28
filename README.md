# another-soap

Input

``` typescript
import AnotherSoap from './another-soap'

const anotherSoap = new AnotherSoap()
anotherSoap.method = "GetData"

anotherSoap.bodyEntities = [
  {
    name: "sessionId",
    object: "XXXXX",
  },
  {
    name: "requestData",
    object: {
      foo: "foo",
      bar: "bar",
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
            name: "car2",
            brand: "BMW"
          },
        },
      ],
    },
  },
]
console.log(anotherSoap.toXML())


```

Output

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempurl.org/" xmlns:ent="http://schemas.datacontract.org/2004/07/ent.Entities" xmlns:arr="http://schemas.microsoft.com/2003/10/Serialization/Arrays">
  <soapenv:Header/>
  <soapenv:Body>
    <tem:GetData>
      <tem:sessionId>XXXXX</tem:sessionId>
      <tem:requestData>
        <ent:foo>foo</ent:foo>
        <ent:bar>bar</ent:bar>
        <ent:bars>
          <arr:string>bar1</arr:string>
          <arr:string/>
        </ent:bars>
        <ent:numbers>
          <arr:number>1</arr:number>
          <arr:number>2</arr:number>
        </ent:numbers>
        <ent:booleans>
          <arr:boolean>true</arr:boolean>
          <arr:boolean>false</arr:boolean>
        </ent:booleans>
        <ent:cars>
          <ent:car>
            <ent:name>car1</ent:name>
            <ent:brand>Volkswagen</ent:brand>
          </ent:car>
          <ent:car>
            <ent:name>car2</ent:name>
            <ent:brand>BMW</ent:brand>
          </ent:car>
        </ent:cars>
      </tem:requestData>
    </tem:GetData>
  </soapenv:Body>
</soapenv:Envelope>
```
