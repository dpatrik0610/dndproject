const express = require('express');

module.exports = (container) => {
  const router = express.Router();
  const logger = container.get('logger');
  const playerController = container.get('playerController');
  const validateSpells = container.get('validateSpells');
  const validateRequest = container.get('validateRequest');
  const playerValidator = container.get('playerValidator');
  
  try {

    router.get('/', (req, res) => playerController.getAllPlayers(req, res));
    router.get('/:playerId', (req, res) => playerController.getPlayerById(req, res));

    router.post('/create', validateSpells, validateRequest(playerValidator), (req, res) => playerController.createPlayer(req, res));
    router.put('/:playerId',validateSpells, validateRequest(playerValidator), (req, res) => playerController.updatePlayer(req, res));
    router.delete('/:playerId', (req, res) => playerController.deletePlayer(req, res));

    // Currencies
    router.get('/currency/:playerId/', (req, res) => playerController.getTotalCurrency(req, res));
    router.post('/currency/:playerId/', (req, res) => playerController.addCurrency(req, res));
    router.delete('/currency/:playerId/', (req, res) => playerController.removeCurrency(req, res));
    router.post('/currency/transfer/:playerId', (req, res) => playerController.transferCurrency(req, res));
    
    logger.success('Player Module loaded.');
  } catch (err) {
    logger.error(`Error initializing Player Manager: ${err.message}`);
  }

  return router;
};
