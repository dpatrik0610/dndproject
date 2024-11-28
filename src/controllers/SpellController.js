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
  
    async getByIndex(req, res) {
      try {
        const spell = await this.spellService.getSpellDetails(req.params.index);
        if (!spell) return res.status(404).json({message: `Spell ${res.params.index} not found.`});

        return res.status(200).json(spell);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }

    // Create a new spell (Added to custom list)
    async create(req, res) {
      try {
        const spellExists = await this.spellService.findSpell(req.body.index);
        if(spellExists) {
          return res.status(409).json({message: "Spell already exists with this index."})
        }

        const result = await this.spellService.createSpell(req.body);
        res.status(201).json({ message: result });
      } catch (err) {
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
        res.status(500).json({ error: err.message });
      }
    }

    async update(req, res) {
      try {
        const updatedSpell = await this.spellService.updateSpell(req.params.index, req.body);
        console.log(updatedSpell);
        if (!updatedSpell) {
          return res.status(404).json({ message: 'Spell not found' });
        }
        res.status(200).json(updatedSpell);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }
    
  }
  
  module.exports = SpellController;