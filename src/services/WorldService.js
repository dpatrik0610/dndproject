class WorldService {
  constructor(worldRepository, logger) {
    this.repository = worldRepository;
    this.logger = logger;
  }

  async createWorld(newWorldData) {
    try {
      if (!newWorldData) throw new Error("Missing World Data Parameters.")
      await this.repository.create(newWorldData);
      this.logger.info(`World "${newWorldData.name}" created successfully.`);

      return newWorld;
    } catch (error) {
      this.logger.error(`Error creating world: ${error.message}`);
      throw error;
    }
  }

  async getWorldById(worldId) {
    try {
      const world = await this.repository.getById(worldId);

      if (!world) {
        this.logger.warn(`World with ID ${worldId} not found.`);
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
      await this.repository.update(worldId, world);
      
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

      world.addFaction(faction);
      await this.repository.update(worldId, world);

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
      world.addRegion(region);

      await this.repository.update(worldId, world);
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

      world.addGlobalItem(item);
      await this.repository.update(worldId, world);

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

      world.updateEconomyState(newEconomyState);
      await this.repository.update(worldId, world);

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

      world.addEvent(event);
      await this.repository.update(worldId, world);

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

      world.addPlayer(player);
      await this.repository.update(worldId, world);

      this.logger.info(`Player added to world ${worldId}: ${player.name}`);
      return world;
    } catch (error) {
      this.logger.error(`Error adding player to world: ${error.message}`);
      throw error;
    }
  }

  async getWorldInfo(worldId) {
    try {
      const world = await this.getWorldById(worldId);

      return world.getWorldInfo();
    } catch (error) {
      this.logger.error(`Error getting world info: ${error.message}`);
      throw error;
    }
  }
}

module.exports = WorldService;
