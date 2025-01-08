const { ObjectId } = require("mongodb");
class WorldRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async getAll() {
    try {
      return await this.collection.find().toArray();
    } catch (error) {
      throw new Error(`Error getting worlds: ${error.message}`);
    }
  }

  async getById(worldId) {
    try {
      return await this.collection.findOne({ _id: (new ObjectId(String(worldId))) });
    } catch (error) {
      throw new Error(`Error getting world with ID ${worldId}: ${error.message}`);
    }
  }

  async createOrUpdate(worldId, worldData) {
    try {
      const existingWorld = await this.collection.findOne({ _id: (new ObjectId(String(worldId))) });

      if (!existingWorld) {
        await this.collection.insertOne({ _id: (new ObjectId(String(worldId))), ...worldData });
        return worldData;
      }

      await this.collection.updateOne({ _id: (new ObjectId(String(worldId))) }, { $set: worldData });
      return { ...existingWorld, ...worldData };

    } catch (error) {
      throw new Error(`Error creating or updating world with ID ${worldId}: ${error.message}`);
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
      throw new Error(`Error adding faction to world with ID ${worldId}: ${error.message}`);
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
      throw new Error(`Error adding region to world with ID ${worldId}: ${error.message}`);
    }
  }

  async addGlobalItem(worldId, item) {

    try {
      const world = await this.getById((new ObjectId(String(worldId))));
      if (!world) throw new Error('World not found');

      world.globalItems.push(item);
      await this.collection.updateOne({ _id: (new ObjectId(String(worldId))) }, { $set: { globalItems: world.globalItems } });

      return world;
    } catch (error) {
      throw new Error(`Error adding global item to world with ID ${worldId}: ${error.message}`);
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
      throw new Error(`Error updating economy state for world with ID ${worldId}: ${error.message}`);
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
      throw new Error(`Error adding event to world with ID ${worldId}: ${error.message}`);
    }
  }

  async addPlayer(worldId, player) {

    try {
      const world = await this.getById((new ObjectId(String(worldId))));
      if (!world) throw new Error('World not found');

      world.players.push(player);
      await this.collection.updateOne({ _id: (new ObjectId(String(worldId))) }, { $set: { players: world.players } });

      return world;
    } catch (error) {
      throw new Error(`Error adding player to world with ID ${worldId}: ${error.message}`);
    }
  }

  async delete(worldId) {

    try {
      const result = await this.collection.deleteOne({ _id: (new ObjectId(String(worldId))) });
      
      return result.deletedCount > 0;
    } catch (error) {
      throw new Error(`Error deleting world with ID ${worldId}: ${error.message}`);
    }
  }
}

module.exports = WorldRepository;
