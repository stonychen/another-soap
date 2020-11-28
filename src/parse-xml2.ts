import sample from './sample-xml'


class XmlNode {
  public $tag: string = ""
  public attrs: any = {}
  public selfCloseNode: boolean = true

  public isStart: boolean = true

  public children: Array<XmlNode> = []

  public content: string = ""
}

function parseXml(xml: string) {
  const stack = []
  const matches = xml.match(/(<|<\/)[^<\>]+(>|\/\>)/ig) || []

  while (matches.length > 0) {
    const currNode = matches.shift() as string
    const xmlNode = new XmlNode()
    xmlNode.selfCloseNode = /^<.+(\/\>)$/.test(currNode)
    // xmlNode.$tag =

    stack.push(currNode)

    // release test
  }
}


parseXml(sample)
