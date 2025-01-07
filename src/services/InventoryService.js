// services/InventoryService.js
class InventoryService {
    constructor(inventoryRepository, logger) {
      this.repository = inventoryRepository;
      this.logger = logger;
    }
  
    async getInventoryByPlayerId(playerId) {
      try {
        const inventory = await this.repository.getByPlayerId(playerId);
        return inventory;
      } catch (error) {
        this.logger.error(`Error getting inventory for player ${playerId}: ${error.message}`);
        throw error;
      }
    }
  
    async addItemToInventory(playerId, item) {
      try {
        const inventory = await this.getInventoryByPlayerId(playerId);
        if (!inventory) {
          await this.repository.createOrUpdate(playerId, { items: [item] });
        } else {
          await this.repository.addItem(playerId, item);
        }
        this.logger.info(`Item added to inventory for player: ${playerId}`);
      } catch (error) {
        this.logger.error(`Error adding item to inventory for player ${playerId}: ${error.message}`);
        throw error;
      }
    }
  
    async removeItemFromInventory(playerId, itemId) {
      try {
        await this.repository.removeItem(playerId, itemId);
        this.logger.info(`Item removed from inventory for player: ${playerId}`);
      } catch (error) {
        this.logger.error(`Error removing item from inventory for player ${playerId}: ${error.message}`);
        throw error;
      }
    }
  
    async listInventoryItems(playerId) {
      try {
        return await this.repository.getItems(playerId);
      } catch (error) {
        this.logger.error(`Error listing items in inventory for player ${playerId}: ${error.message}`);
        throw error;
      }
    }
  
    async equipItem(playerId, itemId) {
      try {
        const inventory = await this.getInventoryByPlayerId(playerId);
        const item = inventory.items.find(item => item._id === itemId);
  
        if (!item) {
          throw new Error(`Item with id ${itemId} not found`);
        }
  
        await this.repository.addItemToEquipped(playerId, item);
        this.logger.info(`Item equipped for player: ${playerId}`);
      } catch (error) {
        this.logger.error(`Error equipping item for player ${playerId}: ${error.message}`);
        throw error;
      }
    }
  
    async unequipItem(playerId, itemId) {
      try {
        const inventory = await this.getInventoryByPlayerId(playerId);
        const item = inventory.items.find(item => item._id === itemId);
  
        if (!item) {
          throw new Error(`Item with id ${itemId} not found`);
        }
  
        await this.repository.removeItemFromEquipped(playerId, itemId);
        this.logger.info(`Item unequipped for player: ${playerId}`);
      } catch (error) {
        this.logger.error(`Error unequipping item for player ${playerId}: ${error.message}`);
        throw error;
      }
    }
  
    async sellItem(playerId, itemId, price) {
      try {
        const inventory = await this.getInventoryByPlayerId(playerId);
        const item = inventory.items.find(item => item._id === itemId);
  
        if (!item) {
          throw new Error(`Item with id ${itemId} not found`);
        }
  
        await this.repository.removeItem(playerId, itemId);
        await this.repository.addGold(playerId, price);
  
        this.logger.info(`Item sold for ${price} gold by player: ${playerId}`);
      } catch (error) {
        this.logger.error(`Error selling item for player ${playerId}: ${error.message}`);
        throw error;
      }
    }
  }
  
  module.exports = InventoryService;
  