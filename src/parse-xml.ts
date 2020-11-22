// @ts-ignore
import JSSoup from 'jssoup'

function escape(val: string) {
  return val.replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, '\'')
}
function translateNode(content: any, obj: any) {
  //console.log(content.name, content._text)
  if (content.name === undefined) {
    return escape(content._text)
  }



  obj[content.name] = {}

  const firstChildName = content.contents && content.contents[0]
    && (content.contents[0].name + "" as string).indexOf("arr:") === 0
    ? content.contents[0].name : ""


  if (firstChildName) {
    obj[content.name] = content.contents.map((item: any) => {
      const val = item.contents.length > 0 ? item.contents[0]._text : null

      switch (firstChildName) {
        case "arr:string": {
          return val ? escape(val) : ""
          break
        }
        case "arr:number": {
          return Number(val)
          break
        }
        case "arr:boolean": {
          return ("" + val).toLowerCase() === 'true'
          break
        }
        default: {
          return val
          break
        }
      }
    })

  } else if (content.contents.length > 0) {
    content.contents.map((item: any) => {
      const res = translateNode(item, obj[content.name])
      if (res !== undefined) {
        obj[content.name] = res
      }
    })
  } else {
    obj[content.name] = (Object.getOwnPropertyNames(content.attrs) as Array<string>)
      .filter(name => /nil="true"/ig.test(content.attrs[name])) ? null : ""
  }

}

const parseXml = (xml: string): any => {
  xml = xml.replace(/<arr:/ig, "&ARRAYS;")
    .replace(/<\/arr:/ig, "&ARRAYE;")
    .replace(/<[\w]+:/ig, '<')
    .replace(/<\/[\w]+:/ig, '</')
    .replace(/<\?[\S\s]+\?\>/ig, '')
    .replace(/&ARRAYS;/ig, "<arr:")
    .replace(/&ARRAYE;/ig, "</arr:")
  const soup = new JSSoup(xml)

  console.log(xml)
  let obj = {}
  translateNode(soup.contents[0], obj)


  console.log(JSON.stringify(obj))
}



export default parseXml
