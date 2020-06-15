const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

// Set up static dir to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather ',
        name: 'Alex B'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alex B'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'Here will be some very helpful guidelines',
        title: 'Help Page',
        name: 'Alex B'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    forecast(req.query.address, (error, {description, temperature, precip, query} = {}) => {
        if (error) {
            return res.send({error})
        }
        res.send({
            address: req.query.address,
            description,
            temperature,
            precip,
            query
        })
    });
   
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: 'Help Page 404',
        errorMessage: 'Requested help page not found.',
        name: 'Alex B'
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: '404',
        errorMessage: '404 - Page not found',
        name: 'Alex B'
    })
})

app.listen(port , () => {
    console.log('Server is up on port ' + port )
})