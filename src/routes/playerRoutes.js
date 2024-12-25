const express = require('express');
const PlayerController = require('../controllers/PlayerController');
const PlayerService = require('../services/PlayerService');
const PlayerRepository = require('../repositories/PlayerRepository');
const CurrencyManager = require('../models/Player/PlayerCurrencyManager');
const { logTemplates } = require('../utils/logTemplates');

module.exports = (db) => {
  const router = express.Router();
  try {
    const playerRepository = new PlayerRepository(db.collection('Players'));
    const currencyManager = new CurrencyManager();
    const playerService = new PlayerService(playerRepository, currencyManager);
    const playerController = new PlayerController(playerService, logTemplates);

    router.get('/players', (req, res) => playerController.getPlayers(req, res));
    router.get('/player/:playerId', (req, res) => playerController.getPlayerById(req, res));
    router.post('/player', (req, res) => playerController.createPlayer(req, res));
    router.put('/player/:playerId', (req, res) => playerController.updatePlayer(req, res));
    router.delete('/player/:playerId', (req, res) => playerController.deletePlayer(req, res));
    router.get('/player/:playerId/currency', (req, res) => playerController.getTotalCurrency(req, res));
    router.post('/player/:playerId/currency/add', (req, res) => playerController.addCurrency(req, res));
    router.delete('/player/:playerId/currency/remove', (req, res) => playerController.removeCurrency(req, res));
    router.post('/player/:playerId/currency/transfer', (req, res) => playerController.transferCurrency(req, res));
    
    logTemplates.success('Player Module loaded.');
  } catch (err) {
    logTemplates.error(`Error initializing Player Manager: ${err.message}`);
  }

  return router;
};
