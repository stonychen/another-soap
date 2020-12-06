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


interface IParameter {
  index: number,
  name: string,
  nsList: IXmlns[]
}
function Envelope(nsList: IXmlns[]) {
  return <T>(constructor: new () => T): new () => T => {
    constructor.prototype._nsList = nsList
    return constructor
  }
}

function AxiosConfig(config: AxiosRequestConfig) {
  return <T>(constructor: new () => T): new () => T => {
    constructor.prototype._axiosConfig = config
    return constructor
  }
}

function Xmlns(nsList: IXmlns[]) {
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
 * @param name the name of the parameters, it will be compiled into request XML
 * @param nsList the xmlns definition
 */
function Parameter(index: number, name: string, nsList: IXmlns[] = []) {
  return Reflect.metadata("Parameter:" + Math.random(), {
    index,
    name,
    nsList
  })
}

function getParameter(target: any, propertyKey: string): IParameter[] {
  return Reflect.getMetadataKeys(target, propertyKey)
    .filter(key => ("" + key).startsWith("Parameter:"))
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

function AxiosConfigForMethod(config: AxiosRequestConfig = {}) {
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
  AxiosConfigForMethod,
  Xmlns,
  Envelope,
  Parameter,
  IXmlns,
  IParameter,
  NsType,
  getXmlns,
  getParameter,
  getAxiosConfig
}

