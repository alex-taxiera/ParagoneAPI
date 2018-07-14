const api = require('express').Router()
const { run } = require('../cloud')

api.get('/', (req, res) => run('echo', {message: 'heck'}).then((content) => res.send(content)))

api.get('/importHeroes', (req, res) => run('importHeroes').then((content) => res.send(content)))
api.get('/importCards', (req, res) => run('importCards').then((content) => res.send(content)))

module.exports = api
