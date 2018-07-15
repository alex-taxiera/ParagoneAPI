/* global Parse */
const defineEndpoint = require('./helpers/defineEndpoint.js')
const ParamTypes = require('prop-types')
const enforceParams = require('./middleware/enforceParams.js')
const { resolveHero } = require('./heroes')

defineEndpoint('echo',
  enforceParams({
    message: ParamTypes.string.isRequired
  }),
  (req, res) => res.success(req.params.message)
)

defineEndpoint('heroFull',
  enforceParams({
    heroIdOrName: ParamTypes.string
  }),
  async (req, res) => resolveHero(false, req.params.heroIdOrName).then(res.success).catch(res.error)
)

defineEndpoint('heroSummary',
  enforceParams({
    heroIdOrName: ParamTypes.string
  }),
  async (req, res) => resolveHero(true, req.params.heroIdOrName).then(res.success).catch(res.error)
)

defineEndpoint('importCards',
  (req, res) => {
    const Card = Parse.Object.extend('Card')
    const apiData = require('../data/cards.json')
    const parseCards = apiData.map((data) => {
      const card = new Card()
      const {
        name,
        rarity,
        affinity,
        trait,
        intellectGemCost,
        vitalityGemCost,
        goldCost,
        levels
      } = data
      const cleanLevels = levels.map((level, index) => ({
        level: index + 1,
        basicAttributes: level.basicAttributes,
        abilities: level.abilities
      }))
      return card.save({
        name: name.toLowerCase(),
        rarity,
        affinity,
        trait,
        intellectGemCost,
        vitalityGemCost,
        goldCost,
        levels: cleanLevels
      })
    })
    Promise.all(parseCards)
      .then((content) => res.success(content.map((card) => ({name: card.get('name'), id: card.id}))))
  }
)

defineEndpoint('importHeroes',
  (req, res) => {
    const Hero = Parse.Object.extend('Hero')
    const Ability = Parse.Object.extend('Ability')
    const Attribute = Parse.Object.extend('Attribute')
    const apiData = require('../data/heroes.json')
    const parseHeroes = apiData.map((data) => {
      const hero = new Hero()
      return hero.save({
        name: data.name.toLowerCase(),
        attack: data.attack,
        traits: data.traits,
        scale: data.scale,
        releaseDate: new Date(data.releaseDate),
        affinities: data.affinities,
        difficulty: data.difficulty,
        stats: data.stats
      }).then(async (hero) => {
        const parseAttributes = data.attributesByLevel.map((data, index) => {
          const attribute = new Attribute()
          return attribute.save({
            level: index + 1,
            maxEnergy: data.MaxEnergy,
            basicPenetrationRating: data.BasicPenetrationRating,
            baseAttackTime: data.BaseAttackTime,
            abilityPenetrationRating: data.AbilityPenetrationRating,
            healthRegenRate: data.HealthRegenRate,
            maxMoveSpeed: data.MaxMoveSpeed,
            abilityResistanceRating: data.AbilityResistanceRating,
            maxHealth: data.MaxHealth,
            basicResistanceRating: data.BasicResistanceRating,
            cleaveRating: data.CleaveRating,
            attackSpeedRating: data.AttackSpeedRating,
            energyRegenRate: data.EnergyRegenRate
          })
        })
        const parseAbilities = data.abilities.map((data) => {
          const ability = new Ability()
          return ability.save({
            name: data.name.toLowerCase(),
            description: data.description,
            shortDescription: data.shortDescription,
            type: data.type,
            binding: data.binding,
            damageType: data.damageType,
            maxLevel: data.maxLevel,
            modifiersByLevel: data.modifiersByLevel
          })
        })
        const heroAttributes = hero.relation('attributes')
        const heroAbilities = hero.relation('abilities')
        heroAttributes.add(await Promise.all(parseAttributes))
        heroAbilities.add(await Promise.all(parseAbilities))
        return hero.save()
      })
    })
    Promise.all(parseHeroes)
      .then((content) => res.success(content.map((hero) => ({name: hero.get('name'), id: hero.id}))))
  }
)
