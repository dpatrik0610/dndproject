const { ObjectId } = require("mongodb");
class WorldRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async getAll() {
    try {
      return await this.collection.find().toArray();
    } catch (error) {
      throw new Error(`[WorldRepository]: Error getting worlds: ${error.message}`);
    }
  }

  async getById(worldId) {
    try {
      return await this.collection.findOne({ _id: (new ObjectId(String(worldId))) });
    } catch (error) {
      throw new Error(`[WorldRepository]: Error getting world with ID ${worldId}: ${error.message}`);
    }
  }

  async create(worldData) {
    try {
      const existingWorld = await this.collection.findOne({ name: worldData.name });
  
      if (existingWorld) {
        const error = new Error(`A world with the name '${worldData.name}' already exists.`);
        error.status = 409;
        throw error;
      }
  
      const result = await this.collection.insertOne(worldData);
      return { ...worldData, _id: result.insertedId };
    } catch (error) {
      
      if(error.status === 409) throw error;
      throw new Error(`[WorldRepository]: ${error.message}`);
    }
  }
  
  async update(worldId, worldData) {
    try {
      const existingWorld = await this.collection.findOne({ _id: new ObjectId(String(worldId)) });
  
      if (!existingWorld) {
        throw new Error(`World with ID '${worldId}' not found.`);
      }
  
      await this.collection.updateOne(
        { _id: new ObjectId(String(worldId)) },
        { $set: worldData }
      );
  
      return { ...existingWorld, ...worldData };
    } catch (error) {
      throw new Error(`[WorldRepository]: Error updating world with ID ${worldId}: ${error.message}`);
    }
  }

  async delete(worldId) {

    try {
      const result = await this.collection.deleteOne({ _id: (new ObjectId(String(worldId))) });
      
      return result.deletedCount > 0;
    } catch (error) {
      throw new Error(`[WorldRepository]: Error deleting world with ID ${worldId}: ${error.message}`);
    }
  }

  async addFaction(worldId, faction) {

    try {
      const world = await this.getById(worldId);
      if (!world) throw new Error('World not found');

      world.factions.push(faction);
      await this.collection.updateOne({ _id: (new ObjectId(String(worldId))) }, { $set: { factions: world.factions } });

      return world;
    } catch (error) {
      throw new Error(`[WorldRepository]: Error adding faction to world with ID ${worldId}: ${error.message}`);
    }
  }

  async addRegion(worldId, region) {

    try {
      const world = await this.getById(worldId);
      if (!world) throw new Error('World not found');

      world.regions.push(region);
      await this.collection.updateOne({ _id: (new ObjectId(String(worldId))) }, { $set: { regions: world.regions } });

      return world;
    } catch (error) {
      throw new Error(`[WorldRepository]: Error adding region to world with ID ${worldId}: ${error.message}`);
    }
  }

  async addGlobalItem(worldId, item) {

    try {
      const world = await this.getById(worldId);
      if (!world) throw new Error('World not found');

      world.globalItems.push(item);
      await this.collection.updateOne({ _id: (new ObjectId(String(worldId))) }, { $set: { globalItems: world.globalItems } });

      return world;
    } catch (error) {
      throw new Error(`[WorldRepository]: Error adding global item to world with ID ${worldId}: ${error.message}`);
    }
  }

  async updateEconomy(worldId, newEconomyState) {

    try {
      const world = await this.getById(worldId);
      if (!world) throw new Error('World not found');

      world.economyState = newEconomyState;
      await this.collection.updateOne({ _id: (new ObjectId(String(worldId))) }, { $set: { economyState: world.economyState } });

      return world;
    } catch (error) {
      throw new Error(`[WorldRepository]: Error updating economy state for world with ID ${worldId}: ${error.message}`);
    }
  }

  async addEvent(worldId, event) {

    try {
      const world = await this.getById(worldId);
      if (!world) throw new Error('World not found');

      world.events.push(event);
      await this.collection.updateOne({ _id: (new ObjectId(String(worldId))) }, { $set: { events: world.events } });

      return world;
    } catch (error) {
      throw new Error(`[WorldRepository]: Error adding event to world with ID ${worldId}: ${error.message}`);
    }
  }

  async addPlayer(worldId, player) {

    try {
      const world = await this.getById(worldId);
      if (!world) throw new Error('World not found');
      
      world.players.push(player);
      await this.collection.updateOne(
        { _id: (new ObjectId( String(worldId) )) }, 
        { $set: { players: world.players } }
      );

      return world;
    } catch (error) {
      throw new Error(`[WorldRepository]: Error adding player to world with ID ${worldId}: ${error.message}`);
    }
  }

  async removePlayer(worldId, playerId) {
    try {
      const world = await this.getById(worldId);
      if (!world) throw new Error('World not found');
  
      world.players = world.players.filter(player => player.id !== playerId);
  
      await this.collection.updateOne(
        { _id: new ObjectId( String(worldId)) },
        { $set: { players: world.players } }
      );
  
      return world;
    } catch (error) {
      throw new Error(`[WorldRepository]: Error removing player from world with ID ${worldId}: ${error.message}`);
    }
  }

}

module.exports = WorldRepository;
