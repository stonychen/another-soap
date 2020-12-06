import 'mocha'
import should from 'should'

import WeatherService from "./weather-service"

const weatherService = new WeatherService()

describe('request test', function () {
  it('request getRegionCountry', function () {
    weatherService.getRegionCountry().then(res => {
      should(res.data.ArrayOfString.length).be.greaterThan(0)
    })
  })

  it('Request getRegionDataset', function () {
    weatherService.getRegionDataset().then(res => {
      should(!!res.data.DataSet).be.equal(true)
    })
  })
})
