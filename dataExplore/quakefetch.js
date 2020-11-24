const fetch = require('node-fetch');
const moment = require('moment');

const url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02";

fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(quakeData) {
        const quake = quakeData.features[0];

        const timeStamp = quake.properties.time
        const dateString = moment(timeStamp).format( "MMMM Do, YYYY [at] HH:mm:SS" )

        const customData = {
            magnitude: quake.properties.mag,
            location: quake.properties.place,
            when: dateString,
            time: quake.properties.time,
            id: quake.properties.ids
        }
        console.log(customData);
    });
