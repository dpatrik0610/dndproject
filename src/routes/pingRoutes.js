const express = require('express');

module.exports = () => {
  const router = express.Router();

  router.get('/', (req, res) => {
    const start = Date.now();
    const end = Date.now();
    
    const responseTime = end - start;
    
    res.json({message : 'Pong!', responseTime: responseTime});
  });

  return router;
};
