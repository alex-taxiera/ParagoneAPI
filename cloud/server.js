const ParseServer = require('parse-server').ParseServer

const server = new ParseServer({
  databaseURI: process.env.PARSE_DATABASE_URI,
  appId: process.env.PARSE_APP_ID,
  masterKey: process.env.PARSE_MASTER_KEY,
  serverURL: process.env.PARSE_SERVER_URL
})

module.exports = server
