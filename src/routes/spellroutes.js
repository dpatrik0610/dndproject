const express = require('express');
const Dnd5eClient = require('../repositories/Dnd5eClient');
const SpellRepository = require("../repositories/SpellRepository");
const SpellService = require('../services/SpellService');
const SpellController = require('../controllers/SpellController');


module.exports = () => {
    const router = express.Router();
    // Repositories
    const dnd5eClient = new Dnd5eClient();
    const spellRepository = new SpellRepository();

    // Services
    const spellService = new SpellService(spellRepository, dnd5eClient);

    // Controller
    const spellController = new SpellController(spellService)

    router.get('/', (req, res) => spellController.getAll(req, res));

    return router;
}
