const v1 = require('polka')()
const heroes = require('./heroes.js')
const cards = require('./cards.js')

v1.use('/heroes', heroes)
v1.use('/cards', cards)

module.exports = v1
