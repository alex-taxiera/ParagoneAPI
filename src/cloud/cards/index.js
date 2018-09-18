/* global Parse */
const properCase = require('../helpers/properCase.js')

const getCard = async (cardIdOrName) => {
  const card = await new Parse.Query(Parse.Object.extend('Card')).get(cardIdOrName)
    .catch(() => new Parse.Query(Parse.Object.extend('Card')).equalTo('name', cardIdOrName.toLowerCase()).first())
  if (!card) throw new Parse.Error(404, `Could not find card with id or name: ${cardIdOrName}`)
  const json = card.toJSON()
  return { ...json, name: properCase(json.name) }
}

const getCards = async () => {
  const cards = new Parse.Query(Parse.Object.extend('Card')).find().map((card) => card.toJSON())
  return cards.map((card) => ({ ...card, name: properCase(card.name) }))
}

const resolveCard = async (cardIdOrName) => {
  if (cardIdOrName) {
    return getCard(cardIdOrName)
  } else {
    const cards = await getCards()
    return Promise.all(cards)
  }
}

module.exports = {
  resolveCard
}
