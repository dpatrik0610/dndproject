const { ObjectId } = require("mongodb");
class PlayerRepository {
  constructor(playerCollection) {
    this.collection = playerCollection;
  }

  async getAll() {
    return await this.collection.find().toArray();
  }

  async getById(playerId) {
    try{
      return await this.collection.findOne({ _id: new ObjectId(playerId) });
    } catch (err) {
      throw new Error(`Couldn't get player by their _id: ${err}`);
    }
  }

  async create(playerData) {
    const result = await this.collection.insertOne(playerData);
    return { _id: result.insertedId, ...playerData };
  }

  async deleteOne(playerId) {
    return await this.collection.deleteOne({ _id: new ObjectId(playerId) });
  }

  async updatePlayer(playerId, updatedData) {
    return await this.collection.updateOne(
      { _id: new ObjectId(playerId) },
      { $set: updatedData }
    );
  }
}

module.exports = PlayerRepository;
