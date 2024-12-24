const express = require('express');
const PlayerController = require('../controllers/PlayerController');
const PlayerService = require('../services/PlayerService');
const PlayerRepository = require('../repositories/PlayerRepository');

module.exports = (db) => {
  const router = express.Router();

  const playerRepository = new PlayerRepository(db.collection("Players"));
  const playerService = new PlayerService(playerRepository);
  const playerController = new PlayerController(playerService);

  router.get('/', (req, res) => playerController.getAll(req, res));
  router.post('/', (req, res) => playerController.create(req, res));

  return router;
};
