require('dotenv').load()
const path = require('path')
const ParseServer = require('parse-server').ParseServer
const ParseDashboard = require('parse-dashboard')
const express = require('express')

const {
  NODE_ENV,
  SERVER_URL,
  LOCAL_URL,
  API_ROUTE,
  PARSE_ROUTE,
  DASH_ROUTE,
  PARSE_APP_ID,
  PARSE_DATABASE_URI,
  PARSE_MASTER_KEY,
  PARSE_USER,
  PARSE_PASS
} = process.env

const welcome = (URL) =>
  `
ONLINE AT ${URL}\n
API ${URL + API_ROUTE}\n
PARSE ${URL + PARSE_ROUTE}\n
DASHBOARD ${URL + DASH_ROUTE}
`

const IN_PRODUCTION = NODE_ENV === 'production'
const PARSE_SERVER_URL = SERVER_URL + PARSE_ROUTE
const PARSE_LOCAL_URL = LOCAL_URL + PARSE_ROUTE

const server = new ParseServer({
  databaseURI: PARSE_DATABASE_URI,
  appId: PARSE_APP_ID,
  masterKey: PARSE_MASTER_KEY,
  serverURL: IN_PRODUCTION ? PARSE_SERVER_URL : PARSE_LOCAL_URL,
  cloud: path.resolve(__dirname, './cloud/main.js')
})

const client = new ParseDashboard({
  apps: [
    {
      appName: 'ParagoneAPI-local',
      appId: PARSE_APP_ID,
      serverURL: PARSE_LOCAL_URL,
      masterKey: PARSE_MASTER_KEY,
      primaryBackgroundColor: '#575757'
    },
    {
      appName: 'ParagoneAPI-host',
      appId: PARSE_APP_ID,
      serverURL: PARSE_SERVER_URL,
      masterKey: PARSE_MASTER_KEY,
      production: true,
      primaryBackgroundColor: '#177587'
    }
  ],
  users: [
    {
      user: PARSE_USER,
      pass: PARSE_PASS
    }
  ]
})

const paragone = require('./src/api')

if (IN_PRODUCTION) {
  const URL = SERVER_URL
  const api = express()
  const parse = express()
  api.use('/', paragone)
  parse.use('/server', server)
  parse.use('/dash', client)
  api.listen(3000, () =>
    parse.listen(3010, () =>
      console.log(welcome(URL))
    )
  )
} else {
  const URL = LOCAL_URL
  const app = express()
  app.use(PARSE_ROUTE, server)
  app.use(DASH_ROUTE, client)
  app.use(API_ROUTE, paragone)
  app.listen(3000, () => console.log(welcome(URL)))
}
