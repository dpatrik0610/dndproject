require('dotenv').config({ path: './.env' });
const express = require('express');
const DependencyContainer = require('./dependencyContainer');
const { connectDB, getDB, closeDB } = require('./config/database');

// Routes
const pingRoutes = require('./routes/pingRoutes');
const worldRoutes = require('./routes/worldRoutes');
const playerRoutes = require('./routes/playerRoutes');
const spellRoutes = require('./routes/spellRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

let server;

async function startServer() {
  const container = new DependencyContainer();
  const logger = container.get('logger');

  try {
    app.use(express.json());
    console.log('Starting server...\n');

    await connectDB();
    const db = getDB();
    await container.initialize(db);

    app.use('/api/ping', pingRoutes());
    app.use('/api/players', playerRoutes(container));
    app.use('/api/spells', spellRoutes(container));
    app.use('/api/inventory', inventoryRoutes(container));
    app.use('/api/world', worldRoutes(container));


    server = app.listen(PORT, () => {
      logger.success(`Server is running on port ${PORT}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        logger.error(`Port ${PORT} is already in use.`);
        process.exit(1);
      } else {
        throw err;
      }
    });
    
  } catch (err) {
    logger.error(`Server startup error: ${err}`);
  }
}

// Clean up resources
async function shutdown() {
  console.log('Shutting down server...');
  if (server) {
    server.close(() => console.log('Server closed.'));
  }
  await closeDB();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

startServer();
