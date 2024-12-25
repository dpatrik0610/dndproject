require('dotenv').config({ path: './.env' });
const express = require('express');

// Database
const { connectDB, getDB, closeDB } = require('./config/database');

// Routes
const ping = require('./routes/Ping');
const spellRoutes = require('./routes/spellroutes');
const playerRoutes = require('./routes/playerRoutes');

// Utils
const logEndpoints = require('./utils/logEndpoints');
const logCollections = require('./utils/logCollections');
const { logTemplates } = require('./utils/logTemplates');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB()
  .then(() => {
    const db = getDB();

    app.use('/api/ping', ping());
    app.use('/api/spells', spellRoutes(db));
    app.use('/api/players', playerRoutes(db));
    app.use('/api/info', () => {
      logEndpoints(app);
      logCollections(db);
    });
    app.listen(PORT, async () => {
      logTemplates.success(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logTemplates.error(`Failed to connect to the database: ${err.message}`);
  });

process.on('SIGINT', async () => {
  logTemplates.warning('SIGINT signal received. Closing database connection...');
  await closeDB();
  logTemplates.info('Database connection closed. Exiting process.');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logTemplates.warning('SIGTERM signal received. Closing database connection...');
  await closeDB();
  logTemplates.info('Database connection closed. Exiting process.');
  process.exit(0);
});
