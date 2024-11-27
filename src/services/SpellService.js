class SpellService {
  constructor(spellRepository, dnd5eClient) {
    this.spellRepository = spellRepository;
    this.dnd5eClient = dnd5eClient;

    this.originalSpells = this.dnd5eClient.getSpells();
  }
  
  getOriginalSpells = () => {
    return this.originalSpells;
  }
  
  getCustomSpells = async () => {
    try {
      return await this.spellRepository.getAll();
    } catch (err) {
      console.error("Couldn't get custom spells from repository.");
      throw new Error("Couldn't get custom spells from repository.");
    }
  }
  
  // Returns both custom and original spells
  async getAllSpells() {
    const originalSpells = this.getOriginalSpells();
    const customSpells = await this.getCustomSpells();
    return [...originalSpells, ...customSpells];
  }
  
  async findSpell(spellIndex) {
    let spell = await this.spellRepository.getByIndex(spellIndex);
    
    if (!spell) {
      spell = this.originalSpells.find(spell => spell.index.toLowerCase() === spellIndex.toLowerCase());
    }

    if (!spell) {
      throw new Error(`Spell with index ${spellIndex} not found.`);
    }

    return spell;
  }

  async deleteSpell(spellIndex) {
    const customSpells = await this.getCustomSpells();
    const spell = customSpells.find(spell => spell.index.toLowerCase() === spellIndex.toLowerCase());

    if (!spell) {
      throw new Error(`Spell with index ${spellIndex} not found in custom spells.`);
    }

    await this.spellRepository.deleteOne(spellIndex);
    return `Spell with index ${spellIndex} successfully deleted.`;
  }

  async createSpell(spellData) {
    try {
      // TODO: Validation?
      await this.spellRepository.create(spellData);

      return `Spell with index ${spellData.index} successfully created.`;
    } catch (err) {
      
      console.error("Error creating the spell:", err.message);
      throw new Error("Couldn't create spell.");
    }
  }

}

module.exports = SpellService;
