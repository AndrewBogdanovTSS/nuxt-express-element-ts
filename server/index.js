import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'
import {Nuxt, Builder} from 'nuxt'
import {housesRouter} from './routes/houses.route'
import {houseRouter} from './routes/house.route'
import {usersRouter} from './routes/users.route'
import './helpers'
import './db'

const app = express()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

app.use(logger('dev'))

// Setting CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.send(200)
  }
  else {
    //move on
    next()
  }
})

app.options('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.send(200)
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))
app.use('/api/houses', housesRouter)
app.use('/api/house', houseRouter)
app.use('/api/users', usersRouter)

// Import and set Nuxt options
let config = require('../nuxt.config.js')
config.dev = config.dev || !(process.env.NODE_ENV === 'production')

// Init nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// This error check should go last, otherwise all requests will be blocked
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// This error check should go last, otherwise all requests will be blocked
app.use((err, req, res) => {
  res.status(err.status || 500)
  res.send(err.message)
})

// Listen the server
app.listen(port, host, (err) => {
  if (err) console.error(err.message) // eslint-disable-line no-console
  else console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
})
