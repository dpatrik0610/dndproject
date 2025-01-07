class InventoryRepository {
    constructor(_collection, _logger) {
        this.collection = _collection
        this.logger = _logger;
    }
  
    async createOrUpdate(playerId, inventoryData) {
      try {
        const existingInventory = await this.collection.findOne({ playerId });

        if (!existingInventory) {
            await this.collection.insertOne({ playerId, ...inventoryData });
            this.logger.info(`Created inventory for new player: ${playerId}`);
        }

        await this.collection.updateOne({ playerId }, { $set: inventoryData });
        this.logger.info(`Updated inventory for player: ${playerId}`);

      } catch (error) {
        this.logger.error(`Error in createOrUpdate for player ${playerId}: ${error.message}`);
        throw error;
      }
    }
  
    async getByPlayerId(playerId) {
      try {
        const inventory = await this.collection.findOne({ playerId });

        if (!inventory) {
          this.logger.warn(`No inventory found for player: ${playerId}`);
        }

        return inventory;
      } catch (error) {
        this.logger.error(`Error in getByPlayerId for player ${playerId}: ${error.message}`);
        throw error;
      }
    }
  
    async addItem(playerId, item) {
      try {

        await this.collection.updateOne(
          { playerId },
          { $push: { items: item } }
        );

        this.logger.info(`Added item to inventory for player: ${playerId}`);
      } catch (error) {
        this.logger.error(`Error adding item for player ${playerId}: ${error.message}`);
        throw error;
      }
    }
  
    async removeItem(playerId, itemId) {
      try {
        await this.collection.updateOne(
          { playerId },
          { $pull: { items: { id: itemId } } }
        );

        this.logger.info(`Removed item ${itemId} from inventory for player: ${playerId}`);
      } catch (error) {
        this.logger.error(`Error removing item ${itemId} for player ${playerId}: ${error.message}`);
        throw error;
      }
    }
  
    async getItems(playerId) {
      try {
        const inventory = await this.getByPlayerId(playerId);

        return inventory ? inventory.items : [];
      } catch (error) {
        this.logger.error(`Error retrieving items for player ${playerId}: ${error.message}`);
        throw error;
      }
    }
  }
  
  module.exports = InventoryRepository;
  