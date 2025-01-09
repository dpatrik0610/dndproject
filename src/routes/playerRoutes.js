const express = require('express');
const PlayerController = require('../controllers/PlayerController');
const PlayerService = require('../services/PlayerService');
const CurrencyService = require('../services/CurrencyService');
const PlayerRepository = require('../repositories/PlayerRepository');
const CurrencyManager = require('../models/Inventory/CurrencyManager');

const validateRequest = require('../middlewares/ValidateRequest');
const validateSpells = require('../middlewares/ValidateSpells');
const playerValidator = require('../validators/playerValidator');
const { logTemplates } = require('../utils/logTemplates');

module.exports = (db) => {
  const router = express.Router();
  try {
    const currencyManager = new CurrencyManager();
    const playerRepository = new PlayerRepository(db.collection('Players'));
    const playerService = new PlayerService(playerRepository);
    const currencyService = new CurrencyService(playerRepository, currencyManager);

    const playerController = new PlayerController(playerService, currencyService, logTemplates);

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
    
    logTemplates.success('Player Module loaded.');
  } catch (err) {
    logTemplates.error(`Error initializing Player Manager: ${err.message}`);
  }

  return router;
};
