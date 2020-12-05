import { AxiosConfig, AxiosRequestConfig, Xmlns, NamespaceType, SoapService } from "../src/index"
import xml from "./sample"


// const requiredMetadataKey = Symbol("required")

// function required(
//   target: Object,
//   propertyKey: string | symbol,
//   parameterIndex: number
// ) {
//   let existingRequiredParameters: number[] =
//     Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || []
//   existingRequiredParameters.push(parameterIndex)
//   Reflect.defineMetadata(
//     requiredMetadataKey,
//     existingRequiredParameters,
//     target,
//     propertyKey
//   )
// }


@AxiosConfig({
  url: "https://webservicesample.com/sample.svc",
  headers: {
    "soap-action": "value"
  }
})
class NewService extends SoapService {

  @Xmlns("soapenv", "http://schemas.xmlsoap.org/soap/envelope/", NamespaceType.Envelope)
  @Xmlns("xsd", "http://www.w3.org/2001/XMLSchema", NamespaceType.XMLSchema)
  @Xmlns("xsi", "http://www.w3.org/2001/XMLSchema-instance", NamespaceType.XMLSchemaInstance)
  public envelope = null

  @Xmlns("soapenv:actor", "http://schemas.xmlsoap.org/soap/actor/next")
  @Xmlns("soapenv:mustUnderstand", "0")
  @Xmlns("xmlns:ns1", "https://www.google.com/apis/ads/publisher/v202011", NamespaceType.EntityNS)
  public header: any = []

  @Xmlns("soapenv:actor", "http://schemas.xmlsoap.org/soap/actor/next")
  @Xmlns("soapenv:mustUnderstand", "0")
  @Xmlns("xmlns:ns1", "https://www.google.com/apis/ads/publisher/v202011", NamespaceType.EntityNS)
  public body: any[] = []

  @Xmlns("xmlns", "https://www.google.com/apis/ads/publisher/v202011")
  @AxiosConfig({
    url: "https://webservicesample.com/sample.svc/getAdUnitsByStatement",
    method: "GET"
  })
  public getAdUnitsByStatement(
    // @Xmlns("xsi", "http://www.w3.org/2001/XMLSchema-instance", NamespaceType.XMLSchemaInstance)
    filterStatement: any
  ) {
    this.body = [filterStatement]
    return this.request("getAdUnitsByStatement")
  }


  @Xmlns("xmlns", "https://www.google.com/apis/ads/publisher/v202011")
  @AxiosConfig({
    url: "https://webservicesample.com/sample.svc/getAnother",
    method: "POST"
  })
  public getAnother() {
    this.body = []
    return this.request("getAnother")
  }
}


const newService = new NewService()
newService.getAdUnitsByStatement({ query: "" })


newService.getAnother()
