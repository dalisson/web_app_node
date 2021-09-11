const path = require('path')
const express = require('express')
const hbs = require('hbs')

//forecast functions
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//templating paths
const myPath = path.join(__dirname, 'public')
const viewsPath = path.join(myPath, 'templates/views')
const partialsPaths = path.join(myPath, 'templates/partials')


const app = express()


//setting views and patials
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPaths)

app.use(express.static(myPath))

//routs

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather app',
        name : 'Dalisson Figueiredo'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'help page',
        message : 'message text'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'about page',
        message : 'made by me',
        name :"Dalisson Figueiredo"
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        console.log('provide address')
        return res.send({error: "must provide address"})
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) =>{
        if(error){
            console.log('error retrieving geocode')
            return res.send({error: 'address error'})
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                console.log('error retrieving forecast')
                return res.send({error: 'forecast error'})
            }
            res.send({location: location, forecast: forecastData})
        })
    })
})

app.get('*', (req, res)=>{
    res.render('404')

})

port = 3000
app.listen(port, ()=>{
    console.log('server running on port %d.', port)
})