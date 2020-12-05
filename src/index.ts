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

interface IXmlnsForParameters {
  index: number,
  name: string,
  Nss: IXmlns[]
}

function getXmlnsForParameters(target: SoapService, propertyKey: string): IXmlnsForParameters[] {
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

  private header: any[] = []
  private headerXmlnsList: IXmlnsForParameters[] = []

  private body: any[] = []

  private _protocol: string = ""

  private _xmlns: IXmlns[] = []
  private _axiosConfig: AxiosRequestConfig = {}

  private _reflectOnce = false
  private _flag: {
    [index: string]: {
      methodNs: IXmlns[],
      axiosConfigMethod: AxiosRequestConfig,
      paramNsList: IXmlnsForParameters[]
    }
  } = {}

  private reflect(method: string) {
    if (!this._reflectOnce) {
      this._protocol = (this as any).protocol
      this._xmlns = getXmlns(this)
      console.log('this._xmlns', this._xmlns)
      this._axiosConfig = getAxiosConfig(this)

      this._reflectOnce = true
    }

    // let axiosConfig = getAxiosConfig(this) || {}
    if (!this._flag[method]) {
      const methodNs = getXmlns(this, method)
      const paramNsList = getXmlnsForParameters(this, method)
      let axiosConfigMethod = getAxiosConfig(this, method)
      axiosConfigMethod = Object.assign(axiosConfigMethod, this._axiosConfig)


      this._flag[method] = {
        methodNs,
        axiosConfigMethod,
        paramNsList
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
    this.body = parameters
    this.reflect(method)


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

  public toXml() {



  }

  private buildNs(nsArr: IXmlns[]) {
    return nsArr.map(m => `${m.ns}="${m.nsUrl}"`).join(" ")
  }

  private encapsulateEnvelope(method: string) {

    const strHeader = this.encapsulateSection("", this.header, this.headerXmlnsList, true)
    let strBody = this.encapsulateSection(method, this.body, this._flag[method].paramNsList)
    const nsStr = this.buildNs(this._xmlns)

    return `<${this.ns}:Envelope ${nsStr}>${strHeader + strBody}</${this.ns}:Envelope>`
  }

  private encapsulateSection(method: string, entities: any[], entNS: IXmlnsForParameters[], header: boolean = false) {
    let tag = header ? "Header" : "Body"
    tag = this.ns ? this.ns + ":" + tag : tag

    let inner = ""

    if (!header) {
      const strNS = this.buildNs(this._flag[method].methodNs)
      const ns = this.getNs(this._flag[method].methodNs, NsType.Tem)

      let tempTem = this.tem ? this.tem + ":" : ""
      tempTem = ns ? ns + ":" : tempTem
      inner = this.encapsulateEnt(entities, entNS)

      inner = entities.length === 0 ? `<${tempTem}${method} ${strNS}/>`
        : `<${tempTem}${method} ${strNS}>${inner}</${tempTem}${method} ${strNS}/>`

    } else {
      inner = this.encapsulateEnt(entities, entNS)

    }

    return header && entities.length === 0 ?
      `<${tag}/>` : `<${tag}>${inner}</${tag}>`

  }
  private encapsulateEnt(ent: any[], entNS: IXmlnsForParameters[]) {

  }

  private getNs(xmlns: IXmlns[], nsType: NsType): string {
    const tempNs = xmlns.filter(m => m.nsType === nsType)
    return tempNs.length > 0 ? tempNs[0].ns : ""
  }

  private get tem(): string {
    return this.getNs(this._xmlns, NsType.Tem)
  }

  private get ns(): string {
    return this.getNs(this._xmlns, NsType.Namespace)
  }

  private get arr(): string {
    return this.getNs(this._xmlns, NsType.Array)
  }
  private get ent(): string {
    return this.getNs(this._xmlns, NsType.EntityNS)
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

