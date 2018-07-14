const api = require('express').Router()
const { run } = require('../cloud')

api.get('/', (req, res) => run('echo', {message: 'heck'}).then((content) => res.send(content)))

module.exports = api
