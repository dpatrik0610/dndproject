class SpellRepository {
    constructor(db) {
      this.collection = db.collection('Spells');
    }
  
    async getAll() {
      return this.collection.find().toArray();
    }
    
    async getAllShort() {
      const result = await this.collection.find({}, {
        projection: {
          _id: 0,
          index: 1, 
          name: 1, 
          level: 1, 
          url: 1 
        }
      }).toArray();
  
      return result;
    }

    async getByIndex(spellIndex) {
      return await this.collection.findOne({ index: spellIndex });
    }
  
    async create(spellData) {
      const result = await this.collection.insertOne(spellData);
      return { _id: result.insertedId, ...spellData };
    }

    async deleteOne(spellIndex) {
      return await this.collection.deleteOne({ index: spellIndex });
    }

    async updateSpell(spellIndex, updatedData) {
      return await this.collection.updateOne(
        { index: spellIndex },
        { $set: updatedData }
      );
    }
  }
  
  module.exports = SpellRepository;
  