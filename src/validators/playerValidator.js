const Joi = require('joi');

const playerValidator = Joi.object({
  name: Joi.string().default('Unknown Adventurer').required(),
  age: Joi.number().integer().min(0).default(0).required(),
  height: Joi.number().min(0).default(0).required(),
  weight: Joi.number().min(0).default(0).required(),
  race: Joi.string().default('Human').required(),
  subrace: Joi.string().allow(null).optional(),
  background: Joi.string().default('Commoner').required(),
  alignment: Joi.string().default('Neutral').required(),
  classes: Joi.array().items(Joi.string()).default([]).required(),
  subclasses: Joi.array().items(Joi.string()).default([]).optional(),
  abilityScores: Joi.object({
    str: Joi.number().integer().min(1).default(10),
    dex: Joi.number().integer().min(1).default(10),
    con: Joi.number().integer().min(1).default(10),
    int: Joi.number().integer().min(1).default(10),
    wis: Joi.number().integer().min(1).default(10),
    cha: Joi.number().integer().min(1).default(10),
  }).required(),
  savingThrows: Joi.object({
    str: Joi.number().integer().default(0),
    dex: Joi.number().integer().default(0),
    con: Joi.number().integer().default(0),
    int: Joi.number().integer().default(0),
    wis: Joi.number().integer().default(0),
    cha: Joi.number().integer().default(0),
  }).required(),
  skills: Joi.object().default({}).optional(),
  feats: Joi.object().default({}).optional(),
  knownLanguages: Joi.array().items(Joi.string()).default(['Common']).optional(),
  proficiencies: Joi.array().items(Joi.string()).default([]).optional(),
  traits: Joi.array().items(Joi.string()).default([]).optional(),
  conditions: Joi.array().items(Joi.string()).default([]).optional(),
  hp: Joi.number().integer().min(0).default(10).required(),
  tempHp: Joi.number().integer().min(0).default(0).optional(),
  hitDice: Joi.string().default('1d8').required(),
  ac: Joi.number().integer().min(0).default(10).required(),
  initBonus: Joi.number().integer().default(0).optional(),
  speed: Joi.number().integer().min(0).default(30).required(),
  spellSlots: Joi.object().pattern(/^\d+$/, Joi.number().integer().min(0).default(0)).required(),
  knownSpells: Joi.array().items(Joi.string()).default([]).optional(),
  inspiration: Joi.boolean().default(false).required(),
  passivePerception: Joi.number().integer().min(0).default(10).required(),
  effects: Joi.array().items(Joi.string()).default([]).optional(),
  resistances: Joi.array().items(Joi.string()).default([]).optional(),
  immunities: Joi.array().items(Joi.string()).default([]).optional(),
  vulnerabilities: Joi.array().items(Joi.string()).default([]).optional(),
  deathSaves: Joi.object({
    successes: Joi.number().integer().min(0).max(3).default(0),
    failures: Joi.number().integer().min(0).max(3).default(0),
  }).required(),
  familiar: Joi.object().allow(null).optional(),
  proficiencyBonus: Joi.number().integer().min(0).default(2).required(),
  reputation: Joi.number().integer().min(0).default(0).optional(),
  capacity: Joi.number().integer().min(0).default(10).optional(),
  npc: Joi.boolean().default(false).required(),
}).custom((value, helpers) => {
  // Ensure ability scores are valid
  Object.keys(value.abilityScores).forEach((key) => {
    if (value.abilityScores[key] < 1) {
      return helpers.message(`Ability score for ${key} must be at least 1`);
    }
  });

  return value;
}, 'Player Validator').required();

module.exports = playerValidator;
