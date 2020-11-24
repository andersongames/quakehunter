const { RESTDataSource } = require('apollo-datasource-rest');
const moment = require('moment');

class QuakeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://earthquake.usgs.gov/fdsnws/event/1/';
  }

  async getAllQuakes() {
    const query = "/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02";
    const response = await this.get(query);
    return Array.isArray(response.features)
      ? response.features.map(quake => this.quakeReducer(quake))
      : [];
  }

  quakeReducer(quake) {
    const timeStamp = quake.properties.time
    const dateString = moment(timeStamp).format( "MMMM Do, YYYY [at] HH:mm:SS" );

    return {
        magnitude: quake.properties.mag,
        location: quake.properties.place,
        when: dateString,
        time: quake.properties.time,
        id: quake.properties.ids
    };
  }
}

module.exports = QuakeAPI;
