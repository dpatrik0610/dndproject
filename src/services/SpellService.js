class SpellService {
  constructor(spellRepository, dnd5eClient, logger) {
    this.spellRepository = spellRepository;
    this.dnd5eClient = dnd5eClient;
    this.logger = logger;

    this.originalSpells = [];
    this.init();
  }

  async init() {
    try {
      this.originalSpells = await this.dnd5eClient.getSpells();
      logger.info("All DnD5e Spells Imported.");
    } catch (err) {
      logger.error("Error loading spells:", err.message);
      throw new Error("Couldn't get custom spells from repository.");
    }
  }

  getOriginalSpells = () => {
    return this.originalSpells;
  }
  
  getCustomSpells = async () => {
    try {
      return await this.spellRepository.getAllShort();
    } catch (err) {
      logger.error("Couldn't get custom spells from repository.");
      throw new Error("Couldn't get custom spells from repository.");
    }
  }
  
  // Returns both custom and original spells
  async getAllSpells() {

    const originalSpells = this.getOriginalSpells();
    const customSpells = await this.getCustomSpells();
    return [...originalSpells, ...customSpells];
  }

  async spellExists(spellIndex) {
    if (!spellIndex) throw new Error("Argument must have a value!");

    let exists = (await this.spellRepository.getByIndex(spellIndex)) ? true : false;
    if (!exists) {
      exists = (await this.getOriginalSpells()).some(spell => spell.index.toLowerCase() === spellIndex.toLowerCase());
    }
    return exists;
  }
  
  async getSpellDetails(spellIndex) {
    if (!spellIndex) throw new Error("Argument must have a value!");
    if (!(await this.spellExists(spellIndex))) return null;

    let spell = await this.spellRepository.getByIndex(spellIndex);
    if (!spell) {
      spell = await this.dnd5eClient.getSpells(spellIndex);
    }

    return spell;
  }

  async deleteSpell(spellIndex) {
    if (!spellIndex) throw new Error("Argument must have a value!");

    const customSpells = await this.getCustomSpells();
    const spell = await customSpells.find(spell => spell.index.toLowerCase() === spellIndex.toLowerCase());

    if (!spell) {
      throw new Error(`Spell with index ${spellIndex} not found in custom spells.`);
    }

    await this.spellRepository.deleteOne(spellIndex);
    return `Spell with index ${spellIndex} successfully deleted.`;
  }

  async createSpell(spellData) {
    if (!spellData) throw new Error("Argument must have a value!");

    try {
      await this.spellRepository.create(spellData);

      return `Spell with index ${spellData.index} successfully created.`;
    } catch (err) {
      
      logger.error("Error creating the spell:", err.message);
      throw new Error("Couldn't create spell.");
    }
  }

  async updateSpell(spellIndex, spellData) {
    if (!spellIndex || !spellData) throw new Error("Argument must have a value!");

    try {
      logger.log(spellIndex);
      const updateResult = await this.spellRepository.updateSpell(spellIndex, spellData);
  
      if (updateResult.modifiedCount === 0) {
        return null;
      }
  
      return { message: `Spell with index "${spellIndex}" successfully updated.` };
    } catch (err) {
      logger.error("Error updating the spell:", err.message);
      throw new Error("Couldn't update spell.");
    }
  }
  
}

module.exports = SpellService;
