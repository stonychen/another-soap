import { xml2json } from 'another-xml2json'
import { XmlDef } from './xml-def'
import axios from 'axios'

class Soap {
  public xmlDef: XmlDef = new XmlDef()
  public arrayNodes: RegExp[] = []
  public escape: boolean = true

  public post(url: string, headers = {}, options = {}) {
    return this.request(url, "post", headers, options)
  }
  public get(url: string, headers = {}, options = {}) {
    return this.request(url, "get", headers, options)
  }
  public delete(url: string, headers = {}, options = {}) {
    return this.request(url, "delete", headers, options)
  }
  public put(url: string, headers = {}, options = {}) {
    return this.request(url, "put", headers, options)
  }
  public request(url: string, method: 'post' | 'get' | 'delete' | 'put', headers = {}, options = {}) {
    const xml = this.xmlDef.toXML()
    return new Promise((resolve, reject) => {
      return axios(
        {
          url,
          method,
          ...options,
          headers: {
            "Content-Type": "text/xml; charset=utf-8",
            ...(options as any).headers,
            ...headers,
          },
          data: xml
        }
      ).then(res => {
        return resolve(xml2json(res.data, {
          escape: this.escape,
          arrayNodes: this.arrayNodes
        }).Envelope.Body)
      }).catch(err => reject)
    })
  }
}

export default Soap


