/* global Parse */
const { heroFull } = require('./helpers.js')

const getHero = async (heroId) => {
  const hero = await new Parse.Query(Parse.Object.extend('Hero')).get(heroId)
  if (!hero) throw Error(`Could not find hero with id: ${heroId}`)
  return hero
}

const getHeroes = async () => {
  return new Parse.Query(Parse.Object.extend('Hero')).find()
}

const getHeroFull = async (heroId) => heroFull(await getHero(heroId))
const getHeroesFull = async () => (await getHeroes()).map(heroFull)

module.exports = {
  getHero,
  getHeroes,
  getHeroFull,
  getHeroesFull
}
