const request = require('request');

const geoLocate = (locationName, callback) => {
    let locationNameReady = locationName.replace(/\s/g, '%20')
    let geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationNameReady}.json?access_token=pk.eyJ1IjoiZ2JhdGVtYW4iLCJhIjoiY2t6cmt2OWg2MGZkZzJwcDRseXd3YW51YiJ9.GvWW9eFtjWejfLYuleLYGg`
    
    request({url:geoURL, json:true}, (err, res) => {
        
        if (res.body.features.length != 0) {
            const location = res.body.features[0];
            callback(undefined,{
            long: location.center[0],
            lat: location.center[1],
            location: location.place_name
            })
            
        } else if (err) {
            callback(chalk.red.inverse('error in mapbox api'), undefined)
        }
    })
}

module.exports = geoLocate;