require('dotenv').load()
const path = require('path')
const app = require('express')()
const ParseServer = require('parse-server').ParseServer
const ParseDashboard = require('parse-dashboard')
process.env.inProduction = process.env.NODE_ENV === 'production'

const server = new ParseServer({
  databaseURI: process.env.PARSE_DATABASE_URI,
  appId: process.env.PARSE_APP_ID,
  masterKey: process.env.PARSE_MASTER_KEY,
  serverURL: process.env.inProduction === true ? process.env.SERVER_URL + '/parse' : process.env.LOCAL_URL + '/parse',
  cloud: path.resolve(__dirname, './cloud/main.js')
})

const dashboard = new ParseDashboard({
  apps: [
    {
      appName: 'ParagoneAPI-local',
      appId: process.env.PARSE_APP_ID,
      serverURL: process.env.PARSE_LOCAL_URL,
      masterKey: process.env.PARSE_MASTER_KEY,
      primaryBackgroundColor: '#575757'
    },
    {
      appName: 'ParagoneAPI-host',
      appId: process.env.PARSE_APP_ID,
      serverURL: process.env.PARSE_SERVER_URL,
      masterKey: process.env.PARSE_MASTER_KEY,
      production: true,
      primaryBackgroundColor: '#177587'
    }
  ],
  users: [
    {
      user: process.env.PARSE_USER,
      pass: process.env.PARSE_PASS
    }
  ]
})

const api = require('./api')

app.use('/v1/parse', server)
app.use('/v1/dashboard', dashboard)
app.use('/v1', api)
app.listen(3000, () => console.log(`ONLINE AT ${process.env.inProduction === true ? process.env.SERVER_URL : process.env.LOCAL_URL}`))
