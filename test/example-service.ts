import { AxiosConfig, AxiosConfigForMethod, Xmlns, Envelope, Parameter, NsType, SoapService } from "../src/index"


@Envelope([
  { ns: "xmlns:soapenv", nsUrl: "http://schemas.xmlsoap.org/soap/envelope/", nsType: NsType.Namespace },
  { ns: "xmlns:xsd", nsUrl: "http://www.w3.org/2001/XMLSchema", nsType: NsType.XMLSchema },
  { ns: "xmlns:xsi", nsUrl: "http://www.w3.org/2001/XMLSchema-instance", nsType: NsType.XMLSchemaInstance }
])
@AxiosConfig({
  url: "https://webservicesample.com/sample.svc",
  headers: { "soap-action": "value" }
})
class ExampleService extends SoapService {

  /**
   * 
   * @param RequestHeader the one of parameters of header section
   */
  @Parameter(
    0, "RequestHeader", [
    { ns: "soapenv:actor", nsUrl: "http://schemas.xmlsoap.org/soap/actor/next" },
    { ns: "soapenv:mustUnderstand", nsUrl: "0" },
    { ns: "xmlns:ns1", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: NsType.Namespace }
  ])
  public setHeader(requestHeader: any) {
    return super.setHeader(requestHeader)
  }

  /**
   * 
   * @param firstParameter the first parameter
   * @param secondParameter  the second parameter
   */
  @Xmlns([{ ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: NsType.Namespace }])
  @AxiosConfigForMethod({ method: "GET" })
  @Parameter(0, "firstParameter", [
    { ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: NsType.Namespace }
  ])
  @Parameter(1, "secondParameter")
  public GetAdUnitsByStatement(
    firstParameter: any,
    secondParameter: any
  ) {
    return super.request("GetAdUnitsByStatement", firstParameter, secondParameter)
  }


  @Xmlns([{ ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: NsType.Namespace }])
  @AxiosConfigForMethod({ method: "POST", url: "https://webservicesample.com/sample.svc/getAnother" })
  // @Parameter(0, "firstParameter")
  public GetAnother() {
    return super.request("GetAnother")
  }
}

export default ExampleService
