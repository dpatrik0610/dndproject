class SpellRepository {
    constructor(db) {
      this.collection = db.collection('spells');
    }
  
    async getAll() {
      return this.collection.find().toArray();
    }
  
    async create(spellData) {
      const result = await this.collection.insertOne(spellData);
      return result.ops[0];
    }
  }
  
  module.exports = SpellRepository;
  