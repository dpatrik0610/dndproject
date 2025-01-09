const express = require('express');
const World = require('../models/World/World');

const WorldService = require('../services/WorldService');
const WorldRepository = require('../repositories/WorldRepository');
const WorldController = require('../controllers/WorldController');

const PlayerService = require('../services/PlayerService');
const PlayerRepository = require('../repositories/PlayerRepository');

const validateWorldId = require('../middlewares/ValidateWorldId');
const validatePlayerId = require('../middlewares/ValidatePlayerId');

const validateRequest = require('../middlewares/ValidateRequest');
const worldValidator = require('../validators/worldValidator');
const { logTemplates: logger } = require('../utils/logTemplates');

module.exports = (db) => {
  const router = express.Router();
  
  try {
    const worldRepository = new WorldRepository(db.collection('Worlds'));
    const worldService = new WorldService(worldRepository, logger);

    const playerRepository = new PlayerRepository(db.collection('Players'));
    const playerService = new PlayerService(playerRepository);

    const worldController = new WorldController(worldService, playerService, logger, World);
    
    router.get('/', (req, res) => worldController.getAll(req, res));

    // World Operations
    router.get('/:worldId', validateWorldId, (req, res) => worldController.getById(req, res));
    router.post('/create', validateRequest(worldValidator), (req, res) => worldController.create(req, res));
    router.put('/:worldId', validateWorldId, validateRequest(worldValidator), (req, res) => worldController.update(req, res));
    router.delete('/:worldId', (req, res) => worldController.delete(req, res));

    // World Editors
    router.post('/:worldId/region', validateWorldId, (req, res) => worldController.addRegion(req, res));
    router.post('/:worldId/faction', validateWorldId, (req, res) => worldController.addFaction(req, res));
    router.post('/:worldId/item', validateWorldId, (req, res) => worldController.addGlobalItem(req, res));
    router.put('/:worldId/economy', validateWorldId, (req, res) => worldController.updateEconomy(req, res));

    router.post('/:worldId/event', (req, res) => worldController.addEvent(req, res));
    
    router.post('/:worldId/player/:playerId', validateWorldId, validatePlayerId, (req, res) => worldController.addPlayer(req, res));
    router.delete('/:worldId/player/:playerId', validateWorldId, validatePlayerId, (req, res) => worldController.removePlayer(req,res));
    
    logger.success('World module loaded.');
  } catch (error) {
    logger.warning('Error loading world module', error.message);
  }
  
  return router;
};
