import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fetch from "node-fetch";

morgan('tiny')

// dotenv
import dotenv from 'dotenv'
dotenv.config(
    {
        path: './.env.local'
    }

)

const app = express()

app.use(morgan('tiny'))
app.use(cors())
// read json body
app.use(json())

// get all the restaurants
app.get('/api/burgers', async (req, res) => {
    let sub = req.headers['sub']
    // change all | to _ in the sub
    sub = sub.replace(/\|/g, '_')
    const url = `${process.env.ASTRA_DB_URL}/${sub}?page-size=20`
    const options = {
        headers: {
            'X-Cassandra-Token': process.env.ASTRA_DB_APPLICATION_TOKEN,
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        res.json(data)
    }
    catch (err) {
        console.error(err)
    }


})

const convertSub = (req) => {
    let sub = req.headers['sub']
    // change all | to _ in the sub
    sub = sub.replace(/\|/g, '_')
    return sub
}

// get a single restaurant
app.get('/api/burgers/:id', (req, res) => {
    const { id } = req.params

    const url = `${process.env.ASTRA_DB_URL}/${convertSub(req)}/${id}`
    const options = {
        headers: {
            'X-Cassandra-Token': process.env.ASTRA_DB_APPLICATION_TOKEN,
            'Content-Type': 'application/json'
        }
    }
    fetch(url, options)
        .then(response => {
            if (response.status === 404) {
                return null
            } else {
                return response.json()
            }
        })
        .then(data => res.json(data))
        .catch(err => console.error(err))
})

// create a restaurant
app.post('/api/burgers', (req, res) => {

    const url = `${process.env.ASTRA_DB_URL}/${convertSub(req)}`
    const options = {
        method: 'POST',
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

// update a restaurant
app.patch('/api/burgers/:id', (req, res) => {
    const { id } = req.params
    const url = `${process.env.ASTRA_DB_URL}/${convertSub(req)}/${id}`
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

// delete a restaurant
app.delete('/api/burgers/:id', (req, res) => {
    const { id } = req.params
    const url = `${process.env.ASTRA_DB_URL}/${convertSub(req)}/${id}`
    const options = {
        method: 'DELETE',
        headers: {
            'X-Cassandra-Token': process.env.ASTRA_DB_APPLICATION_TOKEN,
            'Content-Type': 'application/json'
        }
    }
    fetch(url, options)
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

const SERVER_PORT = process.env.SERVER_PORT
app.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT}`)
})