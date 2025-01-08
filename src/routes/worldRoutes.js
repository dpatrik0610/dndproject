const express = require('express');
const World = require('../models/World/World');
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
    const worldController = new WorldController(worldService, logger, World);
    
    router.get('/', (req, res) => worldController.getAll(req, res));

    // World Operations
    router.get('/:worldId', (req, res) => worldController.getById(req, res));
    router.post('/create', validateRequest(worldValidator), (req, res) => worldController.create(req, res));
    router.put('/:worldId', validateRequest(worldValidator), (req, res) => worldController.update(req, res));
    router.delete('/:worldId', (req, res) => worldController.delete(req, res));

    // World Editors
    router.post('/:worldId/region', (req, res) => worldController.addRegion(req, res));
    router.post('/:worldId/faction', (req, res) => worldController.addFaction(req, res));
    router.post('/:worldId/item', (req, res) => worldController.addGlobalItem(req, res));
    router.put('/:worldId/economy', (req, res) => worldController.updateEconomy(req, res));
    router.post('/:worldId/event', (req, res) => worldController.addEvent(req, res));
    router.post('/:worldId/player', (req, res) => worldController.addPlayer(req, res));
    
    logger.success('World module loaded.');
  } catch (error) {
    logger.warning('Error loading world module', error.message);
  }
  
  return router;
};
