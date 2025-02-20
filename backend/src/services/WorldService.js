const LayeredError = require('../utils/LayeredError');

class WorldService {
  constructor(worldRepository, logger) {
    this.repository = worldRepository;
    this.logger = logger;
  }

  async createWorld(newWorldData) {
    try {
      if (!newWorldData) throw new Error("Missing World Data Parameters.");
      const world = await this.repository.create(newWorldData);
      return world;
    } catch (error) {
      LayeredError.handleError(error, 'createWorld');
    }
  }

  async getAllWorlds() {
    try {
      const worlds = await this.repository.getAll();
      return worlds;
    } catch (error) {
      LayeredError.handleError(error, 'getAllWorlds');
    }
  }

  async getWorldById(worldId) {
    try {
      const world = await this.repository.getById(worldId);
      if (!world) return null;
      return world;
    } catch (error) {
      LayeredError.handleError(error, 'getWorldById');
    }
  }

  async updateWorld(worldId, updates) {
    try {
      const world = await this.getWorldById(worldId);
      if (!world) throw new Error(`World with ID ${worldId} not found.`);
      Object.assign(world, updates);
      await this.repository.update(worldId, world);
      return world;
    } catch (error) {
      LayeredError.handleError(error, 'updateWorld');
    }
  }

  async deleteWorld(worldId) {
    try {
      const world = await this.getWorldById(worldId);
      if (!world) return null;
      await this.repository.delete(worldId);
      return world;
    } catch (error) {
      LayeredError.handleError(error, 'deleteWorld');
    }
  }

  async addFactionToWorld(worldId, faction) {
    try {
      const world = await this.getWorldById(worldId);
      if (!world) throw new Error(`World with ID ${worldId} not found.`);
      await this.repository.addFaction(worldId, faction);
      return world;
    } catch (error) {
      LayeredError.handleError(error, 'addFactionToWorld');
    }
  }

  async addRegionToWorld(worldId, region) {
    try {
      const world = await this.getWorldById(worldId);
      if (!world) throw new Error(`World with ID ${worldId} not found.`);
      await this.repository.addRegion(worldId, region);
      return world;
    } catch (error) {
      LayeredError.handleError(error, 'addRegionToWorld');
    }
  }

  async addGlobalItemToWorld(worldId, item) {
    try {
      const world = await this.getWorldById(worldId);
      if (!world) throw new Error(`World with ID ${worldId} not found.`);
      await this.repository.addGlobalItem(worldId, item);
      return world;
    } catch (error) {
      LayeredError.handleError(error, 'addGlobalItemToWorld');
    }
  }

  async updateEconomy(worldId, newEconomyState) {
    try {
      const world = await this.getWorldById(worldId);
      if (!world) throw new Error(`World with ID ${worldId} not found.`);
      world.economyState = newEconomyState;
      await this.repository.updateEconomy(worldId, newEconomyState);
      return world;
    } catch (error) {
      LayeredError.handleError(error, 'updateEconomy');
    }
  }

  async addEventToWorld(worldId, event) {
    try {
      const world = await this.getWorldById(worldId);
      if (!world) throw new Error(`World with ID ${worldId} not found.`);
      await this.repository.addEvent(worldId, event);
      return world;
    } catch (error) {
      LayeredError.handleError(error, 'addEventToWorld');
    }
  }

  async addPlayerToWorld(worldId, player) {
    try {
      const world = await this.getWorldById(worldId);
      if (!world) throw new Error(`World with ID ${worldId} not found.`);

      const existingPlayer = world.players.find(existing => String(existing.id) === String(player.id));
      if (existingPlayer) {
        throw new LayeredError(`Player with ID ${player.id} already exists in the world.`, 'WorldService - addPlayerToWorld');
      }

      await this.repository.addPlayer(worldId, player);
      return await this.getWorldById(worldId);
    } catch (error) {
      LayeredError.handleError(error, 'addPlayerToWorld');
    }
  }

  async removePlayerFromWorld(worldId, playerId) {
    try {
      const world = await this.getWorldById(worldId);
      if (!world) throw new Error(`World with ID ${worldId} not found.`);

      const playerIndex = world.players.findIndex(player => String(player.id) === String(playerId));
      if (playerIndex === -1) {
        throw new LayeredError(`Player with ID ${playerId} not found in world ${worldId}.`, 'WorldService - removePlayerFromWorld');
      }

      await this.repository.removePlayer(worldId, playerId);
      return world;
    } catch (error) {
      LayeredError.handleError(error, 'removePlayerFromWorld');
    }
  }

  async getWorldInfo(worldId) {
    try {
      return await this.getWorldById(worldId);
    } catch (error) {
      LayeredError.handleError(error, 'getWorldInfo');
    }
  }
}

module.exports = WorldService;
