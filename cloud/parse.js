const Parse = require('parse/node')

Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_MASTER_KEY)
Parse.serverURL = (process.env.NODE_ENV === 'production' ? process.env.SERVER_URL : process.env.LOCAL_URL) + process.env.PARSE_ROUTE

module.exports = Parse
