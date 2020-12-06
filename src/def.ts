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


interface IParam {
  index: number,
  name: string,
  nsList: IXmlns[]
}
function envelope(nsList: IXmlns[]) {
  return <T>(constructor: new () => T): new () => T => {
    constructor.prototype._nsList = nsList
    return constructor
  }
}

function axiosConfig(config: AxiosRequestConfig) {
  return <T>(constructor: new () => T): new () => T => {
    constructor.prototype._axiosConfig = config
    return constructor
  }
}

function xmlns(nsList: IXmlns[]) {
  return Reflect.metadata("xmlns:" + Math.random(), nsList)
}


function getXmlns(target: any, propertyKey: string): IXmlns[] {
  const lists = Reflect.getMetadataKeys(target, propertyKey)
    .filter(key => ("" + key).startsWith("xmlns:"))
    .map(key => {

      return Reflect.getMetadata(key, target, propertyKey)
    })
  return lists.length > 0 ? lists[0] : []
}

/**
 * 
 * @param index the sequence of the paramters
 * @param name the name of the params, it will be compiled into request XML
 * @param nsList the xmlns definition
 */
function param(index: number, name: string, nsList: IXmlns[] = []) {
  return Reflect.metadata("param:" + Math.random(), {
    index,
    name,
    nsList
  })
}

function getParam(target: any, propertyKey: string): IParam[] {
  return Reflect.getMetadataKeys(target, propertyKey)
    .filter(key => ("" + key).startsWith("param:"))
    .map(key => {

      return Reflect.getMetadata(key, target, propertyKey)
    })
}


function protocol(val: string) {
  return <T>(constructor: new () => T): new () => T => {
    constructor.prototype._protocol = val
    return constructor
  }
}


const axiosConfigKey = "axiosConfigKey"

function axiosConfigForMethod(config: AxiosRequestConfig = {}) {
  return Reflect.metadata(axiosConfigKey, config)
}

function getAxiosConfig(target: any, propertyKey: string = "") {
  if (propertyKey)
    return Reflect.getMetadata(axiosConfigKey, target, propertyKey) as AxiosRequestConfig
  else {
    return Reflect.getMetadata(axiosConfigKey, target) as AxiosRequestConfig
  }
}



export {
  protocol,
  axiosConfig,
  axiosConfigForMethod,
  xmlns,
  envelope,
  param,
  IXmlns,
  IParam,
  NsType,
  getXmlns,
  getParam,
  getAxiosConfig
}

