class SpellRepository {
    constructor(spellCollection) {
      this.spellCollection = spellCollection;
    }
  
    async getAll() {
      return this.spellCollection.find().toArray();
    }
    
    async getAllShort() {
      const result = await this.spellCollection.find({}, {
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
      return await this.spellCollection.findOne({ index: spellIndex });
    }
  
    async create(spellData) {
      const result = await this.spellCollection.insertOne(spellData);
      return { _id: result.insertedId, ...spellData };
    }

    async deleteOne(spellIndex) {
      return await this.spellCollection.deleteOne({ index: spellIndex });
    }

    async updateSpell(spellIndex, updatedData) {
      return await this.spellCollection.updateOne(
        { index: spellIndex },
        { $set: updatedData }
      );
    }
  }
  
  module.exports = SpellRepository;
  