import SampleService from "./sample-service"

const newService = new SampleService().setHeader({
  networkCode: "networkCode",
  applicationName: "applicationName"
})

newService.GetAdUnitsByStatement({
  queries: [
    {
      id: "1",
      name: "san"
    }
  ],
  uuid: "uuid"
}, "").then(res => {
  console.log(res)
})

newService.GetAnother().then(res => {
  console.log(res)
})
