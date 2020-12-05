import { AxiosConfig, AxiosConfigForCls, XmlnsForMethod, XmlnsForCls, XmlnsForParameters, NsType, SoapService } from "../src/index"


@XmlnsForCls(
  [
    { ns: "xmlns:soapenv", nsUrl: "http://schemas.xmlsoap.org/soap/envelope/" },
    { ns: "xmlns:xsd", nsUrl: "http://www.w3.org/2001/XMLSchema" },
    { ns: "xmlns:xsi", nsUrl: "http://www.w3.org/2001/XMLSchema-instance", nsType: NsType.Namespace }
  ])
@AxiosConfigForCls({
  url: "https://webservicesample.com/sample.svc",
  headers: { "soap-action": "value" }
})
class SampleService extends SoapService {

  /**
   * 
   * @param RequestHeader the parameters of header section
   */
  @XmlnsForParameters(
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
  @XmlnsForMethod([
    { ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: NsType.Namespace }
  ])
  @AxiosConfig({ method: "GET" })
  // @XmlnsForParameters(0, "firstParameter", [
  //   { ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: NsType.Namespace }
  // ])
  // @XmlnsForParameters(1, "secondParameter", [
  //   { ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: NsType.Namespace }
  // ])
  public getAdUnitsByStatement(
    firstParameter: any,
    secondParameter: any
  ) {
    return this.request("getAdUnitsByStatement", firstParameter, secondParameter)
  }


  @XmlnsForMethod([
    { ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: NsType.Namespace }
  ])
  @AxiosConfig({
    url: "https://webservicesample.com/sample.svc/getAnother",
    method: "POST"
  })
  public getAnother() {
    return this.request("getAnother")
  }
}

export default SampleService
