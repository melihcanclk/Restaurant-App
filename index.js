const PORT=8080
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const fetch = require("node-fetch");

morgan('tiny')

require('dotenv').config()

const app = express()

app.use(morgan('tiny'))
app.use(cors())
// read json body
app.use(express.json())

// get all the restaurants
app.get('/api/burgers', async (req, res) => {
    const url = `${process.env.ASTRA_DB_URL}/burger_info`
    const options = {
        headers: {
            'X-Cassandra-Token': process.env.ASTRA_DB_APPLICATION_TOKEN,
            'Content-Type': 'application/json'
        }
    }
    fetch(url, options)
        .then(response => response.json())  
        .then(data => res.json(data))
        .catch(err => console.error(err))

})

// get a single restaurant
app.get('/api/burgers/:id', async (req, res) => {
    const { id } = req.params
    const url = `${process.env.ASTRA_DB_URL}/burger_info/${id}`
    const options = {
        headers: {
            'X-Cassandra-Token': process.env.ASTRA_DB_APPLICATION_TOKEN,
            'Content-Type': 'application/json'
        }
    }
    fetch(url, options) 
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(err => console.error(err))
})

// errors
app.use((req, res, next) => {
    const error = new Error('Not found')
    res.status(404)
    next(error)
})

// error handler
app.use((error, req, res, next) => {
    res.status(res.statusCode || 500)
    res.json({
        message: error.message
    })
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
    })