/* global Parse */

const properCase = (string) => string.split(' ').map((lower) => lower.replace(/^\w/, c => c.toUpperCase())).join(' ')

const heroFull = async (hero) => {
  const json = hero.toJSON()
  const abilities = await hero.get('abilities').query().find()
  json.abilities = abilities.map((ability) => ability.toJSON())
    .map((ability) => ({ ...ability, name: properCase(ability.name) }))
  const attributes = await hero.get('attributes').query().find()
  json.attributes = attributes.map((attribute) => attribute.toJSON()).sort((a, b) => a.level - b.level)
  return json
}

module.exports = {
  heroFull,
  properCase
}
