const sample = `<Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempurl.org/" xmlns:ent="http://schemas.datacontract.org/2004/07/ent.Entities" xmlns:arr="http://schemas.microsoft.com/2003/10/Serialization/Arrays">
  <Header dd="dd" />
  <Body>
    <GetData>
      <sessionId>XXXXX</sessionId>
      <requestData>
        <foo>foo</foo>
        <bar>bar&gt;</bar>
        <tata/>
        <bars>
          <arr:string>bar1</arr:string>
          <arr:string/>
        </bars>
        <numbers>
          <arr:number>1</arr:number>
          <arr:number>2</arr:number>
        </numbers>
        <booleans>
          <arr:boolean>true</arr:boolean>
          <arr:boolean>false</arr:boolean>
        </booleans>
        <cars>
          <car>
            <name>car1</name>
            <brand>Volkswagen</brand>
          </car>
          <car>
            <name>car2&lt;&gt;&amp;&quot;&apos;&lt;&gt;&amp;&quot;&apos;</name>
            <brand>BMW</brand>
          </car>
        </cars>
      </requestData>
    </GetData>
  </Body>
</Envelope>
`

export default sample
