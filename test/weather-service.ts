import {
  axiosConfig, axiosConfigForMethod,
  envelope, xmlns,
  NsType, SoapService
} from "../src/index"

/**
 * WeatherService
 */
@envelope([
  { ns: "xmlns:soap", nsUrl: "http://schemas.xmlsoap.org/soap/envelope/", nsType: NsType.Namespace },
  { ns: "xmlns:xsd", nsUrl: "http://www.w3.org/2001/XMLSchema", nsType: NsType.XMLSchema },
  { ns: "xmlns:xsi", nsUrl: "http://www.w3.org/2001/XMLSchema-instance", nsType: NsType.XMLSchemaInstance }
])
@axiosConfig({
  headers: {
    "Host": "www.webxml.com.cn",
  },
  method: "POST"
})
class WeatherService extends SoapService {


  /**
   * getRegionCountry
   */
  @axiosConfigForMethod({
    url: "http://ws.webxml.com.cn/WebServices/WeatherWS.asmx/getRegionCountry",
    headers: {
      "SOAPAction": "http://ws.webxml.com.cn/getRegionCountry",
    }
  })
  @xmlns([{ ns: "xmlns", nsUrl: "http://ws.webxml.com.cn/" }])
  public getRegionCountry() {
    return super.request("getRegionCountry")
  }

  /**
   * getRegionDataset
   */
  @axiosConfigForMethod({
    url: "http://ws.webxml.com.cn/WebServices/WeatherWS.asmx/getRegionDataset",
    headers: {
      "SOAPAction": "http://ws.webxml.com.cn/getRegionDataset",
    }
  })
  @xmlns([{ ns: "xmlns", nsUrl: "http://ws.webxml.com.cn/" }])
  public getRegionDataset() {
    return super.request("getRegionDataset")
  }

}

export default WeatherService
