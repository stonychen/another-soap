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
- [Check the request XML](#check-the-request-xml)
- [MIT License](#mit-license)

# Getting started

## Install

`another-soap` is installed like any other node module:

``` cmd
npm install another-soap -save
```

## Initialize a service

Create a typesscript(.ts) file, and name it as `example-service.ts`. Then import package like below.

``` typescript
import {
  axiosConfig, axiosConfigForMethod, xmlns,
  envelope, param,
  NsType, SoapService
} from 'another-soap'
```

Create a class `ExampleService`, and inherit from SoapService.

``` typescript
class ExampleService extends SoapService {


}
```

Add namespaces, axios config for the class. For more information about axios, refer to [axios](https://www.npmjs.com/package/axios). Axios config can be overridden by the definition on each method.

``` typescript
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
}
```

## Define Header section

If request XML contain a section of Header, we need to add a method `setHeader` inside the class `ExampleService`.  

Let's see below code, `RequestHeader` is one of the parameters. We can add more paramters. Correspondingly we need to add `param` on for the method.

``` typescript
class ExampleService extends SoapService {

  /**
   * @param RequestHeader the one of parameters of header section
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
}
```

The decorator of `param` contains three parameters.

``` typescript
/**
 * @param index the sequence of the paramters
 * @param name the name of the parameters, it will be compiled into request XML
 * @param nsList the xmlns definition
 */
declare function param(index: number, name: string, nsList?: Ixmlns[]): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
```

## Add a request method

Add `xmlns` for the method. If there is no, we inherit namespaces from envelope.

Add `axiosConfigForMethod` for the method, we will combine axios config with which was defined on the class. Maybe the request headers, url or other other options of the method might be different. We just override it here.

Add `param` for the method. And it should be matched with actual paramters.

``` typescript
class ExampleService extends SoapService {

  /**
   * @param firstParam the first parameter
   * @param secondParam  the second parameter
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

# Example 1

example-service.ts

``` typescript
import {
  axiosConfig, axiosConfigForMethod, xmlns,
  envelope, param, NsType, SoapService
} from "another-soap"


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
   * @param RequestHeader the one of parameters of header section
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
   * 
   * @param firstParam the first parameter
   * @param secondParam  the second parameter
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


  @xmlns([{ ns: "xmlns", nsUrl: "https://www.google.com/apis/ads/publisher/v202011", nsType: NsType.Namespace }])
  @axiosConfigForMethod({ method: "POST", url: "https://webservicesample.com/sample.svc/getAnother" })
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

# Example 2

weather-service.ts

``` typescript
import {
  axiosConfig, axiosConfigForMethod, envelope,
 xmlns, NsType, SoapService
} from "another-soap"

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

# Check the request XML

We can check the compiled xml after calling the method `console.log(weatherService.requestXml)`

# MIT License

Copyright (c) 2020 Stony Chen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
