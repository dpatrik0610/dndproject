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
const infoRoutes = require('./routes/infoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const container = new DependencyContainer();
const logger = container.get('logger');

let server;

async function startServer() {

  try {
    app.use(express.json());
    logger.info('Starting server...\n');

    await connectDB();
    const db = getDB();
    await container.initialize(db);

    app.use('/api/ping', pingRoutes());
    app.use('/api/players', playerRoutes(container));
    app.use('/api/spells', spellRoutes(container));
    app.use('/api/inventory', inventoryRoutes(container));
    app.use('/api/world', worldRoutes(container));
    app.use('/api/info', infoRoutes(container, app));

    container.get('logCollections')(db);

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

    app.use((err, req, res, next) => {
      if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Invalid JSON payload' });
      }
      next(err);
    });

  } catch (err) {
    logger.error(`Server startup error: ${err}`);
  }
}

// Clean up resources
async function shutdown() {
  logger.info('Shutting down server...');
  if (server) {
    server.close(() => logger.info('Server closed.'));
  }
  await closeDB();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

startServer();
