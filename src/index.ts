import "reflect-metadata"
import axios, { AxiosRequestConfig } from "axios"
import { xml2json } from "another-xml2json"

enum NsType {
  Namespace,
  EntityNS,
  XMLSchema,
  XMLSchemaInstance,
  Array,
  Tem,
  Undefined
}


function Xmlns(namespace: string, namespaceUrl: string, namespaceType: NsType = NsType.Undefined) {
  return Reflect.metadata("xmlns:" + Math.random(), {
    namespace,
    namespaceUrl,
    namespaceType
  })
}

function XmlnsForParameters(index: number, name: string, nsList: IXmlns[]) {
  return Reflect.metadata("xmlnsForParameters:" + Math.random(), {
    index,
    name,
    nsList
  })
}


interface IXmlns {
  ns: string
  nsUrl: string
  nsType?: NsType
}

function getXmlns(target: SoapService, propertyKey: string = ""): IXmlns[] {
  if (propertyKey) {
    return Reflect.getMetadataKeys(target, propertyKey)
      .filter(key => ("" + key).startsWith("xmlns:"))
      .map(key => {

        return Reflect.getMetadata(key, target, propertyKey)
      })
  } else {
    return Reflect.getMetadataKeys(target)
      .filter(key => ("" + key).startsWith("xmlns:"))
      .map(key => {

        return Reflect.getMetadata(key, target)
      })
  }
}

function getXmlnsForParameters(target: SoapService, propertyKey: string): IXmlns[] {
  return Reflect.getMetadataKeys(target, propertyKey)
    .filter(key => ("" + key).startsWith("xmlnsForParameters:"))
    .map(key => {

      return Reflect.getMetadata(key, target, propertyKey)
    })
}


function Protocol(val: string) {
  return <T extends SoapService>(constructor: new () => T): new () => T => {
    constructor.prototype.protocol = val
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



/**
 * The most easiest Soap Service for node.js
 */
@Protocol(`<?xml version="1.0" encoding="UTF-8"?>`)
class SoapService {

  /**
   * envelope is used for override, and put namespaces
   */
  public envelope = null

  private header: any[] = []
  private headerXmlnsList: IXmlns[] = []

  private body: any[] = []
  private bodyXmlnsList: IXmlns[] = []

  private _protocol: string = ""
  private _envNs: IXmlns[] = []

  private _method: any = {}
  private _axiosConfig: AxiosRequestConfig = {}

  private _parseFlag: any = {}

  private reflect(method: string) {
    if (!this._parseFlag.$__) {
      this._protocol = (this as any).protocol
      this._envNs = getXmlns(this, "envelope")
      this._axiosConfig = getAxiosConfig(this)

      this._parseFlag.$__ = true
    }

    // let axiosConfig = getAxiosConfig(this) || {}
    if (!this._parseFlag[method]) {
      const xmlns = getXmlns(this, method)
      let axiosConfigMethod = getAxiosConfig(this, method)
      axiosConfigMethod = Object.assign(axiosConfigMethod, this._axiosConfig)

      this._parseFlag[method] = {
        xmlns,
        axiosConfigMethod
      }
    }
  }

  /**
   * Used fot setup header for XML header
   * @param parameters the parameters of the XML header 
   */
  public setHeader(...parameters: any[]) {
    const nsList = getXmlnsForParameters(this, "setHeader")
    this.header = parameters
    this.headerXmlnsList = nsList
    return this
  }

  /**
   * 
   * @param method the name of the request action under XML Body, like "GetData" 
   * @param parameters the parameters of the method
   */
  public request(method: string, ...parameters: any[]) {
    const nsList = getXmlnsForParameters(this, method)
    this.bodyXmlnsList = nsList
    this.body = parameters
    this.reflect(method)

    console.log("nsList", nsList)

    const requestXml = ""

    return new Promise((resolve, reject) => {
      resolve("success")
    })

    // return new Promise((resolve, reject) => {
    //   axios.request(
    //     {
    //       ...axiosConfig,
    //       data: requestXml
    //     }).then(res => {
    //       resolve(xml2json(res.data, {
    //         escape: true,
    //       }))
    //     }).catch(err => {
    //       reject("Fail")
    //     })
    // })

  }
}

export {
  AxiosConfig,
  IXmlns,
  AxiosRequestConfig,
  Xmlns,
  XmlnsForParameters,
  SoapService,
  NsType
}

