const LayeredError = require('../utils/LayeredError');

class WorldService {
  constructor(worldRepository, logger) {
    this.repository = worldRepository;
    this.logger = logger;
  }

  async _handleWorldAction(worldId, actionName, actionFn) {
    try {
      const world = await this.getWorldById(worldId);
      const result = await actionFn(world);
      this.logger.info(`${actionName} action completed successfully for world ID ${worldId}`);
      return result;
    } catch (error) {
      this.logger.error(`Error performing ${actionName} action for world ID ${worldId}: ${error.message}`);
      throw new LayeredError(error.message, 'WorldService');
    }
  }

  async createWorld(newWorldData) {
    try {
      if (!newWorldData) throw new Error("Missing World Data Parameters.");
      const world = await this.repository.create(newWorldData);
      this.logger.info(`World "${newWorldData.name}" created successfully.`);
      return world;
    } catch (error) {
      this.logger.error(`Error creating world: ${error.message}`);
      throw new LayeredError(error.message, 'WorldService');
    }
  }

  async getAllWorlds() {
    try {
      const worlds = await this.repository.getAll();
      return worlds;
    } catch (error) {
      this.logger.error(`Error fetching all worlds: ${error.message}`);
      throw new LayeredError(error.message, 'WorldService');
    }
  }

  async getWorldById(worldId) {
    try {
      const world = await this.repository.getById(worldId);
      if (!world) {
        this.logger.warning(`World with ID ${worldId} not found.`);
        throw new LayeredError("World not found", 'WorldService');
      }
      return world;
    } catch (error) {
      this.logger.error(`Error getting world by ID: ${error.message}`);
      throw new LayeredError(error.message, 'WorldService');
    }
  }

  async updateWorld(worldId, updates) {
    return this._handleWorldAction(worldId, 'update', async (world) => {
      Object.assign(world, updates);
      await this.repository.update(worldId, world);
      return world;
    });
  }

  async deleteWorld(worldId) {
    return this._handleWorldAction(worldId, 'delete', async (world) => {
      await this.repository.delete(worldId);
      return world;
    });
  }

  async addFactionToWorld(worldId, faction) {
    return this._handleWorldAction(worldId, 'add faction', async (world) => {
      await this.repository.addFaction(worldId, faction);
      return world;
    });
  }

  async addRegionToWorld(worldId, region) {
    return this._handleWorldAction(worldId, 'add region', async (world) => {
      await this.repository.addRegion(worldId, region);
      return world;
    });
  }

  async addGlobalItemToWorld(worldId, item) {
    return this._handleWorldAction(worldId, 'add global item', async (world) => {
      await this.repository.addGlobalItem(worldId, item);
      return world;
    });
  }

  async updateEconomy(worldId, newEconomyState) {
    return this._handleWorldAction(worldId, 'update economy', async (world) => {
      world.economyState = newEconomyState;
      await this.repository.updateEconomy(worldId, newEconomyState);
      return world;
    });
  }

  async addEventToWorld(worldId, event) {
    return this._handleWorldAction(worldId, 'add event', async (world) => {
      await this.repository.addEvent(worldId, event);
      return world;
    });
  }

  async addPlayerToWorld(worldId, player) {
    return this._handleWorldAction(worldId, 'add player', async (world) => {
      await this.repository.addPlayer(worldId, player);
      return world;
    });
  }

  async removePlayerFromWorld(worldId, playerId) {
    try {
      const world = await this.getWorldById(worldId);
      const playerIndex = world.players.findIndex(player => player.id === playerId);

      if (playerIndex === -1) {
        throw new LayeredError(`Player with ID ${playerId} not found in world ${worldId}.`, 'WorldService');
      }

      await this.repository.removePlayer(worldId, playerId);
      this.logger.info(`Player with ID ${playerId} removed from world ${worldId}`);
      return world;
    } catch (error) {
      this.logger.error(`Error removing player with ID ${playerId} from world ${worldId}: ${error.message}`);
      throw new LayeredError(error.message, 'WorldService');
    }
  }

  async getWorldInfo(worldId) {
    try {
      return await this.getWorldById(worldId);
    } catch (error) {
      this.logger.error(`Error getting world info: ${error.message}`);
      throw new LayeredError(error.message, 'WorldService');
    }
  }
}

module.exports = WorldService;
