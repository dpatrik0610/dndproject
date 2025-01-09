const express = require('express');

module.exports = (container) => {
  const router = express.Router();
  const logger = container.get('logger');
  const inventoryController = container.get('inventoryController');

  try {
    router.get('/:entityId', (req, res) => inventoryController.getInventoryByentityId(req, res));
    router.post('/:entityId/items', (req, res) => inventoryController.addItemToInventory(req, res));
    router.delete('/:entityId/items/:itemId', (req, res) => inventoryController.removeItemFromInventory(req, res));
    router.get('/:entityId/items', (req, res) => inventoryController.listInventoryItems(req, res));

    // Equipment management routes
    router.post('/:entityId/items/:itemId/equip', (req, res) => inventoryController.equipItem(req, res));
    router.post('/:entityId/items/:itemId/unequip', (req, res) => inventoryController.unequipItem(req, res));

    // Sell item route
    router.post('/:entityId/items/:itemId/sell', (req, res) => inventoryController.sellItem(req, res));

    logger.success('Inventory Module loaded.');
  } catch (err) {
    logger.warning("Couldn't load Inventory Module.", err.message);
  }

  return router;
};
