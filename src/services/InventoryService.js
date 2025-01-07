class InventoryService {
    constructor(inventoryRepository, logger) {
      this.repository = inventoryRepository;
      this.logger = logger;
    }
  
    async createInventory (entityId) {
        try {
            const inventory = await this.repository.createOrUpdate(entityId);
            return inventory;
        } catch (error){
            this.logger.error(`Error creating inventory for entity: ${entityId}: ${error.message}`);
            throw error;
        }
    }

    async getInventoryByentityId(entityId) {
      try {
        const inventory = await this.repository.getByentityId(entityId);
        return inventory;
      } catch (error) {
        this.logger.error(`Error getting inventory for Entity ${entityId}: ${error.message}`);
        throw error;
      }
    }
  
    async addItemToInventory(entityId, item) {
      try {
        const inventory = await this.getInventoryByentityId(entityId);
        if (!inventory) {
          await this.repository.createOrUpdate(entityId, { items: [item] });
        } else {
          await this.repository.addItem(entityId, item);
        }
        this.logger.info(`Item added to inventory for Entity: ${entityId}`);
      } catch (error) {
        this.logger.error(`Error adding item to inventory for Entity ${entityId}: ${error.message}`);
        throw error;
      }
    }
  
    async removeItemFromInventory(entityId, itemId) {
      try {
        await this.repository.removeItem(entityId, itemId);
        this.logger.info(`Item removed from inventory for Entity: ${entityId}`);
      } catch (error) {
        this.logger.error(`Error removing item from inventory for Entity ${entityId}: ${error.message}`);
        throw error;
      }
    }
  
    async listInventoryItems(entityId) {
      try {
        return await this.repository.getItems(entityId);
      } catch (error) {
        this.logger.error(`Error listing items in inventory for Entity ${entityId}: ${error.message}`);
        throw error;
      }
    }
  
    async equipItem(entityId, itemId) {
      try {
        const inventory = await this.getInventoryByentityId(entityId);
        const item = inventory.items.find(item => item._id === itemId);
  
        if (!item) {
          throw new Error(`Item with id ${itemId} not found`);
        }
  
        await this.repository.addItemToEquipped(entityId, item);
        this.logger.info(`Item equipped for Entity: ${entityId}`);
      } catch (error) {
        this.logger.error(`Error equipping item for Entity ${entityId}: ${error.message}`);
        throw error;
      }
    }
  
    async unequipItem(entityId, itemId) {
      try {
        const inventory = await this.getInventoryByentityId(entityId);
        const item = inventory.items.find(item => item._id === itemId);
  
        if (!item) {
          throw new Error(`Item with id ${itemId} not found`);
        }
  
        await this.repository.removeItemFromEquipped(entityId, itemId);
        this.logger.info(`Item unequipped for Entity: ${entityId}`);
      } catch (error) {
        this.logger.error(`Error unequipping item for Entity ${entityId}: ${error.message}`);
        throw error;
      }
    }
  
    async sellItem(entityId, itemId, price) {
      try {
        const inventory = await this.getInventoryByentityId(entityId);
        const item = inventory.items.find(item => item._id === itemId);
  
        if (!item) {
          throw new Error(`Item with id ${itemId} not found`);
        }
  
        await this.repository.removeItem(entityId, itemId);
        await this.repository.addGold(entityId, price);
  
        this.logger.info(`Item sold for ${price} gold by Entity: ${entityId}`);
      } catch (error) {
        this.logger.error(`Error selling item for Entity ${entityId}: ${error.message}`);
        throw error;
      }
    }
  }
  
  module.exports = InventoryService;
  