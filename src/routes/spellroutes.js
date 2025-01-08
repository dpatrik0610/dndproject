const express = require('express');
const Dnd5eClient = require('../repositories/Dnd5eClient');
const SpellRepository = require("../repositories/SpellRepository");

const SpellService = require('../services/SpellService');
const SpellController = require('../controllers/SpellController');

const validateRequest = require('../middlewares/ValidateRequest');
const spellValidator = require('../validators/SpellValidator');
const { logTemplates } = require('../utils/logTemplates');

module.exports = (db) => {
    const router = express.Router();
    try {
        const dnd5eClient = new Dnd5eClient();
        const spellRepository = new SpellRepository(db.collection('Spells'));
        
        const spellService = new SpellService(spellRepository, dnd5eClient, logTemplates);
        
        const spellController = new SpellController(spellService, logTemplates);
        
        router.get('/', (req, res) => spellController.getAll(req, res));
        router.get('/customspells', (req, res) => spellController.getAllCustom(req, res));
        router.get('/:index', (req, res) => spellController.getByIndex(req, res));
        
        router.post('/create', validateRequest(spellValidator), (req, res) => spellController.create(req, res));
        router.post('/validate', (req, res) => spellController.validateMultiple(req, res));
        
        router.put('/update/:index', (req, res) => spellController.update(req, res));
        router.delete('/delete/:index', (req, res) => spellController.delete(req, res));
        
        logTemplates.success("Spell Module loaded.");
    } catch (err) {
        logTemplates.warning("Couldn't load Spell Module.", err.message);
    }

    return router;
};
