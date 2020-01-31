const heroes = require('polka')()
const send = require('@polka/send-type')
const paragone = require('../paragone')

heroes.get('/', (req, res) => send(res, 200, paragone.getHeroes()))

heroes.get('/:heroId', (req, res) => {
  const hero = paragone.getHero(req.params.heroId)

  if (!hero) {
    return send(res, 404, {
      error: `no hero found for id: ${req.params.heroId}`
    })
  }

  send(res, 200, hero)
})

module.exports = heroes
