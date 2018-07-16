const api = require('express').Router()
const { run } = require('../cloud')
const heroes = require('./heroes.js')
const cards = require('./cards.js')
const imports = require('./import.js')

api.get('/', (req, res) => run('echo', {message: 'main'}).then((content) => res.send(content)))

// api.use('/import', imports)
api.use('/heroes', heroes)
api.use('/cards', cards)

module.exports = api
