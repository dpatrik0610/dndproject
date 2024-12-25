class PlayerService {
  constructor(playerRepository) {
    this.playerRepository = playerRepository;
  }

  async getPlayers() {
    return await this.playerRepository.getAll();
  }

  async getPlayerById(playerId) {
    try {
      if (!playerId) throw new Error("Missing argument 'playerId'.");
      return await this.playerRepository.getById(playerId);
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  }

  async createPlayer(playerData) {
    try {
      if (!playerData) throw new Error("Missing argument 'playerData'.");

      const result = await this.playerRepository.create(playerData);
      if (!result) throw new Error(`Couldn't create player in repository with data: ${JSON.stringify(playerData)}`);

      return `Player successfully created with _id: ${result._id}`;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  }

  async updatePlayer(playerId, playerData) {
    try {
      if (!playerId || !playerData) throw new Error("Missing argument 'playerId' or 'playerData'.");

      const player = await this.playerRepository.getById(playerId);
      if (!player) throw new Error(`Player with _id ${playerId} doesn't exist.`);

      const result = await this.playerRepository.updatePlayer(playerId, playerData);
      return `Player (_id: ${playerId}) updated successfully.`;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  }

  async deletePlayer(playerId) {
    try {
      if (!playerId) throw new Error("Missing argument 'playerId'.");

      const player = await this.playerRepository.getById(playerId);
      if (!player) throw new Error(`No player found by _id: ${playerId}`);

      await this.playerRepository.deleteOne(playerId);
      return `Player with _id ${playerId} deleted successfully.`;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  }
}

module.exports = PlayerService;
