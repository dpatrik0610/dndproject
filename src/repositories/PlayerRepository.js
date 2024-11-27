class PlayerRepository {
    constructor(db, collectionName) {
      this.collection = db.collection(collectionName);
    }
  
    async getAll() {
      return this.collection.find().toArray();
    }
  
    async create(playerData) {
      const result = await this.collection.insertOne(playerData);
      return result.ops[0];
    }
  }
  
  module.exports = PlayerRepository;