class SpellService {
    constructor(spellRepository) {
      this.spellRepository = spellRepository;
    }
  
    async getSpells() {
      return this.spellRepository.getAll();
    }
  
    async createSpell(spellData) {
      return this.spellRepository.create(spellData);
    }
  }
  
  module.exports = SpellService;
  