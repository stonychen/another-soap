import ExampleService from "./example-service"

const newService = new ExampleService().setHeader({
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
