class ItemRepository {
    constructor(db) {
      this.collection = db.collection('items');
    }
  
    async getAll() {
      return this.collection.find().toArray();
    }
  
    async create(itemData) {
      const result = await this.collection.insertOne(itemData);
      return result.ops[0];
    }
  }
  
  module.exports = ItemRepository;