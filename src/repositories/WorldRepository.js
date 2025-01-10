const { ObjectId } = require("mongodb");
const LayeredError = require('../utils/LayeredError');
const { logger } = require("../utils/logger");

class WorldRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async getAll() {
    try {
      return await this.collection.find().toArray();
    } catch (error) {
      throw new LayeredError(`Error getting worlds: ${error}`, 'WorldRepository');
    }
  }

  async getById(worldId) {
    try {
      return await this.collection.findOne({ _id: new ObjectId(String(worldId)) });
    } catch (error) {
      throw new LayeredError(`Error getting world with ID ${worldId}: ${error}`, 'WorldRepository');
    }
  }

  async create(worldData) {
    try {
      const existingWorld = await this.collection.findOne({ name: worldData.name });
      if (existingWorld) {
        throw new LayeredError(`A world with the name '${worldData.name}' already exists.`, 'WorldRepository', 400);
      }
      const result = await this.collection.insertOne(worldData);
      return { ...worldData, _id: result.insertedId };
    } catch (error) {
      throw new LayeredError(`Error creating world: ${error}`, 'WorldRepository');
    }
  }

  async update(worldId, worldData) {
    try {
      const existingWorld = await this.getById(worldId);
      if (!existingWorld) throw new LayeredError(`World does not exist: ${worldId}`, "WorldRepository", 404);

      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: worldData }
      );

      return { ...existingWorld, ...worldData };
    } catch (error) {
      throw new LayeredError(`Error updating world with ID ${worldId}: ${error}`, 'WorldRepository');
    }
  }

  async delete(worldId) {
    try {
      const result = await this.collection.deleteOne({ _id: new ObjectId(String(worldId)) });
      return result.deletedCount > 0;
    } catch (error) {
      throw new LayeredError(`Error deleting world with ID ${worldId}: ${error}`, 'WorldRepository');
    }
  }

  async addFaction(worldId, faction) {
    try {
      const world = await this.getById(worldId);
      if (!world) throw new LayeredError(`World does not exist.`, 'WorldRepository', 404);

      const updatedFactions = [...world.factions, faction];

      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: { factions: updatedFactions } }
      );

      return await this.getById(worldId);
    } catch (error) {
      throw new LayeredError(`Error adding faction to world with ID ${worldId}: ${error}`, 'WorldRepository');
    }
  }

  async addRegion(worldId, region) {
    try {
      const world = await this.getById(worldId);
      if (!world) throw new LayeredError(`World does not exist.`, 'WorldRepository', 404);

      const updatedRegions = [...world.regions, region];

      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: { regions: updatedRegions } }
      );

      return await this.getById(worldId);
    } catch (error) {
      throw new LayeredError(`Error adding region to world with ID ${worldId}: ${error}`, 'WorldRepository');
    }
  }

  async addGlobalItem(worldId, item) {
    try {
      const world = await this.getById(worldId);
      if (!world) throw new LayeredError(`World does not exist.`, 'WorldRepository', 404);

      const updatedGlobalItems = [...world.globalItems, item];

      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: { globalItems: updatedGlobalItems } }
      );

      return await this.getById(worldId);
    } catch (error) {
      throw new LayeredError(`Error adding global item to world with ID ${worldId}: ${error}`, 'WorldRepository');
    }
  }

  async addEvent(worldId, event) {
    try {
      const world = await this.getById(worldId);
      if (!world) throw new LayeredError(`World does not exist.`, 'WorldRepository', 404);

      const updatedEvents = [...world.events, event];

      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: { events: updatedEvents } }
      );

      return await this.getById(worldId);
    } catch (error) {
      throw new LayeredError(`Error adding event to world with ID ${worldId}: ${error}`, 'WorldRepository');
    }
  }

  async updateEconomy(worldId, newEconomyState) {
    try {
      const world = await this.getById(worldId);
      if (!world) throw new LayeredError(`World does not exist.`, 'WorldRepository');

      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: { economyState: newEconomyState } }
      );

      return await this.getById(worldId);
    } catch (error) {
      throw new LayeredError(`Error updating economy state for world with ID ${worldId}: ${error}`, 'WorldRepository');
    }
  }

  async addPlayer(worldId, player) {
    try {
      const world = await this.getById(worldId);
      if (!world) throw new LayeredError(`World does not exist.`, 'WorldRepository', 404);

      const updatedPlayers = [...world.players, player];

      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: { players: updatedPlayers } }
      );

      return await this.getById(worldId);
    } catch (error) {
      throw new LayeredError(`Error adding player to world with ID ${worldId}: ${error}`, 'WorldRepository');
    }
  }

  async removePlayer(worldId, playerId) {
    try {
      const world = await this.getById(worldId);
      if (!world) throw new LayeredError(`World does not exist.`, 'WorldRepository', 404);

      const updatedPlayers = world.players.filter(player => String(player.id) !== String(playerId));
      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: { players: updatedPlayers } }
      );

      return await this.getById(worldId);
    } catch (error) {
      throw new LayeredError(`Error removing player from world with ID ${worldId}: ${error}`, 'WorldRepository');
    }
  }
}

module.exports = WorldRepository;
