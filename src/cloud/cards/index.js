/* global Parse */

const getCard = async (cardIdOrName) => {
  const card = await new Parse.Query(Parse.Object.extend('Card')).get(cardIdOrName)
    .catch(() => new Parse.Query(Parse.Object.extend('Card')).equalTo('name', cardIdOrName.toLowerCase()).first())
  if (!card) throw new Parse.Error(404, `Could not find card with id or name: ${cardIdOrName}`)
  return card
}

const getCards = async () => new Parse.Query(Parse.Object.extend('Card')).find()

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
