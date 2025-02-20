class InventoryRepository {
    constructor(collection) {
      this.collection = collection;
    }
  
    async getByentityId(entityId) {
      try {
        const inventory = await this.collection.findOne({ entityId });
        return inventory;
      } catch (error) {
        throw new Error(`Error getting inventory for entity ${entityId}: ${error.message}`);
      }
    }
  
    async createOrUpdate(entityId, inventoryData) {
      try {
        const result = await this.collection.updateOne(
          { entityId },
          { $set: inventoryData },
          { upsert: true }
        );
        return result;
      } catch (error) {
        throw new Error(`Error creating or updating inventory for entity ${entityId}: ${error.message}`);
      }
    }
  
    async addItem(entityId, item) {
      try {
        const result = await this.collection.updateOne(
          { entityId },
          { $push: { items: item } }
        );
        return result;
      } catch (error) {
        throw new Error(`Error adding item to inventory for entity ${entityId}: ${error.message}`);
      }
    }
  
    async removeItem(entityId, itemId) {
      try {
        const result = await this.collection.updateOne(
          { entityId },
          { $pull: { items: { _id: itemId } } }
        );
        return result;
      } catch (error) {
        throw new Error(`Error removing item from inventory for entity ${entityId}: ${error.message}`);
      }
    }
  
    async getItems(entityId) {
      try {
        const inventory = await this.collection.findOne({ entityId });
        return inventory ? inventory.items : [];
      } catch (error) {
        throw new Error(`Error listing items for entity ${entityId}: ${error.message}`);
      }
    }
  
    async addItemToEquipped(entityId, item) {
      try {
        const result = await this.collection.updateOne(
          { entityId },
          { $push: { equipped: item } }
        );
        return result;
      } catch (error) {
        throw new Error(`Error equipping item for entity ${entityId}: ${error.message}`);
      }
    }
  
    async removeItemFromEquipped(entityId, itemId) {
      try {
        const result = await this.collection.updateOne(
          { entityId },
          { $pull: { equipped: { _id: itemId } } }
        );
        return result;
      } catch (error) {
        throw new Error(`Error unequipping item for entity ${entityId}: ${error.message}`);
      }
    }
  
    async addGold(entityId, amount) {
      try {
        const result = await this.collection.updateOne(
          { entityId },
          { $inc: { gold: amount } }
        );
        return result;
      } catch (error) {
        throw new Error(`Error adding gold to entity ${entityId}: ${error.message}`);
      }
    }
  }
  
  module.exports = InventoryRepository;
  