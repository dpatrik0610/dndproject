class InventoryController {
    constructor(inventoryService, logger) {
      this.inventoryService = inventoryService;
      this.logger = logger;
    }
  
    async getInventoryByEntityId(req, res) {
      try {
        const { EntityId } = req.params;
        const inventory = await this.inventoryService.getInventoryByEntityId(EntityId);

        if (!inventory) {
          return res.status(404).json({ error: 'Inventory not found' });
        }

        res.status(200).json(inventory);
      } catch (error) {
        this.logger.error(`Error getting inventory for entity ${req.params.EntityId}: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch inventory' });
      }
    }
  
    async addItemToInventory(req, res) {
      try {
        const { EntityId } = req.params;
        const item = req.body;

        await this.inventoryService.addItemToInventory(EntityId, item);

        res.status(200).json({ message: 'Item added to inventory' });
      } catch (error) {
        this.logger.error(`Error adding item to inventory for entity ${EntityId}: ${error.message}`);
        res.status(500).json({ error: 'Failed to add item to inventory' });
      }
    }
  
    async removeItemFromInventory(req, res) {
      try {
        const { EntityId, itemId } = req.params;
        await this.inventoryService.removeItemFromInventory(EntityId, itemId);

        res.status(200).json({ message: 'Item removed from inventory' });
      } catch (error) {
        this.logger.error(`Error removing item from inventory for entity ${EntityId}: ${error.message}`);
        res.status(500).json({ error: 'Failed to remove item from inventory' });
      }
    }
  
    async listInventoryItems(req, res) {
      try {
        const { EntityId } = req.params;
        const items = await this.inventoryService.listInventoryItems(EntityId);
        
        res.status(200).json(items);
      } catch (error) {
        this.logger.error(`Error listing items in inventory for entity ${EntityId}: ${error.message}`);
        res.status(500).json({ error: 'Failed to list items in inventory' });
      }
    }
  
    async equipItem(req, res) {
      try {
        const { EntityId, itemId } = req.params;
        await this.inventoryService.equipItem(EntityId, itemId);

        res.status(200).json({ message: 'Item equipped' });
      } catch (error) {
        this.logger.error(`Error equipping item for entity ${EntityId}: ${error.message}`);
        res.status(500).json({ error: 'Failed to equip item' });
      }
    }
  
    async unequipItem(req, res) {
      try {
        const { EntityId, itemId } = req.params;
        await this.inventoryService.unequipItem(EntityId, itemId);

        res.status(200).json({ message: 'Item unequipped' });
      } catch (error) {
        this.logger.error(`Error unequipping item for entity ${EntityId}: ${error.message}`);
        res.status(500).json({ error: 'Failed to unequip item' });
      }
    }
  
    async sellItem(req, res) {
      try {
        const { EntityId, itemId } = req.params;
        const { price } = req.body;

        await this.inventoryService.sellItem(EntityId, itemId, price);

        res.status(200).json({ message: `Item sold for ${price} gold` });
      } catch (error) {
        this.logger.error(`Error selling item for entity ${EntityId}: ${error.message}`);
        res.status(500).json({ error: 'Failed to sell item' });
      }
    }
  }
  
  module.exports = InventoryController;
  