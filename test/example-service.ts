import {
  axiosConfig, axiosConfigForMethod,
  xmlns, envelope, param,
  NsType, SoapService
} from "../src/index"


/**
 * ExampleService
 */
@envelope([
  { ns: "xmlns:soapenv", nsUrl: "http://schemas.xmlsoap.org/soap/envelope/", nsType: NsType.Namespace },
  { ns: "xmlns:xsd", nsUrl: "http://www.w3.org/2001/XMLSchema", nsType: NsType.XMLSchema },
  { ns: "xmlns:xsi", nsUrl: "http://www.w3.org/2001/XMLSchema-instance", nsType: NsType.XMLSchemaInstance }
])
@axiosConfig({
  url: "https://webservicesample.com/sample.svc",
  headers: { "soap-action": "value" }
})
class ExampleService extends SoapService {

  /**
   * Set a Header
   * @param RequestHeader, the one of parameters of header section
   */
  @param(
    0, "RequestHeader", [
    { ns: "soapenv:actor", nsUrl: "http://schemas.xmlsoap.org/soap/actor/next" },
    { ns: "soapenv:mustUnderstand", nsUrl: "0" },
    { ns: "xmlns:ns1", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: NsType.Namespace }
  ])
  public setHeader(requestHeader: any) {
    return super.setHeader(requestHeader)
  }

  /**
   * GetAdUnitsByStatement
   * @param firstParam, the first parameter
   * @param secondParam,  the second parameter
   */
  @xmlns([{ ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: NsType.Namespace }])
  @axiosConfigForMethod({ method: "GET" })
  @param(0, "firstParam", [
    { ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: NsType.Namespace }
  ])
  @param(1, "secondParam")
  public GetAdUnitsByStatement(
    firstParam: any,
    secondParam: any
  ) {
    return super.request("GetAdUnitsByStatement", firstParam, secondParam)
  }

  /**
   * GetAnother
   */
  @xmlns([{ ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: NsType.Namespace }])
  @axiosConfigForMethod({ method: "POST", url: "https://webservicesample.com/sample.svc/getAnother" })
  // @param(0, "firstParam")
  public GetAnother() {
    return super.request("GetAnother")
  }
}

export default ExampleService
