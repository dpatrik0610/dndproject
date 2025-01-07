const axios = require('axios');
const {logTemplates: logger} = require('../utils/logTemplates')

async function validateSpells(req, res, next) {
  try {
    const { knownSpells } = req.body;

    // Skip if no spells provided
    if (!knownSpells || knownSpells.length === 0) {
      req.validSpells = [];
      return next();
    }
    // Batch validate spells
    const response = await axios.post(`http://localhost:${process.env.PORT}/api/spells/validate`, { spells: knownSpells });
    const validSpells = response.data.validSpells || [];
    const invalidSpells = knownSpells.filter(spell => !validSpells.includes(spell));

    if (invalidSpells.length > 0) {
      return res.status(400).json({
        error: `Invalid spells provided: ${invalidSpells.join(', ')}`,
      });
    }

    // Attach valid spells to request
    req.validSpells = validSpells;
    next();
  } catch (err) {
    logger.error('Error validating spells:', err);
    res.status(500).json({ error: 'Error validating spells. Please try again.' });
  }
}

module.exports = validateSpells;
