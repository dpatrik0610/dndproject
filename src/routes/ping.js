const express = require('express');

module.exports = () => {
  const router = express.Router();

  router.get('/', (req, res) => {
    const start = Date.now();

    res.send('Pong');

    const end = Date.now();
    const responseTime = end - start;

    console.log(`Response time for /ping: ${responseTime}ms`);
  });

  return router;
};
