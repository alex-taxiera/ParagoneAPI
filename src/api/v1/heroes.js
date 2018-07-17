const heroes = require('express').Router()
const { run, error } = require('../../cloud')

const runCloud = async (req, res) => {
  const runner = async (req, res) => {
    switch (req.params.type) {
      case 'full':
        return run('heroFull', {heroIdOrName: req.params.heroIdOrName})
      case 'summary':
        return run('heroSummary', {heroIdOrName: req.params.heroIdOrName})
      case undefined:
        return run('heroFull')
      default:
        throw error(404, `Unkown type: ${req.params.type}`)
    }
  }
  return runner(req, res)
    .then((content) => res.json(content))
    .catch((err) => res.status(err.code).send(err.message))
}

heroes.get('/', runCloud)
heroes.get('/:type', runCloud)
heroes.get('/:type/:heroIdOrName', runCloud)

module.exports = heroes
