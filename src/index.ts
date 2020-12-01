import { xml2json } from 'another-xml2json'
import { XmlDef } from './xml-def'
import axios from 'axios'

class Soap {
  public xmlDef: XmlDef = new XmlDef()
  public arrayNodes: RegExp[] = []
  public escape: boolean = true

  public post(url: string, headers = {}, options = {}) {
    return this.request(url, "post", headers, options)
  }
  public get(url: string, headers = {}, options = {}) {
    return this.request(url, "get", headers, options)
  }
  public delete(url: string, headers = {}, options = {}) {
    return this.request(url, "delete", headers, options)
  }
  public put(url: string, headers = {}, options = {}) {
    return this.request(url, "put", headers, options)
  }
  public request(url: string, method: 'post' | 'get' | 'delete' | 'put', headers = {}, options = {}) {
    const xml = this.xmlDef.toXML()
    return new Promise((resolve, reject) => {
      return axios(
        {
          url,
          method,
          ...options,
          headers: {
            "Content-Type": "text/xml; charset=utf-8",
            ...(options as any).headers,
            ...headers,
          },
          data: xml
        }
      ).then(res => {
        return resolve(xml2json(res.data, {
          escape: this.escape,
          arrayNodes: this.arrayNodes
        }).Envelope.Body)
      }).catch(err => reject)
    })
  }
}

export default Soap

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


