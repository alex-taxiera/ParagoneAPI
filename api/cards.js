const cards = require('express').Router()
const { run } = require('../cloud')

const runCloud = async (req, res) => {
  return run('card', {cardIdOrName: req.params.cardIdOrName})
    .then((content) => res.send(content))
    .catch((err) => res.status(err.code).send(err.message))
}

cards.get('/', runCloud)

cards.get('/:cardIdOrName', runCloud)

module.exports = cards
