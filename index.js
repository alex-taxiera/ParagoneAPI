const express = require('express')
const enforce = require('express-sslify')

const IN_PRODUCTION = process.env.NODE_ENV === 'production'
if (!IN_PRODUCTION) require('dotenv').load()

const {
  LOCAL_URL,
  SERVER_URL,
  API_ROUTE,
  PORT
} = process.env

const URL = IN_PRODUCTION ? SERVER_URL : LOCAL_URL + ':' + PORT

const app = express()
const paragone = require('./src/api/v1')

app.use(enforce.HTTPS({ trustProtoHeader: true }))
app.set('json spaces', 2)

app.use(API_ROUTE, paragone)

app.listen(PORT, () => console.log(`ONLINE AT ${URL}\nAPI ${URL + API_ROUTE}`))
