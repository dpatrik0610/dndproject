class SpellController {
    constructor(spellService) {
      this.spellService = spellService;
    }
  
    // Fetch all spells (both custom and original)
    async getAll(req, res) {
      try {
        const spells = await this.spellService.getAllSpells();
        res.json(spells);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    async getAllCustom(req, res) {
      try {
        const spells = await this.spellService.getCustomSpells();
        res.json(spells);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    // Create a new spell (Added to custom list)
    async create(req, res) {
      try {
        const result = await this.spellService.createSpell(req.body);
  
        res.status(201).json({ message: result });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }
  
    // Delete a spell by its index (Deleting only from custom spells)
    async delete(req, res) {
      const { spellIndex } = req.params;
  
      try {
        const result = await this.spellService.deleteSpell(spellIndex);
        
        if (!result) {
          return res.status(404).json({ error: `Spell with index ${spellIndex} not found.` });
        }
  
        res.status(200).json({ message: `Spell with index ${spellIndex} successfully deleted.` });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  }
  
  module.exports = SpellController;
  