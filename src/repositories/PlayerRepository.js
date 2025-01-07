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
      const objectId = new ObjectId(String(playerId));
      return await this.collection.findOne({ _id: new objectId });
    } catch (err) {
      throw new Error(`Couldn't get player by their _id: ${err}`);
    }
  }

  async create(playerData) {
    const result = await this.collection.insertOne(playerData);
    return { _id: result.insertedId, ...playerData };
  }

  async deleteOne(playerId) {
    const objectId = new ObjectId(String(playerId));

    return await this.collection.deleteOne({ _id: objectId });
  }

  async updatePlayer(playerId, updatedData) {
    const objectId = new ObjectId(String(playerId));

    return await this.collection.updateOne(
      { _id: objectId },
      { $set: updatedData }
    );
  }
}

module.exports = PlayerRepository;
