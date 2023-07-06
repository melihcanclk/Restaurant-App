const PORT = 8080
import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fetch from "node-fetch";

morgan('tiny')

// dotenv
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(morgan('tiny'))
app.use(cors())
// read json body
app.use(json())

// get all the restaurants
app.get('/api/burgers', async (req, res) => {
    const url = `${process.env.ASTRA_DB_URL}/burger_info?page-size=20`
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
app.get('/api/burgers/:id', (req, res) => {
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

// create a restaurant
app.post('/api/burgers', (req, res) => {
    const url = `${process.env.ASTRA_DB_URL}/burger_info`
    const options = {
        method: 'POST',
        headers: {
            'X-Cassandra-Token': process.env.ASTRA_DB_APPLICATION_TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    }
    console.log(options.body)
    fetch(url, options)
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(err => console.error(err))
})

// update a restaurant
app.patch('/api/burgers/:id', (req, res) => {
    const { id } = req.params
    const url = `${process.env.ASTRA_DB_URL}/burger_info/${id}`
    const options = {
        method: 'PATCH',
        headers: {
            'X-Cassandra-Token': process.env.ASTRA_DB_APPLICATION_TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
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