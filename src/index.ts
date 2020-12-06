import "reflect-metadata"
import axios, { AxiosRequestConfig } from "axios"
import { xml2json } from "another-xml2json"
import {
  Protocol,
  AxiosConfig, AxiosConfigForMethod,
  Envelope, Xmlns, Parameter,
  IXmlns, IParameter,
  NsType, getXmlns, getParameter, getAxiosConfig
} from "./def"

/**
 * The most easiest Soap Service for node.js
 */
@Protocol(`<?xml version="1.0" encoding="UTF-8"?>`)
class SoapService {

  private header: any[] = []
  private headerXmlnsList: IParameter[] = []

  private protocol: string = ""
  private axiosConfig: AxiosRequestConfig = {}

  private nsList: IXmlns[] = []

  private _reflectOnce = false

  private _requestXml: string = ""

  public get requestXml(): string {
    return this._requestXml
  }
  private _flag: {
    [index: string]: {
      nsList: IXmlns[],
      axiosConfigMethod: AxiosRequestConfig,
      paramNsList: IParameter[]
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
      const nsList = getXmlns(this, method)
      const paramNsList = getParameter(this, method)
      let axiosConfigMethod = getAxiosConfig(this, method)

      axiosConfigMethod = Object.assign(axiosConfigMethod, this.axiosConfig)

      this._flag[method] = {
        nsList,
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
    const nsList = getParameter(this, "setHeader")
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
    this.reflect(method)
    const requestXml = this.toXml(method, parameters)
    const axiosConfig = this._flag[method].axiosConfigMethod || {}
    const headers = axiosConfig.headers || {}
    if (!headers["Content-Type"]) {
      headers["Content-Type"] = "text/xml; charset=utf-8"
    }

    this._requestXml = requestXml

    const options: AxiosRequestConfig =
    {
      ...axiosConfig,
      headers,
      data: requestXml,
      transformResponse: [(res) => {
        if (res)
          return xml2json(res, {
            escape: true,
          })
        else
          return {}
      }]
    }

    return axios.request(options)
  }


  private buildNs(nsArr: IXmlns[]) {
    return nsArr.map(m => `${m.ns}="${m.nsUrl}"`).join(" ")
  }

  private toXml(method: string, parameters: any[]) {
    const strHeader = (this as any)._strHeader ? (this as any)._strHeader : this.buildSection(method, this.header, this.headerXmlnsList, true);
    (this as any)._strHeader = strHeader

    let strBody = this.buildSection(method, parameters, this._flag[method].paramNsList)
    const nsStr = this.buildNs(this.nsList)
    return `${this.protocol}<${this.ns}:Envelope ${nsStr}>${strHeader + strBody}</${this.ns}:Envelope>`
  }

  private buildSection(method: string, entities: any[], entNS: IParameter[], header: boolean = false) {
    let tag = header ? "Header" : "Body"
    tag = this.ns ? this.ns + ":" + tag : tag

    let inner = ""

    if (!header) {
      const strNS = this.buildNs(this._flag[method].nsList)
      const ns = this.getNs(this._flag[method].nsList, NsType.Namespace)

      let tempTem = this.tem ? this.tem + ":" : ""
      tempTem = ns ? ns + ":" : tempTem
      inner = this.encapsulateEntities(entities, entNS, tempTem)

      inner = entities.length === 0 ? `<${tempTem}${method} ${strNS}/>`
        : `<${tempTem}${method} ${strNS}>${inner}</${tempTem}${method}/>`

    } else {
      inner = this.encapsulateEntities(entities, entNS)

    }

    return header && entities.length === 0 ?
      `<${tag}/>` : `<${tag}>${inner}</${tag}>`
  }

  private encapsulateEntities(entities: any[], paramNSList: IParameter[], methodNs: string = "") {

    return entities.map((item, index) => {
      const paramNs = paramNSList.find(e => e.index === index)
      if (!paramNs)
        throw "Should config a namespace for the parameters."

      const ns = this.getNs(paramNs.nsList, NsType.Namespace)
      const name = paramNs?.name || ""

      let tempTem = this.tem ? this.tem : ""
      tempTem = methodNs ? methodNs : tempTem

      return this.generateXml("", "", name, item,
        ns ? "" + ns : this.ent,
        paramNs.nsList, tempTem)
    }).join("")

  }


  private generateXml(parentStart: string, parentEnd: string, nodeName: string,
    node: any, ns: string, nsList?: IXmlns[], tem?: string): string {

    let temNs = tem ? tem : ns
    temNs = temNs ? temNs + ":" : ""

    let nsStr = this.buildNs(nsList || [])
    nsStr = nsStr ? " " + nsStr : ""

    if (
      node === null ||
      node === undefined ||
      node === ""
    ) {
      const isNil = node === null ? ` i:nil="true"` : ""

      return nodeName
        ? `<${temNs}${nodeName}${isNil}/>`
        : `<${this.arr}:string/>`
    }

    if (typeof node === "object" && Array.isArray(node)) {
      const inner = node.map((item) => {
        return this.generateXml(parentStart, parentEnd, "", item, ns)
      }).join("")

      return inner
        ? `<${temNs}${nodeName}${nsStr}>${inner}</${temNs}${nodeName}>`
        : `</${temNs}${nodeName}${nsStr}>`

    } else if (typeof node === "object" && !Array.isArray(node)) {
      const inner = Object.getOwnPropertyNames(node).map((item) => {
        return this.generateXml(parentStart, parentEnd, item, node[item], ns)
      }).join("")


      if (nodeName) {
        return inner
          ? `<${temNs}${nodeName}${nsStr}>${inner}</${temNs}${nodeName}>`
          : `</${temNs}${nodeName}${nsStr}>`
      } else {
        return inner
      }


    } else {
      const val = typeof node === "string" ? node
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;') : node

      return nodeName
        ? `<${temNs}${nodeName}${nsStr}>${val}</${temNs}${nodeName}>`
        : `<${this.arr}:${typeof node}>${val}</${this.arr}:${typeof node}>`
    }
  }

  private getNs(xmlns: IXmlns[], nsType: NsType): string {
    const tempNs = xmlns.filter(m => m.nsType === nsType)
    const ns = tempNs.length > 0 ? tempNs[0].ns : ""

    return ns.replace(/xmlns/ig, "").replace(/:/ig, "")
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
  SoapService,
  Envelope,
  AxiosConfig,
  AxiosConfigForMethod,
  AxiosRequestConfig,
  IXmlns,
  Xmlns,
  Parameter,
  NsType
}

