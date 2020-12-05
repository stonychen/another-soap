import "reflect-metadata"
import axios, { AxiosRequestConfig } from "axios"
import { xml2json } from "another-xml2json"
import {
  Protocol, AxiosConfig,
  XmlnsForCls,
  XmlnsForMethod,
  XmlnsForParameters,
  IXmlns, IXmlnsForParameters,
  NsType,
  getXmlns, getXmlnsForParameters, getAxiosConfig
} from "./def"

/**
 * The most easiest Soap Service for node.js
 */
@Protocol(`<?xml version="1.0" encoding="UTF-8"?>`)
class SoapService {

  private header: any[] = []
  private headerXmlnsList: IXmlnsForParameters[] = []

  private body: any[] = []

  private protocol: string = ""
  private axiosConfig: AxiosRequestConfig = {}

  private nsList: IXmlns[] = []

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
      this.protocol = (this as any)._protocol
      this.nsList = (this as any)._nsList
      this.axiosConfig = (this as any)._axiosConfig
      this._reflectOnce = true
    }

    if (!this._flag[method]) {
      const methodNs = getXmlns(this, method)
      const paramNsList = getXmlnsForParameters(this, method)
      let axiosConfigMethod = getAxiosConfig(this, method)

      axiosConfigMethod = Object.assign(axiosConfigMethod, this.axiosConfig)

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
    const requestXml = this.toXml(method)

    console.log(requestXml)
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


  private buildNs(nsArr: IXmlns[]) {
    return nsArr.map(m => `${m.ns}="${m.nsUrl}"`).join(" ")
  }

  private toXml(method: string) {

    const strHeader = this.encapsulateSection("", this.header, this.headerXmlnsList, true)
    let strBody = this.encapsulateSection(method, this.body, this._flag[method].paramNsList)
    const nsStr = this.buildNs(this.nsList)

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
    return ""
  }

  private getNs(xmlns: IXmlns[], nsType: NsType): string {
    const tempNs = xmlns.filter(m => m.nsType === nsType)
    return tempNs.length > 0 ? tempNs[0].ns : ""
  }

  private get tem(): string {
    return this.getNs(this.nsList, NsType.Tem)
  }

  private get ns(): string {
    return this.getNs(this.nsList, NsType.Namespace)
  }

  private get arr(): string {
    return this.getNs(this.nsList, NsType.Array)
  }
  private get ent(): string {
    return this.getNs(this.nsList, NsType.EntityNS)
  }
}

export {
  AxiosConfig,
  AxiosConfigForCls,
  IXmlns,
  AxiosRequestConfig,
  XmlnsForCls,
  XmlnsForMethod,
  XmlnsForParameters,
  SoapService,
  NsType
}

