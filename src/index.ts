import "reflect-metadata"
import axios, { AxiosRequestConfig } from "axios"
import { xml2json } from "another-xml2json"

enum NamespaceType {
  Envelope,
  Tem,
  EntityNS,
  XMLSchema,
  XMLSchemaInstance,
  Undefined
}


function Xmlns(namespace: string, namespaceUrl: string, namespaceType: NamespaceType = NamespaceType.Undefined) {
  return Reflect.metadata("xmlns" + Math.random(), {
    namespace,
    namespaceUrl,
    namespaceType
  })
}
function getXmlns(target: any, propertyKey: string) {
  return Reflect.getMetadataKeys(target, propertyKey)
    .filter(key => ("" + key).startsWith("xmlns"))
    .map(key => {

      return Reflect.getMetadata(key, target, propertyKey)
    })
}

function getXmlnsOfObject(target: any) {

  console.log(Reflect.getMetadataKeys(target))

  return Reflect.getMetadataKeys(target)
    .filter(key => ("" + key).startsWith("xmlns"))
    .map(key => {

      return Reflect.getMetadata(key, target)
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




@Protocol(`<?xml version="1.0" encoding="UTF-8"?>`)
class SoapService {
  public envelope = null

  public header: any = []

  public body: any[] = []

  public request(method: string) {
    // const protocolTmp = (this as any).protocol
    // const envNss = getXmlns(this, "envelope")
    // const headerNss = getXmlns(this, "header")
    // const bodyNss = getXmlns(this, "body")
    // const methodNss = getXmlns(this, method)
    // const axiosConfigMethod = getAxiosConfig(this, method)
    // let axiosConfig = getAxiosConfig(this) || {}
    // axiosConfig = Object.assign(axiosConfig, axiosConfigMethod)

    const bodyEntNss = this.body.map(ent => {
      console.log(ent)
      return getXmlnsOfObject(ent)
    })

    // console.log("protocol", protocolTmp)
    // console.log("envNss", envNss)
    // console.log("headerNss", headerNss)
    // console.log("bodyNss", bodyNss)
    // console.log("methodNss", methodNss)
    // console.log("requestMethod", requestMethod)
    console.log("bodyEntNss", bodyEntNss)

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
  AxiosRequestConfig,
  Xmlns,
  SoapService,
  NamespaceType
}

