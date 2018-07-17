/* global Parse */
const { heroFull, heroSummary } = require('./helpers.js')

const getHero = async (summary, heroIdOrName) => {
  let hero = await new Parse.Query(Parse.Object.extend('Hero')).get(heroIdOrName)
    .catch(() => new Parse.Query(Parse.Object.extend('Hero')).equalTo('name', heroIdOrName.toLowerCase()).first())
  if (!hero) throw new Parse.Error(404, `Could not find hero with id or name: ${heroIdOrName}`)
  if (!summary) return heroFull(hero)
  return heroSummary(hero)
  return {...hero, name: properCase(hero.name)}
}

const getHeroes = async (summary) => {
  let heroes = await new Parse.Query(Parse.Object.extend('Hero')).find()
  if (!summary) heroes = heroes.map(heroFull)
  else heroes = heroes.map((hero) => hero.toJSON())
  return Promise.all(heroes).then((heroes) => heroes.map((hero) => ({...hero, name: properCase(hero.name)})))
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
