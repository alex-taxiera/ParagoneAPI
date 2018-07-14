require('dotenv').load()
const app = require('express')()

const { server } = require('./cloud')
const api = require('./api')

app.use('/parse', server)
app.use('/data', api)
app.listen(8080, () => console.log('online'))

