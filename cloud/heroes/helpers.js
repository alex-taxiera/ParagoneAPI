/* global Parse */

const abilityPriority = (type) => {
  switch (type) {
    case 'Basic': return 1
    case 'Alternate': return 2
    case 'Primary': return 3
    case 'Secondary': return 4
    case 'Ultimate': return 5
  }
}

const properCase = (string) => string.split(' ').map((lower) => lower.replace(/^\w/, c => c.toUpperCase())).join(' ')

const heroFull = async (hero) => {
  const json = hero.toJSON()
  const abilities = await hero.get('abilities').query().find()
  json.abilities = abilities.map((ability) => ability.toJSON())
    .map((ability) => ({ ...ability, name: properCase(ability.name) }))
    .sort((a, b) => abilityPriority(a.type) - abilityPriority(b.type))
  const attributes = await hero.get('attributes').query().find()
  json.attributes = attributes.map((attribute) => attribute.toJSON()).sort((a, b) => a.level - b.level)
  return json
}

module.exports = {
  heroFull,
  properCase
}
