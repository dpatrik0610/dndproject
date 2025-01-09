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
      throw new LayeredError(`Error getting worlds: ${error.message}`, 'WorldRepository');
    }
  }

  async getById(worldId) {
    try {
      return await this.collection.findOne({ _id: new ObjectId(String(worldId)) });
    } catch (error) {
      throw new LayeredError(`Error getting world with ID ${worldId}: ${error.message}`, 'WorldRepository');
    }
  }

  async create(worldData) {
    try {
      const existingWorld = await this.collection.findOne({ name: worldData.name });

      if (existingWorld) {
        throw new LayeredError(`A world with the name '${worldData.name}' already exists.`, 'WorldRepository');
      }

      const result = await this.collection.insertOne(worldData);
      return { ...worldData, _id: result.insertedId };
    } catch (error) {
      throw new LayeredError(`Error creating world: ${error.message}`, 'WorldRepository');
    }
  }

  async update(worldId, worldData) {
    try {
      const existingWorld = await this.getById(worldId);
      if (!existingWorld) throw new LayeredError(`World does not exist: ${worldId}`, "WorldRepository");

      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: worldData }
      );

      return { ...existingWorld, ...worldData };
    } catch (error) {
      throw new LayeredError(`Error updating world with ID ${worldId}: ${error.message}`, 'WorldRepository');
    }
  }

  async delete(worldId) {
    try {
      const result = await this.collection.deleteOne({ _id: new ObjectId(String(worldId)) });
      return result.deletedCount > 0;
    } catch (error) {
      throw new LayeredError(`Error deleting world with ID ${worldId}: ${error.message}`, 'WorldRepository');
    }
  }

  async addFaction(worldId, faction) {
    return this._modifyWorldArray(worldId, 'factions', faction, 'add');
  }

  async addRegion(worldId, region) {
    return this._modifyWorldArray(worldId, 'regions', region, 'add');
  }

  async addGlobalItem(worldId, item) {
    return this._modifyWorldArray(worldId, 'globalItems', item, 'add');
  }

  async addEvent(worldId, event) {
    return this._modifyWorldArray(worldId, 'events', event, 'add');
  }

  async updateEconomy(worldId, newEconomyState) {
    try {
      const world = await this.getById(worldId);
      world.economyState = newEconomyState;
      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: { economyState: world.economyState } }
      );
      return world;
    } catch (error) {
      throw new LayeredError(`Error updating economy state for world with ID ${worldId}: ${error.message}`, 'WorldRepository');
    }
  }

  async addPlayer(worldId, player) {
    return this._modifyWorldArray(worldId, 'players', player, 'add');
  }

  async removePlayer(worldId, playerId) {
    try {
      const world = await this.getById(worldId);
      const playerIndex = world.players.findIndex(player => player.id === playerId);

      if (playerIndex === -1) {
        throw new LayeredError(`Player with ID ${playerId} not found in world ${worldId}.`, 'WorldRepository');
      }

      world.players.splice(playerIndex, 1);
      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: { players: world.players } }
      );
      return world;
    } catch (error) {
      throw new LayeredError(`Error removing player from world with ID ${worldId}: ${error.message}`, 'WorldRepository');
    }
  }

  async _modifyWorldArray(worldId, arrayField, newItem, action) {
    try {
      const world = await this.getById(worldId);
      if (!world) throw new LayeredError(`World does not exist.`, 'WorldRepository');
      const updatedArray = [...world[arrayField]];

      switch (action) {
        case 'add':
          updatedArray.push(newItem);
          break;
          
        case 'remove':
          const itemIndex = updatedArray.findIndex(item => item.id === newItem.id);
          if (itemIndex === -1) throw new LayeredError(`Item not found in ${arrayField}`, 'WorldRepository');
          updatedArray.splice(itemIndex, 1);
        break;
        default:
          break;
      }

      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: { [arrayField]: updatedArray } }
      );

      return world;
    } catch (error) {
      throw new LayeredError(`Error modifying array field '${arrayField}' for world with ID ${worldId}: ${error.message}`, 'WorldRepository');
    }
  }
}

module.exports = WorldRepository;
