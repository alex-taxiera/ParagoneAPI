const heroes = require('express').Router()
const { run } = require('../cloud')

// heroes.get('/', (req, res) => run('echo', {message: 'heck'}).then((content) => res.send(content)))

heroes.get('/:type', (req, res) => {
  runCloud(req, res)
})

heroes.get('/:type/:heroIdOrName', (req, res) => {
  runCloud(req, res)
})

const runCloud = async (req, res) => {
  const runner = (req, res) => {
    switch (req.params.type) {
      case 'full':
        return run('heroFull', {heroIdOrName: req.params.heroIdOrName})
      case 'summary':
        return run('heroSummary', {heroIdOrName: req.params.heroIdOrName})
      default:
        res.status(404).send(`Unkown type: ${req.params.type}`)
    }
  }
  return runner(req, res)
    .then((content) => res.send(content))
    .catch((err) => res.status(err.code).send(err.message))
}
module.exports = heroes
