require('dotenv').config({ path: './.env' });
const express = require('express');

const { connectDB, getDB } = require('./config/database');
const playerRoutes = require('./routes/playerRoutes');
const ping = require('./routes/ping');

const logEndpoints = require('./utils/logEndpoints');
const logCollections = require('./utils/logCollections');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB()
  .then(() => {
    const db = getDB();

    app.use('/api/players', playerRoutes(db, "Players"));
    app.use('/api/ping', ping());

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
