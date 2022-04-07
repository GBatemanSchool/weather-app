//Modules
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoLocate = require('./utils/geolocate')

//Directories
const publicDir = path.join(__dirname, "../public")
const viewsDir = path.join(__dirname, "../templates/views")
const partialsDir = path.join(__dirname, "../templates/partials")

//Express App
const app = express()

//Current Year
d = new Date()
const year = d.getFullYear()

//Sets Views and Partials
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

//Set static directory
app.use(express.static(publicDir))

//Render Views
app.get('', (req, res) => {
     res.render('index',{
        title: 'The Cloud'
    })
})

    app.get('/about', (req, res) => {
        return res.send({
            title: 'About - The Cloud'
        })
    })

    app.get('/weather', (req, res) => {
        if (!req.query.location) {
            return res.send({
                error: "Location unknown"
            })
        } else {
            geoLocate(req.query.location, (error, {long, lat, location}) => {
                if (error) {
                    res.send({
                        error
                    })
                }
        
        
                forecast(long, lat, (error, forecastData) => {
                    if (error) {
                        return res.render({error
                        })
                    } else {
                        res.set('Content-Type', 'text/html');
                        res.send({
                            forecast: forecastData,
                            location: location
                        })
                    }
                })
            })
        }
    })

    app.get('*', (req, res) => {
        res.render('404', {
            title: 'Help - The Cloud',
            faq: 'Idk what to put here',
            year: year
        })
    })
//Starts Server
app.listen(3000, () => {

})