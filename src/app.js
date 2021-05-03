const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast =require('./utils/forecast')
 
const app = express()
//const port=process.env.PORT || 3000

//define path for express config
const public_dir = path.join(__dirname, '../public')
const customviews = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//setup handlebars engines and views locations
app.set('view engine', 'hbs')
app.set('views', customviews)
hbs.registerPartials(partialspath)

//setup static directory to serve 
app.use(express.static(public_dir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ayush'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ayush'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ayush'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ayush',
        errormessage: 'Help article not found'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must Provide an Address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ayush',
        errormessage: 'Page not Found'
    })
})

// app.get('/help',(req,res)=>{
//     res.send('help page')
// })
// app.get('/about',(req,res)=>{
//     res.send('About')
// })






app.listen(3000, () => {
    console.log('server is up on port 3000')
})