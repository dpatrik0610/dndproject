// routes/InventoryRoutes.js
const express = require('express');
const InventoryRepository = require('../repositories/InventoryRepository');
const InventoryService = require('../services/InventoryService');
const InventoryController = require('../controllers/InventoryController');
const { logTemplates: logger } = require('../utils/logTemplates');

module.exports = (db) => {
  const router = express.Router();
  try {
    const inventoryRepository = new InventoryRepository(db.collection('Inventories'));
    const inventoryService = new InventoryService(inventoryRepository, logger);
    const inventoryController = new InventoryController(inventoryService, logger);

    router.get('/:playerId', (req, res) => inventoryController.getInventoryByPlayerId(req, res));
    router.post('/:playerId/items', (req, res) => inventoryController.addItemToInventory(req, res));
    router.delete('/:playerId/items/:itemId', (req, res) => inventoryController.removeItemFromInventory(req, res));
    router.get('/:playerId/items', (req, res) => inventoryController.listInventoryItems(req, res));

    // Equipment management routes
    router.post('/:playerId/items/:itemId/equip', (req, res) => inventoryController.equipItem(req, res));
    router.post('/:playerId/items/:itemId/unequip', (req, res) => inventoryController.unequipItem(req, res));

    // Sell item route
    router.post('/:playerId/items/:itemId/sell', (req, res) => inventoryController.sellItem(req, res));

    logger.success('Inventory Module loaded.');
  } catch (err) {
    logger.warning("Couldn't load Inventory Module.", err.message);
  }

  return router;
};
