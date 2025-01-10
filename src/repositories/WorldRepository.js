const { ObjectId } = require("mongodb");
const LayeredError = require('../utils/LayeredError');

class WorldRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async getAll() {
    try {
      return await this.collection.find().toArray();
    } catch (error) {
      LayeredError.handleError(error, 'Error retrieving all worlds');
    }
  }

  async getById(worldId) {
    try {
      return await this.collection.findOne({ _id: new ObjectId(String(worldId)) });
    } catch (error) {
      LayeredError.handleError(error, `Error retrieving world with ID ${worldId}`);
    }
  }

  async create(worldData) {
    try {
      const existingWorld = await this.collection.findOne({ name: worldData.name });
      if (existingWorld) {
        throw new Error(`A world with the name '${worldData.name}' already exists.`);
      }
      const result = await this.collection.insertOne(worldData);
      return { ...worldData, _id: result.insertedId };
    } catch (error) {
      LayeredError.handleError(error, 'Error creating world');
    }
  }

  async update(worldId, worldData) {
    try {
      const existingWorld = await this.getById(worldId);
      if (!existingWorld) throw new Error(`World does not exist: ${worldId}`);

      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: worldData }
      );

      return { ...existingWorld, ...worldData };
    } catch (error) {
      LayeredError.handleError(error, `Error updating world with ID ${worldId}`);
    }
  }

  async delete(worldId) {
    try {
      const result = await this.collection.deleteOne({ _id: new ObjectId(String(worldId)) });
      return result.deletedCount > 0;
    } catch (error) {
      LayeredError.handleError(error, `Error deleting world with ID ${worldId}`);
    }
  }

  async addFaction(worldId, faction) {
    try {
      const world = await this.getById(worldId);
      if (!world) throw new Error('World does not exist.');

      const updatedFactions = [...world.factions, faction];

      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: { factions: updatedFactions } }
      );

      return await this.getById(worldId);
    } catch (error) {
      LayeredError.handleError(error, `Error adding faction to world with ID ${worldId}`);
    }
  }

  async addRegion(worldId, region) {
    try {
      const world = await this.getById(worldId);
      if (!world) throw new Error('World does not exist.');

      const updatedRegions = [...world.regions, region];

      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: { regions: updatedRegions } }
      );

      return await this.getById(worldId);
    } catch (error) {
      LayeredError.handleError(error, `Error adding region to world with ID ${worldId}`);
    }
  }

  async addGlobalItem(worldId, item) {
    try {
      const world = await this.getById(worldId);
      if (!world) throw new Error('World does not exist.');

      const updatedGlobalItems = [...world.globalItems, item];

      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: { globalItems: updatedGlobalItems } }
      );

      return await this.getById(worldId);
    } catch (error) {
      LayeredError.handleError(error, `Error adding global item to world with ID ${worldId}`);
    }
  }

  async addEvent(worldId, event) {
    try {
      const world = await this.getById(worldId);
      if (!world) throw new Error('World does not exist.');

      const updatedEvents = [...world.events, event];

      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: { events: updatedEvents } }
      );

      return await this.getById(worldId);
    } catch (error) {
      LayeredError.handleError(error, `Error adding event to world with ID ${worldId}`);
    }
  }

  async updateEconomy(worldId, newEconomyState) {
    try {
      const world = await this.getById(worldId);
      if (!world) throw new Error('World does not exist.');

      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: { economyState: newEconomyState } }
      );

      return await this.getById(worldId);
    } catch (error) {
      LayeredError.handleError(error, `Error updating economy state for world with ID ${worldId}`);
    }
  }

  async addPlayer(worldId, player) {
    try {
      const world = await this.getById(worldId);
      if (!world) throw new Error('World does not exist.');

      const updatedPlayers = [...world.players, player];

      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: { players: updatedPlayers } }
      );

      return await this.getById(worldId);
    } catch (error) {
      LayeredError.handleError(error, `Error adding player to world with ID ${worldId}`);
    }
  }

  async removePlayer(worldId, playerId) {
    try {
      const world = await this.getById(worldId);
      if (!world) throw new Error('World does not exist.');

      const updatedPlayers = world.players.filter(player => String(player.id) !== String(playerId));
      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: { players: updatedPlayers } }
      );

      return await this.getById(worldId);
    } catch (error) {
      LayeredError.handleError(error, `Error removing player from world with ID ${worldId}`);
    }
  }
}

module.exports = WorldRepository;
