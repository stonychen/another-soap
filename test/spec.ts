import SampleService from "./sample-service"

const newService = new SampleService().setHeader({
  networkCode: "networkCode",
  applicationName: "applicationName"
})

newService.getAdUnitsByStatement({ query: "" }, {}).then(res => {
  console.log(res)
})

newService.getAnother().then(res => {
  console.log(res)
})
