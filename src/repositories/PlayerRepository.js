class PlayerRepository {
  constructor(db) {
    this.collection = db.collection('Players');
  }

  async getAll() {
    return this.collection.find().toArray();
  }

  async getById(playerId) {
    return await this.collection.findOne({ _id: playerId });
  }

  async create(playerData) {
    const result = await this.collection.insertOne(playerData);
    return { _id: result.insertedId, ...playerData };
  }

  async deleteOne(playerId) {
    return await this.collection.deleteOne({ _id: playerId });
  }

  async updatePlayer(playerId, updatedData) {
    return await this.collection.updateOne(
      { _id: playerId },
      { $set: updatedData }
    );
  }
}

module.exports = PlayerRepository;
