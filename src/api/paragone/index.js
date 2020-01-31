class Paragone {
  constructor (data) {
    for (const key of Object.keys(data)) {
      this[key] = this.reduceStore(data[key])
    }
  }

  reduceStore (array) {
    return array.reduce((ax, dx) => Object.assign(ax, { [dx.id]: dx }), {})
  }

  getData (key, id) {
    return this[key][id]
  }

  getDataStoreValues (key) {
    return Object.values(this[key])
  }

  getHero (id) {
    return this.getData('heroes', id)
  }

  getHeroes () {
    return this.getDataStoreValues('heroes')
  }

  getCard (id) {
    return this.getData('cards', id)
  }

  getCards () {
    return this.getDataStoreValues('cards')
  }
}

module.exports = new Paragone(require('./data'))
