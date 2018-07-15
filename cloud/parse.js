const Parse = require('parse/node')

Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_MASTER_KEY)
Parse.serverURL = process.env.inProduction === true ? process.env.SERVER_URL + '/parse' : process.env.LOCAL_URL + '/parse'

module.exports = Parse
