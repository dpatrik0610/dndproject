require('dotenv').config({ path: './.env' });
const express = require('express');

// Database
const { connectDB, getDB, closeDB } = require('./config/database');

// Routes
const ping = require('./routes/Ping');
const spellRoutes = require('./routes/spellroutes');
const playerRoutes = require('./routes/playerRoutes');
const inventoryRoutes = require("./routes/inventoryRoutes");
const worldRoutes = require('./routes/worldRoutes');

// Utils
const logEndpoints = require('./utils/logEndpoints');
const logCollections = require('./utils/logCollections');
const { logTemplates: logger } = require('./utils/logTemplates');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
console.log("\n");
logger.info("Starting up Server...\n");
connectDB()
  .then(() => {
    const db = getDB();

    app.use('/api/ping', ping());
    app.use('/api/spells', spellRoutes(db));
    app.use('/api/players', playerRoutes(db));
    app.use('/api/inventory', inventoryRoutes(db));
    app.use('/api/world', worldRoutes(db));
    app.get('/api/info', (req, res) => {
      const endpoints = logEndpoints(app);
      logger.info("Request made to /api/info");
    
      res.json({
        message: "Available API Endpoints",
        endpoints,
      });
    });
    
    logCollections(db);
    app.listen(PORT, async () => {
      logger.success(`Server running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    logger.error(`Failed to connect to the database: ${err.message}`);
  });

process.on('SIGINT', async () => {
  logger.warning('SIGINT signal received. Closing database connection...');
  await closeDB();
  logger.info('Database connection closed. Exiting process.');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.warning('SIGTERM signal received. Closing database connection...');
  await closeDB();
  logger.info('Database connection closed. Exiting process.');
  process.exit(0);
});
