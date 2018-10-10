const api = require('express').Router()
const heroes = require('./heroes.js')
const cards = require('./cards.js')

api.use('/heroes', heroes)
api.use('/cards', cards)

module.exports = api
