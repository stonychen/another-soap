import WeatherService from "./weather-service"

const weatherService = new WeatherService()
weatherService.getRegionCountry().then(res => {
  console.log(res.data)
})


weatherService.getRegionDataset().then(res => {
  console.log(res.data)
})
