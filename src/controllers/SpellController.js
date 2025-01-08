class SpellController {
  constructor(spellService, spellModel, logger) {
    this.spellService = spellService;
    this.spellModel = spellModel;
    this.logger = logger;
  }

  async getAll(req, res) {
    try {
      const spellsData = await this.spellService.getAllSpells();
      const spells = spellsData.map((data) => new this.spellModel(data));
      res.json(spells.map((spell) => spell.getSpellInfo()));
    } catch (err) {
      this.logger.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const spellExists = await this.spellService.spellExists(req.body.index);
      if (spellExists) {
        return res.status(409).json({ message: "Spell already exists with this index." });
      }

      const newSpell = new this.spellModel(req.body);
      const result = await this.spellService.createSpell(newSpell);
      res.status(201).json({ message: result });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const updatedData = req.body;
      const existingSpell = await this.spellService.getSpellDetails(req.params.index);

      if (!existingSpell) {
        return res.status(404).json({ message: 'Spell not found' });
      }

      const updatedSpell = new this.spellModel({ ...existingSpell, ...updatedData });
      const result = await this.spellService.updateSpell(req.params.index, updatedSpell);

      res.status(200).json(result);
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = SpellController;
