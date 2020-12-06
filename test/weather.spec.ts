import 'mocha'
import should from 'should'
import WeatherService from "./weather-service"

const weatherService = new WeatherService()

describe('Weather request', () => {

  it('request getRegionCountry', async () => {

    const res = await weatherService.getRegionCountry()
    should(res.data.ArrayOfString.length).be.greaterThan(0)
  })

  it('Request getRegionDataset', async function () {

    const res = await weatherService.getRegionDataset()
    should(!!res.data.DataSet).be.equal(true)
  })


})
