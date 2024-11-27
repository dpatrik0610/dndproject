class SpellRepository {
    constructor(db) {
      this.collection = db.collection('spells');
    }
  
    async getAll() {
      return this.collection.find().toArray();
    }
    
    async getByIndex(spellIndex) {
      return await this.db.findOne({ index: spellIndex });
    }
  
    async create(spellData) {
      const result = await this.collection.insertOne(spellData);
      return result.ops[0];
    }

    async deleteOne(spellIndex) {
      return await this.db.deleteOne({ index: spellIndex });
    }

    async updateOne(spellIndex, updatedData) {
      return await this.db.updateOne(
        { index: spellIndex },
        { $set: updatedData }
      );
    }
  }
  
  module.exports = SpellRepository;
  