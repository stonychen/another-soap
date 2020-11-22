import SoapEntity from './soap-entity'

export default class AnotherSoap {
  public firstLine = `<?xml version="1.0" encoding="UTF-8" ?>`
  public env: string = "soapenv";
  public envUrl: string = "http://schemas.xmlsoap.org/soap/envelope/";

  public tem: string = "tem";
  private _temUrl: string = ""

  set temUrl(val: string) {
    this._temUrl = val
  }

  get temUrl(): string {
    let url = this.tem ? "http://tempurl.org/" : ""
    return this._temUrl ? this._temUrl : url
  }

  public defaultEnt: string = "ent";
  get defaultEntUrl(): string {
    return this.defaultEnt ? `http://schemas.datacontract.org/2004/07/${this.defaultEnt}.Entities` : ""
  }

  public arr: string = "arr";
  public arrUrl: string = "http://schemas.microsoft.com/2003/10/Serialization/Arrays";

  public method: string = "GetData";
  public methodNs?: string = ""
  public methodNsUrl?: string = ""

  public headerEntities: Array<SoapEntity> = [];
  public bodyEntities: Array<SoapEntity> = [];

  public customNamespaces: string = ""

  public toXML() {
    const strHeader = this.encapsulateHeader()
    const strBody = this.encapsulateBody()

    return this.firstLine + this.encapsulateEnvelope(strHeader + strBody)
  }

  private encapsulateEnvelope(inner: string) {
    const strEnv = this.env ? `xmlns:${this.env}="${this.envUrl}"  ` : ""
    const strTem = this.tem ? `xmlns:${this.tem}="${this.temUrl}" ` : ""
    const strEntities = this.defaultEnt ? `xmlns:${this.defaultEnt}="${this.defaultEntUrl}" ` : ""
    const strArr = this.env ? ` xmlns:${this.arr}="${this.arrUrl}"  ` : ""

    return `<${this.env}:Envelope ${strEnv} ${strTem} ${strEntities} ${this.customNamespaces} ${strArr}>${inner}</${this.env}:Envelope>`
  }

  private encapsulateHeader() {
    if (this.headerEntities.length === 0) {
      return `<${this.env}:Header/>`

    } else {
      const inner = this.encapsulateEntity(this.headerEntities)
      return `<${this.env}:Header>${inner}</${this.env}:Header>`

    }
  }
  private encapsulateBody() {
    let inner: string = this.encapsulateEntity(this.bodyEntities)
    let tempTem = this.tem ? this.tem + ":" : ""
    tempTem = this.methodNs ? this.methodNs + ":" : tempTem
    const decMethodNs = this.methodNs ? `xmlns:${this.methodNs}="${this.methodNsUrl}" ` : ""

    return `<${this.env}:Body><${tempTem}${this.method} ${decMethodNs}>${inner}</${tempTem}${this.method}></${this.env}:Body>`
  }
  private encapsulateEntity(entities: Array<SoapEntity>): string {
    let tempTem = this.tem ? this.tem : ""
    tempTem = this.methodNs ? this.methodNs : tempTem

    return entities.map(item => {
      return this.convert2xml("", "", item.name, item.object,
        item.ns ? "" + item.ns : this.defaultEnt,
        item.nsUrl, tempTem)
    }).join("")
  }

  private convert2xml(parentStart: string, parentEnd: string, nodeName: string,
    node: any, ns: string, nsUrl?: string, tem?: string,): string {
    let temNs = tem ? tem : ns
    temNs = temNs ? temNs + ":" : ""

    const decNs = nsUrl ? ` xmlns:${ns}="${nsUrl}" ` : ""

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
      const inner = (node as Array<any>).map((item) => {
        return this.convert2xml(parentStart, parentEnd, "", item, ns)
      }).join("")

      return inner
        ? `<${temNs}${nodeName}${decNs}>${inner}</${temNs}${nodeName}>`
        : `</${temNs}${nodeName}${decNs}>`

    } else if (typeof node === "object" && !Array.isArray(node)) {
      const inner = Object.getOwnPropertyNames(node).map((item) => {
        return this.convert2xml(parentStart, parentEnd, item, node[item], ns)
      }).join("")


      if (nodeName) {
        return inner
          ? `<${temNs}${nodeName}${decNs}>${inner}</${temNs}${nodeName}>`
          : `</${temNs}${nodeName}${decNs}>`
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
        ? `<${temNs}${nodeName}${decNs}>${val}</${temNs}${nodeName}>`
        : `<${this.arr}:${typeof node}>${val}</${this.arr}:${typeof node}>`
    }
  }

  private handleArrayChildren() { }
}

