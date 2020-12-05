import "reflect-metadata"
import { AxiosRequestConfig } from "axios"

enum NsType {
  Namespace,
  EntityNS,
  XMLSchema,
  XMLSchemaInstance,
  Array,
  Tem,
  Undefined
}

interface IXmlns {
  ns: string
  nsUrl: string
  nsType?: NsType
}
interface IXmlnsForParameters {
  index: number,
  name: string,
  Nss: IXmlns[]
}
function XmlnsForCls(nsList: IXmlns[]) {
  return <T>(constructor: new () => T): new () => T => {
    constructor.prototype._nsList = nsList
    return constructor
  }
}

function AxiosConfigForCls(config: AxiosRequestConfig[]) {
  return <T>(constructor: new () => T): new () => T => {
    constructor.prototype._axiosConfig = config
    return constructor
  }
}

function XmlnsForMethod(nsList: IXmlns[]) {
  return Reflect.metadata("xmlns:" + Math.random(), nsList)
}


function getXmlns(target: any, propertyKey: string): IXmlns[] {
  return Reflect.getMetadataKeys(target, propertyKey)
    .filter(key => ("" + key).startsWith("xmlns:"))
    .map(key => {

      return Reflect.getMetadata(key, target, propertyKey)
    })
}

function XmlnsForParameters(index: number, name: string, nsList: IXmlns[]) {
  return Reflect.metadata("xmlnsForParameters:" + Math.random(), {
    index,
    name,
    nsList
  })
}

function getXmlnsForParameters(target: any, propertyKey: string): IXmlnsForParameters[] {
  return Reflect.getMetadataKeys(target, propertyKey)
    .filter(key => ("" + key).startsWith("xmlnsForParameters:"))
    .map(key => {

      return Reflect.getMetadata(key, target, propertyKey)
    })
}


function Protocol(val: string) {
  return <T>(constructor: new () => T): new () => T => {
    constructor.prototype._protocol = val
    return constructor
  }
}


const AxiosConfigKey = "AxiosConfigKey"

function AxiosConfig(config: AxiosRequestConfig = {}) {
  return Reflect.metadata(AxiosConfigKey, config)
}

function getAxiosConfig(target: any, propertyKey: string = "") {
  if (propertyKey)
    return Reflect.getMetadata(AxiosConfigKey, target, propertyKey) as AxiosRequestConfig
  else {
    return Reflect.getMetadata(AxiosConfigKey, target) as AxiosRequestConfig
  }
}



export {
  Protocol,
  AxiosConfig,
  AxiosConfigForCls,
  XmlnsForMethod,
  XmlnsForCls,
  XmlnsForParameters,
  IXmlns,
  IXmlnsForParameters,
  NsType,
  getXmlns,
  getXmlnsForParameters,
  getAxiosConfig
}

