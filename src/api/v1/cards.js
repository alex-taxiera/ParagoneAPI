const cards = require('polka')()
const send = require('@polka/send-type')
const paragone = require('../paragone')

cards.get('/', (req, res) => send(res, 200, paragone.getCards()))

cards.get('/:cardId', (req, res) => {
  const card = paragone.getCard(req.params.cardId)

  if (!card) {
    return send(res, 404, {
      error: `no card found for id: ${req.params.cardId}`
    })
  }

  send(res, 200, card)
})

module.exports = cards
