const Joi = require('joi');

const spellValidator = Joi.object({
  index: Joi.string().required(),
  name: Joi.string().required(),
  desc: Joi.array().items(Joi.string()).required(),
  higher_level: Joi.array().items(Joi.string()).optional(),
  range: Joi.string().default('Self').optional(),
  components: Joi.array().items(Joi.string().valid('V', 'S', 'M')).optional(),
  material: Joi.string().default('').optional(),
  ritual: Joi.boolean().default(false),
  duration: Joi.string().default('Instantaneous').optional(),
  concentration: Joi.boolean().default(false),
  casting_time: Joi.string().default('1 action').optional(),
  level: Joi.number().integer().min(1).max(9).default(1).optional(),
  attack_type: Joi.string().valid('ranged', 'melee').default('ranged').optional(),
  damage: Joi.object().default({}).optional(),
  school: Joi.object().default({}).optional(),
  classes: Joi.array().items(Joi.object()).default([]).optional(),
  subclasses: Joi.array().items(Joi.object()).default([]).optional(),
  url: Joi.string().pattern(/^\/api\/spells\/[a-zA-Z0-9\-]+$/).default('').optional()
}).custom((value, helpers) => {
    // Ensure components contain at least V or S or M
    if (value.components.length === 0) {
      return helpers.message('Spell must have at least one component (V, S, M)');
    }

    if (value.components.includes('M') && !value.material) {
      return helpers.message('Spell with M must include a material component.');
    }

    // Ensure higher_level is an array of strings if provided
    if (value.higher_level && !Array.isArray(value.higher_level)) {
      return helpers.message('Higher level effects must be an array of strings.');
    }

  return value;
}, 'Spell Validator').required();

module.exports = spellValidator;
