require('dotenv').load()
const path = require('path')
const app = require('express')()
const ParseServer = require('parse-server').ParseServer

const server = new ParseServer({
  databaseURI: process.env.PARSE_DATABASE_URI,
  appId: process.env.PARSE_APP_ID,
  masterKey: process.env.PARSE_MASTER_KEY,
  serverURL: process.env.PARSE_SERVER_URL,
  cloud: path.resolve(__dirname, './cloud/main.js')
})

const api = require('./api')

app.use('/parse', server)
app.use('/data', api)
app.listen(6969, () => console.log('online'))

