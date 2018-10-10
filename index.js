const express = require('express')
const { join } = require('path')

const IN_PRODUCTION = process.env.NODE_ENV === 'production'
if (!IN_PRODUCTION) require('dotenv').load()

const {
  LOCAL_URL,
  SERVER_URL,
  API_ROUTE,
  IMAGE_ROUTE,
  PORT
} = process.env

const URL = IN_PRODUCTION ? SERVER_URL : LOCAL_URL + ':' + PORT

const app = express()
const paragone = require('./src/api/v1')

app.set('json spaces', 2)

app.use(API_ROUTE, paragone)
app.use(IMAGE_ROUTE, express.static(join(__dirname, 'images')))

app.listen(3000, () => console.log(`ONLINE AT ${URL}\nAPI ${URL + API_ROUTE}\nIMAGES AT ${URL + IMAGE_ROUTE}`))
