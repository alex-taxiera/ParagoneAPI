const heroes = require('express').Router()
const paragone = require('../paragone')

heroes.get('/', (req, res) => res.json(paragone.getHeroes()))

heroes.get('/:heroId', (req, res) => {
  const hero = paragone.getHero(req.params.heroId)
  if (!hero) {
    res.json(404, `no hero found for id: ${req.params.heroId}`)
  } else {
    res.json(hero)
  }
})

module.exports = heroes
