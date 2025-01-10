class PlayerService {
  constructor(playerRepository) {
    this.playerRepository = playerRepository;
  }

  async getPlayers() {
    try {
      return await this.playerRepository.getAll();
    } catch (err) {
      throw new Error('Failed to fetch players');
    }
  }

  async getPlayerById(playerId) {
    try {
      if (!playerId) throw new Error("Missing argument 'playerId'.");

      const player = await this.playerRepository.getById(playerId);
      if (!player) throw new Error('Player not found.');

      return player;
    } catch (err) {
      throw new Error(err.message || 'Failed to fetch player');
    }
  }

  async getPlayerOverview(playerId) {
    try {
      if (!playerId) throw new Error("Missing argument 'playerId'.");

      const player = await this.playerRepository.getById(playerId);
      if (!player) throw new Error('Player not found.');

      // Extract short information
      const summary = {
        id: player._id,
        name: player.name,
        race: player.race,
        classes: player.classes,
        level: player.level
      };

      return summary;
    } catch (err) {
      throw new Error(err.message || 'Failed to retrieve player overview');
    }
  }

  async createPlayer(playerData) {
    try {
      if (!playerData) throw new Error("Missing argument 'playerData'.");

      const result = await this.playerRepository.create(playerData);
      if (!result) throw new Error('Failed to create player');

      return `Player successfully created with _id: ${result._id}`;
    } catch (err) {
      throw new Error(err.message || 'Failed to create player');
    }
  }

  async updatePlayer(playerId, playerData) {
    try {
      if (!playerId || !playerData) throw new Error("Missing argument 'playerId' or 'playerData'.");

      const player = await this.playerRepository.getById(playerId);
      if (!player) throw new Error(`Player with _id ${playerId} not found.`);

      const result = await this.playerRepository.updatePlayer(playerId, playerData);
      if (!result) throw new Error(`Failed to update player with _id ${playerId}`);

      return `Player (_id: ${playerId}) updated successfully.`;
    } catch (err) {
      throw new Error(err.message || 'Failed to update player');
    }
  }

  async deletePlayer(playerId) {
    try {
      if (!playerId) throw new Error("Missing argument 'playerId'.");

      const player = await this.playerRepository.getById(playerId);
      if (!player) throw new Error(`Player with _id ${playerId} not found.`);

      await this.playerRepository.deleteOne(playerId);
      return `Player with _id ${playerId} deleted successfully.`;
    } catch (err) {
      throw new Error(err.message || 'Failed to delete player');
    }
  }
}

module.exports = PlayerService;
