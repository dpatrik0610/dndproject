const express = require('express');
const axios = require('axios');

module.exports = () => {
    const router = express.Router();
    router.get('/', async (req, res) => {
        try {
            const response = await axios.get(process.env.EXTERNAL_DND_API + '/spells');
        
            res.json(response.data);
          } catch (err) {
            console.error('Error fetching spells:', err);
            res.status(500).json({ message: 'Error fetching spells from the external API.' });
          }
    })

    
    return router;
}
