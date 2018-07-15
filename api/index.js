const api = require('express').Router()
const { run } = require('../cloud')
const heroes = require('./heroes.js')
const cards = require('./cards.js')

api.get('/', (req, res) => run('echo', {message: 'main'}).then((content) => res.send(content)))

// api.get('/importHeroes', (req, res) => run('importHeroes').then((content) => res.send(content)))
// api.get('/importCards', (req, res) => run('importCards').then((content) => res.send(content)))

api.use('/heroes', heroes)
api.use('/cards', cards)

module.exports = api
