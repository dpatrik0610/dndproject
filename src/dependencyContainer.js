const Logger = require('./utils/logger');
const WorldRepository = require('./repositories/WorldRepository');
const PlayerRepository = require('./repositories/PlayerRepository');
const Dnd5eClient = require('./repositories/Dnd5eClient');
const InventoryRepository = require('./repositories/InventoryRepository');
const SpellRepository = require('./repositories/SpellRepository');
 
const WorldService = require('./services/WorldService');
const CurrencyService = require('./services/CurrencyService');
const InventoryService = require('./services/InventoryService');
const PlayerService = require('./services/PlayerService');
const SpellService = require('./services/SpellService');


const WorldController = require('./controllers/WorldController');
const PlayerController = require('./controllers/PlayerController');
const InventoryController = require('./controllers/InventoryController');
const SpellController = require('./controllers/SpellController');

const CurrencyManager = require('./models/Inventory/CurrencyManager');
const World = require('./models/World/World');

class DependencyContainer {
  constructor(database) {
    this.dependencies = {};
    this.db = database;
  }

  async initialize() {

    // Logger
    const logger = new Logger();

    // Repositories
    const worldRepository = new WorldRepository(this.db.collection('Worlds'));
    const playerRepository = new PlayerRepository(this.db.collection('Players'));
    const inventoryRepository = new InventoryRepository(this.db.collection('Inventories'));
    const spellRepository = new SpellRepository(this.db.collection("Spells"));
    const dnd5eClient = new Dnd5eClient();

    // Services
    const worldService = new WorldService(worldRepository, logger);
    const playerService = new PlayerService(playerRepository, logger);
    const inventoryService = new InventoryService(inventoryRepository, logger);
    const spellService = new SpellService(spellRepository, dnd5eClient, logger);
    const currencyService = new CurrencyService(playerRepository, CurrencyManager);

    // Controllers
    const worldController = new WorldController(worldService, playerService, logger, World);
    const playerController = new PlayerController(playerService, currencyService, logger);
    const inventoryController = new InventoryController(inventoryService, logger);
    const spellController = new SpellController(spellService, logger);


    // Store dependencies
    this.dependencies = {
      logger,
      worldRepository,
      playerRepository,
      inventoryRepository,
      spellRepository,
      dnd5eClient,

      worldService,
      playerService,
      inventoryService,
      spellService,
      currencyService,

      worldController,
      playerController,
      inventoryController,
      spellController
    };
    return this;
  }

  get(key) {
    return this.dependencies[key];
  }
}

module.exports = new DependencyContainer();
