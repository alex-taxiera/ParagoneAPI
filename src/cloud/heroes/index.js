/* global Parse */
const { heroFull, heroSummary } = require('./helpers.js')

const getHero = async (summary, heroIdOrName) => {
  let hero = await new Parse.Query(Parse.Object.extend('Hero')).get(heroIdOrName)
    .catch(() => new Parse.Query(Parse.Object.extend('Hero')).equalTo('name', heroIdOrName.toLowerCase()).first())
  if (!hero) throw new Parse.Error(404, `Could not find hero with id or name: ${heroIdOrName}`)
  if (!summary) return heroFull(hero)
  return heroSummary(hero)
}

const getHeroes = async (summary) => {
  let heroes = await new Parse.Query(Parse.Object.extend('Hero')).find()
  if (!summary) heroes = heroes.map(heroFull)
  return heroes.map(heroSummary)
}

const resolveHero = async (summary, heroIdOrName) => {
  if (heroIdOrName) {
    return getHero(summary, heroIdOrName)
  } else {
    const heroes = await getHeroes(summary)
    return Promise.all(heroes)
  }
}

module.exports = {
  resolveHero
}
