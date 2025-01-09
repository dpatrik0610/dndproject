const express = require('express');

module.exports = (container) => {
    const router = express.Router();
    const spellController = container.get('spellController');
    const logger = container.get('logger');

    const validateRequest = container.get('validateRequest');
    const spellValidator = container.get('spellValidator');

    try {
        router.get('/', (req, res) => spellController.getAll(req, res));
        router.get('/customspells', (req, res) => spellController.getAllCustom(req, res));
        router.get('/:index', (req, res) => spellController.getByIndex(req, res));
        
        router.post('/create', validateRequest(spellValidator), (req, res) => spellController.create(req, res));
        router.post('/validate', (req, res) => spellController.validateMultiple(req, res));
        
        router.put('/update/:index', (req, res) => spellController.update(req, res));
        router.delete('/delete/:index', (req, res) => spellController.delete(req, res));
        
        logger.success("Spell Module loaded.");
    } catch (err) {
        logger.warning(err);
    }

    return router;
};
