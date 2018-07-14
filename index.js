require('dotenv').load()
const path = require('path')
const app = require('express')()
const ParseServer = require('parse-server').ParseServer
process.env.inProduction = process.env.NODE_ENV === 'production'

const server = new ParseServer({
  databaseURI: process.env.PARSE_DATABASE_URI,
  appId: process.env.PARSE_APP_ID,
  masterKey: process.env.PARSE_MASTER_KEY,
  serverURL: process.env.inProduction === true ? process.env.PARSE_SERVER_URL : process.env.PARSE_LOCAL_URL,
  cloud: path.resolve(__dirname, './cloud/main.js')
})

const api = require('./api')

app.use('/parse', server)
app.use('/data', api)
app.listen(3000, () => console.log('online'))
