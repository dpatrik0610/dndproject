require('dotenv').config({ path: './.env' });
const express = require('express');

// Database
const { connectDB, getDB, closeDB } = require('./config/database');

// Routes
const ping = require('./routes/Ping');
const playerRoutes = require('./routes/PlayerRoutes');
const spellRoutes = require('./routes/SpellRoutes');

// Utils
const logEndpoints = require('./utils/logEndpoints');
const logCollections = require('./utils/logCollections');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB()
  .then(() => {
    const db = getDB();

    app.use('/api/ping', ping());
    app.use('/api/players', playerRoutes(db));
    app.use('/api/spells', spellRoutes(db));

    app.listen(PORT, async () => {
      console.log(`Server running on port ${PORT}`);

      logEndpoints(app);
      logCollections(db);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err.message);
  });

  process.on('SIGINT', async () => {
    await closeDB();
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    await closeDB();
    process.exit(0);
  });
