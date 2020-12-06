another-soap
=======
another-soap is another soap package for node js.

# Table of Contents

- [another-soap](#another-soap)
- [Table of Contents](#table-of-contents)
- [Getting started](#getting-started)
  - [Install](#install)
  - [Initialize a service](#initialize-a-service)
  - [Define Header section](#define-header-section)
  - [Add a request method](#add-a-request-method)
  - [Consume the service](#consume-the-service)
  - [Example 1](#example-1)
  - [Example 2](#example-2)
  - [Console the compiled XML](#console-the-compiled-xml)


# Getting started

## Install

`another-soap` is installed and included like any other node module:

``` cmd
npm install another-soap -save
```

## Initialize a service

Create a typesscript(.ts) file, and name it as `example-service.ts`. Then import package like below.

``` typescript
import { AxiosConfig, AxiosConfigForMethod, Xmlns, Envelope, Parameter, NsType, SoapService } from 'another-soap'
```

Create a class `ExampleService`, and inherit from SoapService.

``` typescript
class ExampleService extends SoapService {
}
```

Add namespaces, axios config for the class. For more information about axios, refer to [axios](https://www.npmjs.com/package/axios). Axios config can be overridden by the definition on each method.

``` typescript
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
}
```

## Define Header section

If request XML contain a section of Header, we need to add a method `setHeader` inside the class `ExampleService`.  

Let's see below code, `RequestHeader` is one of the parameters. We can add more paramters. Correspondingly we need to add `Parameter` on for the method.

``` typescript
class ExampleService extends SoapService {

  /**
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

```

The decorator of `Parameter` contains three parameters.

``` typescript
/**
 * @param index the sequence of the paramters
 * @param name the name of the parameters, it will be compiled into request XML
 * @param nsList the xmlns definition
 */
declare function Parameter(index: number, name: string, nsList?: IXmlns[]): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
```

## Add a request method

Add `Xmlns` for the method. If there is no, we inherit namespaces from envelope.

Add `AxiosConfigForMethod` for the method, we will combine axios config with which was defined on the class. Maybe the request headers, url or other other options of the method might be different. We just override it here.

Add `Parameter` for the method. And it should be matched with actual paramters.

``` typescript
class ExampleService extends SoapService {

  /**
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

}
```

## Consume the service

Create another typescript file `example.ts`. and import the created `ExampleService`

``` typescript
import ExampleService from "./example-service"

```

New a service  `newService`, and call `setHeader` to setup a header section. If there is no header section. Just ignore it. If ignoring it.  The compiled XML might be like `</Header>`

``` typescript

const newService = new ExampleService().setHeader({
  networkCode: "networkCode",
  applicationName: "applicationName"
})

```

Call the one of the method of the service. We can see the first parameter is an object. And the second parameter is empty string.

``` typescript
newService.GetAdUnitsByStatement({
  queries: [
    {
      id: "1",
      name: "san"
    }
  ],
  uuid: "uuid"
}, "").then(res => {
  console.log(res)
})
```

## Example 1

example-service.ts

``` typescript
import { AxiosConfig, AxiosConfigForMethod, Xmlns, Envelope, Parameter, NsType, SoapService } from "another-soap"


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
```

example.ts

``` typescript
import ExampleService from "./example-service"

const newService = new ExampleService().setHeader({
  networkCode: "networkCode",
  applicationName: "applicationName"
})

newService.GetAdUnitsByStatement({
  queries: [
    {
      id: "1",
      name: "san"
    }
  ],
  uuid: "uuid"
}, "").then(res => {
  console.log(res)
})

newService.GetAnother().then(res => {
  console.log(res)
})

```

## Example 2

weather-service.ts

``` typescript
import { AxiosConfig, AxiosConfigForMethod, Envelope, Xmlns, NsType, SoapService } from "another-soap"

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
```

weather.ts

``` typescript
import WeatherService from "./weather-service"

const weatherService = new WeatherService()
weatherService.getRegionCountry().then(res => {
  console.log(res.data)
})


weatherService.getRegionDataset().then(res => {
  console.log(res.data)
})


```

## Console the compiled XML

We can console the compiled xml after calling the method `console.log(weatherService.requestXml)`
