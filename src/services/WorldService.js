class WorldService {
  constructor(worldRepository, logger) {
    this.repository = worldRepository;
    this.logger = logger;
  }

  async createWorld(newWorldData) {
    try {
      if (!newWorldData) throw new Error("Missing World Data Parameters.");

      const world = await this.repository.createOrUpdate(newWorldData._id, newWorldData);
      this.logger.info(`World "${newWorldData.name}" created successfully.`);

      return world;
    } catch (error) {
      this.logger.error(`Error creating world: ${error.message}`);
      throw error;
    }
  }

  async getAllWorlds() {
    try{
      const worlds = await this.repository.getAll();

      return worlds;
    } catch (error) {
      this.logger.error(`Error Fetching all worlds: ${error.message}`);
      throw error;
    }
  }
  
  async getWorldById(worldId) {
    try {
      const world = await this.repository.getById(worldId);

      if (!world) {
        this.logger.warning(`World with ID ${worldId} not found.`);
        throw new Error("World not found");
      }

      return world;
    } catch (error) {
      this.logger.error(`Error getting world by ID: ${error.message}`);
      throw error;
    }
  }

  async updateWorld(worldId, updates) {
    try {
      const world = await this.getWorldById(worldId);

      Object.assign(world, updates);
      await this.repository.createOrUpdate(worldId, world);

      this.logger.info(`World with ID ${worldId} updated successfully.`);
      return world;
    } catch (error) {
      this.logger.error(`Error updating world: ${error.message}`);
      throw error;
    }
  }

  async deleteWorld(worldId) {
    try {
      const world = await this.getWorldById(worldId);

      await this.repository.delete(worldId);
      this.logger.info(`World with ID ${worldId} deleted successfully.`);

      return world;
    } catch (error) {
      this.logger.error(`Error deleting world: ${error.message}`);
      throw error;
    }
  }

  async addFactionToWorld(worldId, faction) {
    try {
      const world = await this.getWorldById(worldId);

      await this.repository.addFaction(worldId, faction);
      this.logger.info(`Faction added to world ${worldId}: ${faction.name}`);

      return world;
    } catch (error) {
      this.logger.error(`Error adding faction to world: ${error.message}`);
      throw error;
    }
  }

  async addRegionToWorld(worldId, region) {
    try {
      const world = await this.getWorldById(worldId);

      await this.repository.addRegion(worldId, region);
      this.logger.info(`Region added to world ${worldId}: ${region.name}`);

      return world;
    } catch (error) {
      this.logger.error(`Error adding region to world: ${error.message}`);
      throw error;
    }
  }

  async addGlobalItemToWorld(worldId, item) {
    try {
      const world = await this.getWorldById(worldId);

      await this.repository.addGlobalItem(worldId, item);
      this.logger.info(`Global item added to world ${worldId}: ${item.name}`);

      return world;
    } catch (error) {
      this.logger.error(`Error adding global item to world: ${error.message}`);
      throw error;
    }
  }

  async updateEconomy(worldId, newEconomyState) {
    try {
      const world = await this.getWorldById(worldId);

      world.economyState = newEconomyState;
      await this.repository.updateEconomy(worldId, newEconomyState);

      this.logger.info(`Economy state updated for world ${worldId}`);
      return world;
    } catch (error) {
      this.logger.error(`Error updating economy state: ${error.message}`);
      throw error;
    }
  }

  async addEventToWorld(worldId, event) {
    try {
      const world = await this.getWorldById(worldId);

      await this.repository.addEvent(worldId, event);
      this.logger.info(`Event added to world ${worldId}: ${event.name}`);

      return world;
    } catch (error) {
      this.logger.error(`Error adding event to world: ${error.message}`);
      throw error;
    }
  }

  async addPlayerToWorld(worldId, player) {
    try {
      const world = await this.getWorldById(worldId);

      await this.repository.addPlayer(worldId, player);
      this.logger.info(`Player added to world ${worldId}: ${player.name}`);

      return world;
    } catch (error) {
      this.logger.error(`Error adding player to world: ${error.message}`);
      throw error;
    }
  }

  async removePlayerFromWorld(worldId, playerId) {
    try {
      const world = await this.getWorldById(worldId);

      await this.repository.removePlayerFromWorld(worldId, playerId);
      this.logger.info(`Player removed from world ${worldId}: ${player.name}`);

      return world;
    } catch (error) {
      this.logger.error(`Error removing player from world: ${error.message}`);
      throw error;
    }
  }

  async getWorldInfo(worldId) {
    try {
      const world = await this.getWorldById(worldId);

      return world;
    } catch (error) {
      this.logger.error(`Error getting world info: ${error.message}`);
      throw error;
    }
  }
}

module.exports = WorldService;
