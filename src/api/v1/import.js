const importers = require('express').Router()
const { run } = require('../../cloud')

const runCloud = async (req, res) => {
  const runner = async (req, res) => {
    switch (req.params.type) {
      case 'cards': return run('importCards')
      case 'heroes': return run('importHeroes')
      default: return run('importHeroes').then(() => run('importCards'))
    }
  }
  return runner(req, res)
    .then((content) => res.send(content))
    .catch((err) => res.status(err.code).send(err.message))
}

importers.get('/:type', runCloud)

module.exports = importers
