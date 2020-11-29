# another-soap

``` typescript
import Soap from 'another-soap'

const soap: Soap = new Soap()
soap.xmlDef.method = "getRegionCountry"
soap.xmlDef.customNamespaces = `xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"`
soap.xmlDef.env = "soap"

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

```
