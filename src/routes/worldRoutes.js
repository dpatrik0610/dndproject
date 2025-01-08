const express = require('express');
const WorldService = require('../services/WorldService');
const WorldRepository = require('../repositories/WorldRepository');
const { logTemplates: logger } = require('../utils/logTemplates');
const WorldController = require('../controllers/WorldController');
const validateRequest = require('../middlewares/ValidateRequest');
const worldValidator = require('../validators/worldValidator');

module.exports = (db) => {
  const router = express.Router();
  
  try {
    const worldRepository = new WorldRepository(db.collection('Worlds'));
    const worldService = new WorldService(worldRepository, logger);
    const worldController = new WorldController(worldService, logger);
    
    router.get('/', (req, res) => worldController.getAll(req, res));

    // World Operations
    router.get('/:worldId', (req, res) => worldController.getById(req, res));
    router.post('/create', validateRequest(worldValidator), (req, res) => worldController.create(req, res));
    router.put('/:worldId', validateRequest(worldValidator), (req, res) => worldController.update(req, res));
    router.delete('/:worldId', (req, res) => worldController.delete(req, res));

    // World Editors
    router.post('/:worldId/region', validateRequest(worldValidator), (req, res) => worldController.addRegion(req, res));
    router.post('/:worldId/faction', validateRequest(worldValidator), (req, res) => worldController.addFaction(req, res));
    router.post('/:worldId/item', validateRequest(worldValidator), (req, res) => worldController.addGlobalItem(req, res));
    router.put('/:worldId/economy', validateRequest(worldValidator), (req, res) => worldController.updateEconomy(req, res));
    router.post('/:worldId/event', validateRequest(worldValidator), (req, res) => worldController.addEvent(req, res));
    router.post('/:worldId/player', validateRequest(worldValidator), (req, res) => worldController.addPlayer(req, res));
    
    logger.success('World module loaded.');
  } catch (error) {
    logger.warning('Error loading world module', error.message);
  }
  
  return router;
};
