require('dotenv').load()
const app = require('express')()

const parse = require('./cloud/server.js')
const api = require('./api')

app.use('/parse', parse)
app.use('/data', api)
app.listen(8080, () => console.log('online'))

