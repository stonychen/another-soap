# another-soap

``` typescript

const soap: Soap = new Soap()
soap.xmlDef.method = "getRegionCountry"
soap.xmlDef.customNamespaces = `xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"`
soap.xmlDef.env = "soap"
// soap.arrayNodes = [/getRegionCountryResult$/]

soap.request("http://WebXml.com.cn/WebServices/WeatherWS.asmx", "post",
  {
    "Host": "www.webxml.com.cn",
    "SOAPAction": "http://WebXml.com.cn/getRegionCountry",
  }
).then((res) => {
  console.log(res)
}).catch(err => {
  console.log(err)
})


soap.xmlDef.method = "getRegionDataset"
// soap.arrayNodes = [/getRegion$/]
soap.request("http://WebXml.com.cn/WebServices/WeatherWS.asmx", "post",
  {
    "Host": "www.webxml.com.cn",
    "SOAPAction": "http://WebXml.com.cn/getRegionDataset",
  }
).then((res) => {
  console.log(JSON.stringify(res))
}).catch(err => {
  console.log(err)
})

```
