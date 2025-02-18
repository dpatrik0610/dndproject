class SpellController {
  constructor(spellService, logger) {
    this.spellService = spellService;
    this.logger = logger;
  }

  // Fetch all spells (both custom and original)
  async getAll(req, res) {
    try {
      const spells = await this.spellService.getAllSpells();
      res.json(spells);
    } catch (err) {
      this.logger.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async getAllCustom(req, res) {
    try {
      const spells = await this.spellService.getCustomSpells();
      res.json(spells);
    } catch (err) {
      this.logger.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async getByIndex(req, res) {
    try {
      const spell = await this.spellService.getSpellDetails(req.params.index);
      if (!spell) return res.status(404).json({ message: `Spell ${req.params.index} not found.` });

      return res.status(200).json(spell);
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({ error: err.message });
    }
  }

  // Create a new spell (Added to custom list)
  async create(req, res) {
    try {
      const spellExists = await this.spellService.spellExists(req.body.index);
      if (spellExists) {
        return res.status(409).json({ message: "Spell already exists with this index." });
      }

      const result = await this.spellService.createSpell(req.body);
      res.status(201).json({ message: result });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({ error: err.message });
    }
  }

  // Delete a spell by its index (Deleting only from custom spells)
  async delete(req, res) {
    const spellIndex = req.params.index;
    try {
      const result = await this.spellService.deleteSpell(spellIndex);
      if (!result) {
        return res.status(404).json({ error: `Spell with index ${spellIndex} not found.` });
      }

      res.status(200).json({ message: `Spell with index ${spellIndex} successfully deleted.` });
    } catch (err) {
      this.logger.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const updatedSpell = await this.spellService.updateSpell(req.params.index, req.body);
      
      if (!updatedSpell) {
        return res.status(404).json({ message: 'Spell not found' });
      }

      res.status(200).json(updatedSpell);
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({ error: err.message });
    }
  }

  async validateMultiple(req, res) {
    try {
      const { spells } = req.body;
  
      if (!Array.isArray(spells)) {
        return res.status(400).json({ error: 'Spells must be an array' });
      }
  
      const validSpells = await Promise.all(
        spells.map(async spell => {
          const exists = await this.spellService.spellExists(spell);
          return exists ? spell : null;
        })
      );
  
      const filteredValidSpells = validSpells.filter(spell => spell !== null);
  
      return res.status(200).json({ validSpells: filteredValidSpells });
    } catch (err) {
      this.logger.error('Error validating spells:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  

}

module.exports = SpellController;
