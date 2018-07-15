const heroes = require('express').Router()
const { run } = require('../cloud')

// heroes.get('/', (req, res) => run('echo', {message: 'heck'}).then((content) => res.send(content)))

heroes.get('/:type', (req, res) => {
  runCloud(req, res)
})

heroes.get('/:type/:heroId', (req, res) => {
  runCloud(req, res)
})

const runCloud = (req, res) => {
  switch (req.params.type) {
    case 'full':
      run('heroFull', {heroId: req.params.heroId}).then((content) => res.send(content))
      break
    case 'summary':
      run('heroSummary', {heroId: req.params.heroId}).then((content) => res.send(content))
      break
    default:
      res.status(404).send(`Unkown type: ${req.params.type}`)
  }
}

module.exports = heroes
