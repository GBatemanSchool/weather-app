const request = require('request');
const chalk = require('chalk')

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5577615f8bb129726a6909f74d12ed40&units=f&query=${latitude},${longitude}`
    
    request({url:url}, (err, res) => {
        if (res) {
            let body = JSON.parse(res.body)
            callback(undefined, {"name": body.location.name, "region": body.location.region, "temperature": body.current.temperature, "feelslike": body.current.feelslike, "description": body.current.weather_descriptions[0]})
        } else if (res.body.success === false) {
            callback(chalk.red.inverse('no real location found'), undefined)
        } else if (err) {
            callback(chalk.red.inverse('error in weatherstack api'), undefined)
        }
    
    })
    }

    module.exports = forecast