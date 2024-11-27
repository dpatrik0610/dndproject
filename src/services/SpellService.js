class SpellService {
  constructor(spellRepository, dnd5eClient) {
    this.spellRepository = spellRepository;
    this.dnd5eClient = dnd5eClient;

    this.originalSpells = this.dnd5eClient.getSpells();  // Ensure this only happens once
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
  
  // Finds a spell first in custom list, then in original list
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
}

module.exports = SpellService;
