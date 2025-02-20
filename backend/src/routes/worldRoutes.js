const express = require('express');

module.exports = (container) => {
  const router = express.Router();
  const worldController = container.get('worldController');
  const logger = container.get('logger');
  
  const validateRequest = container.get('validateRequest');
  const worldValidator = container.get('worldValidator');
  const validateWorldId = container.get('validateWorldId');
  const validatePlayerId = container.get('validatePlayerId');
  
  try {
    
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
