const { APIWrapper } = require('../')
const axios = require('axios')

const API_URL = 'https://disease.sh/v3/covid-19'

module.exports = class Covid19 extends APIWrapper {
  constructor () {
    super({
      name: 'covid'
    })
  }

  async getCountry (country) {
    return this.request('countries', country)
  }

  async getWorldwide () {
    return this.request('all')
  }

  async getContinent (continents) {
    return this.request('continents', continents)
  }

  async getState (state) {
    return this.request('states', state)
  }

  async getWorldwideVaccinated () {
    return this.request('vaccine/coverage', '', { lastdays: 1 })
  }

  async getCountryVaccinated (country) {
    return this.request('vaccine/coverage/countries', country)
  }

  async getStateVaccinated () {
    return this.request('vaccine/coverage/states/state')
  }

  request (endpoint, query = '', queryParams) {
    const qParams = new URLSearchParams(queryParams)
    return axios.get(encodeURI(`${API_URL}/${endpoint}/${query}?${qParams.toString()}`)).then(res => res.data)
  }
}
