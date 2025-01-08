const Joi = require('joi');

const worldValidator = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  factions: Joi.array().items(Joi.object()).optional(),
  regions: Joi.array().items(Joi.object({
    name: Joi.string().required()
  }).unknown(true)).optional(),
  quests: Joi.array().items(Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string().valid('Active', 'Completed', 'Failed').default('Active')
  }).unknown(true)).optional(),
  events: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    date: Joi.string().optional(),
    description: Joi.string().optional()
  }).unknown(true)).optional(),
  npcList: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    role: Joi.string().required(),
    race: Joi.string().optional(),
    affiliation: Joi.string().optional(),
    location: Joi.string().optional()
  })).optional(),
  currencies: Joi.array().items(Joi.string()).optional(),
  globalItems: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    value: Joi.number().integer().min(1).optional()
  })).optional(),
  economyState: Joi.object({
    marketPrices: Joi.object().optional(),
    trade: Joi.object().optional(),
    currencyRates: Joi.object().optional()
  }).unknown(true).optional(),
  lore: Joi.object({
    gods: Joi.array().items(Joi.string()).optional(),
    history: Joi.string().optional(),
    notableFigures: Joi.array().items(Joi.string()).optional()
  }).unknown(true).optional(),
  weatherPatterns: Joi.object({
    seasons: Joi.array().items(Joi.string()).optional(),
    averageTemperature: Joi.number().optional()
  }).optional(),
  currentTime: Joi.object({
    year: Joi.number().integer().required(),
    month: Joi.number().integer().required(),
    day: Joi.number().integer().required(),
    time: Joi.number().integer().optional()
  }),
  players: Joi.array().items(Joi.string()).optional()
}).custom((value, helpers) => {
  // Ensure at least one faction or region exists
  if (value.factions.length === 0 && value.regions.length === 0) {
    return helpers.message('A world must have at least one faction or region');
  }

  return value;
}, 'World Validator').required();

module.exports = worldValidator;
