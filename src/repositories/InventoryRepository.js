// repositories/InventoryRepository.js
class InventoryRepository {
    constructor(collection) {
      this.collection = collection;
    }
  
    async getByPlayerId(playerId) {
      try {
        const inventory = await this.collection.findOne({ playerId });
        return inventory;
      } catch (error) {
        throw new Error(`Error getting inventory for player ${playerId}: ${error.message}`);
      }
    }
  
    async createOrUpdate(playerId, inventoryData) {
      try {
        const result = await this.collection.updateOne(
          { playerId },
          { $set: inventoryData },
          { upsert: true }
        );
        return result;
      } catch (error) {
        throw new Error(`Error creating or updating inventory for player ${playerId}: ${error.message}`);
      }
    }
  
    async addItem(playerId, item) {
      try {
        const result = await this.collection.updateOne(
          { playerId },
          { $push: { items: item } }
        );
        return result;
      } catch (error) {
        throw new Error(`Error adding item to inventory for player ${playerId}: ${error.message}`);
      }
    }
  
    async removeItem(playerId, itemId) {
      try {
        const result = await this.collection.updateOne(
          { playerId },
          { $pull: { items: { _id: itemId } } }
        );
        return result;
      } catch (error) {
        throw new Error(`Error removing item from inventory for player ${playerId}: ${error.message}`);
      }
    }
  
    async getItems(playerId) {
      try {
        const inventory = await this.collection.findOne({ playerId });
        return inventory ? inventory.items : [];
      } catch (error) {
        throw new Error(`Error listing items for player ${playerId}: ${error.message}`);
      }
    }
  
    async addItemToEquipped(playerId, item) {
      try {
        const result = await this.collection.updateOne(
          { playerId },
          { $push: { equipped: item } }
        );
        return result;
      } catch (error) {
        throw new Error(`Error equipping item for player ${playerId}: ${error.message}`);
      }
    }
  
    async removeItemFromEquipped(playerId, itemId) {
      try {
        const result = await this.collection.updateOne(
          { playerId },
          { $pull: { equipped: { _id: itemId } } }
        );
        return result;
      } catch (error) {
        throw new Error(`Error unequipping item for player ${playerId}: ${error.message}`);
      }
    }
  
    async addGold(playerId, amount) {
      try {
        const result = await this.collection.updateOne(
          { playerId },
          { $inc: { gold: amount } }
        );
        return result;
      } catch (error) {
        throw new Error(`Error adding gold to player ${playerId}: ${error.message}`);
      }
    }
  }
  
  module.exports = InventoryRepository;
  