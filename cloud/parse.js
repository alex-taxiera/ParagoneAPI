const Parse = require('parse/node')

Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_MASTER_KEY)
Parse.serverURL = process.env.inProduction === true ? process.env.PARSE_SERVER_URL : process.env.PARSE_LOCAL_URL

module.exports = Parse
