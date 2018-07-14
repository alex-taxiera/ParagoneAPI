const heroes = require('express').Router()
const { run } = require('../cloud')

heroes.get('/', (req, res) => run('echo', {message: 'heck'}).then((content) => res.send(content)))

heroes.get('/all', (req, res) => run('getHeroesAll').then((content) => res.send(content)))

module.exports = heroes
