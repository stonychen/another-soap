import { AxiosConfig, Xmlns, XmlnsForParameters, NsType, SoapService } from "../src/index"


@AxiosConfig({
  url: "https://webservicesample.com/sample.svc",
  headers: { "soap-action": "value" }
})
class SampleService extends SoapService {

  @Xmlns("soapenv", "http://schemas.xmlsoap.org/soap/envelope/", NsType.Namespace)
  @Xmlns("xsd", "http://www.w3.org/2001/XMLSchema", NsType.XMLSchema)
  @Xmlns("xsi", "http://www.w3.org/2001/XMLSchema-instance", NsType.XMLSchemaInstance)
  public envelope = null

  /**
   * 
   * @param RequestHeader the parameters of header section
   */
  @XmlnsForParameters(0, "RequestHeader", [
    { ns: "soapenv:actor", nsUrl: "http://schemas.xmlsoap.org/soap/actor/next" },
    { ns: "soapenv:mustUnderstand", nsUrl: "0" },
    { ns: "xmlns:ns1", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: NsType.Namespace }
  ])
  public setHeader(RequestHeader: any) {
    return super.setHeader(RequestHeader)
  }

  /**
   * 
   * @param firstParameter the first parameter
   * @param secondParameter  the second parameter
   */
  @Xmlns("xmlns", "https://www.google.com/apis/ads/publisher/v202011")
  @AxiosConfig({ method: "GET" })
  @XmlnsForParameters(0, "firstParameter", [
    { ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011" }
  ])
  @XmlnsForParameters(1, "secondParameter", [
    { ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011" }
  ])
  public getAdUnitsByStatement(
    firstParameter: any,
    secondParameter: any
  ) {
    return this.request("getAdUnitsByStatement", firstParameter, secondParameter)
  }


  @Xmlns("xmlns", "https://www.google.com/apis/ads/publisher/v202011")
  @AxiosConfig({
    url: "https://webservicesample.com/sample.svc/getAnother",
    method: "POST"
  })
  public getAnother() {
    return this.request("getAnother")
  }
}

export default SampleService
