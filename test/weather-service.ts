import { AxiosConfig, AxiosConfigForMethod, Envelope, Xmlns, NsType, SoapService } from "../src/index"


@Envelope([
  { ns: "xmlns:soap", nsUrl: "http://schemas.xmlsoap.org/soap/envelope/", nsType: NsType.Namespace },
  { ns: "xmlns:xsd", nsUrl: "http://www.w3.org/2001/XMLSchema", nsType: NsType.XMLSchema },
  { ns: "xmlns:xsi", nsUrl: "http://www.w3.org/2001/XMLSchema-instance", nsType: NsType.XMLSchemaInstance }
])
@AxiosConfig({
  headers: {
    "Host": "www.webxml.com.cn",
  },
  method: "POST"
})
class WeatherService extends SoapService {


  @AxiosConfigForMethod({
    url: "http://ws.webxml.com.cn/WebServices/WeatherWS.asmx/getRegionCountry",
    headers: {
      "SOAPAction": "http://ws.webxml.com.cn/getRegionCountry",
    }
  })
  @Xmlns([{ ns: "xmlns", nsUrl: "http://ws.webxml.com.cn/" }])
  public getRegionCountry() {
    return super.request("getRegionCountry")
  }


  @AxiosConfigForMethod({
    url: "http://ws.webxml.com.cn/WebServices/WeatherWS.asmx/getRegionDataset",
    headers: {
      "SOAPAction": "http://ws.webxml.com.cn/getRegionDataset",
    }
  })
  @Xmlns([{ ns: "xmlns", nsUrl: "http://ws.webxml.com.cn/" }])
  public getRegionDataset() {
    return super.request("getRegionDataset")
  }

}

export default WeatherService
