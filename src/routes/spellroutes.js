const express = require('express');
const Dnd5eClient = require('../repositories/Dnd5eClient');
const SpellRepository = require("../repositories/SpellRepository");
const SpellService = require('../services/SpellService');
const SpellController = require('../controllers/SpellController');


module.exports = (db) => {
    const router = express.Router();
    // Repositories
    const dnd5eClient = new Dnd5eClient();
    const spellRepository = new SpellRepository(db);

    // Services
    const spellService = new SpellService(spellRepository, dnd5eClient);

    // Controller
    const spellController = new SpellController(spellService)

    router.get('/', (req, res) => spellController.getAll(req, res));
    router.get('/:index', (req, res) => spellController.getByIndex(req, res));

    router.post('/', (req, res) => spellController.create(req, res));

    router.put('/update/:index', (req, res) => spellController.update(req, res));
    router.delete('/delete/:index', (req, res) => spellController.delete(req, res));

    return router;
}
