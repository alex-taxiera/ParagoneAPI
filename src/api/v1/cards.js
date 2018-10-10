const cards = require('express').Router()
const paragone = require('../paragone')

cards.get('/', (req, res) => res.json(paragone.getCards()))

cards.get('/:cardId', (req, res) => {
  const card = paragone.getCard(req.params.cardId)
  if (!card) {
    res.json(404, `no card found for id: ${req.params.cardId}`)
  } else {
    res.json(card)
  }
})

module.exports = cards
