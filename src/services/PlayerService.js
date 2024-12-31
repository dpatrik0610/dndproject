class PlayerService {
  constructor(playerRepository, currencyManager) {
    this.playerRepository = playerRepository;
    this.currencyManager = currencyManager;
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

  // Currency

  async addCurrency(playerId, currencyType, amount) {
    const player = await this.playerRepository.getById(playerId);
    if (!player) throw new Error(`Player with _id ${playerId} not found.`);

    this.currencyManager.addCurrency(player, currencyType, amount);
    await this.playerRepository.updatePlayer(playerId, { currency: player.currency });

    return `Added ${amount} ${currencyType} to player ${playerId}.`;
  }

  async removeCurrency(playerId, currencyType, amount) {
    const player = await this.playerRepository.getById(playerId);
    if (!player) throw new Error(`Player with _id ${playerId} not found.`);

    this.currencyManager.removeCurrency(player, currencyType, amount);
    await this.playerRepository.updatePlayer(playerId, { currency: player.currency });

    return `Removed ${amount} ${currencyType} from player ${playerId}.`;
  }

  async transferCurrency(fromPlayerId, toPlayerId, currencyType, amount) {
    const fromPlayer = await this.playerRepository.getById(fromPlayerId);
    const toPlayer = await this.playerRepository.getById(toPlayerId);

    if (!fromPlayer || !toPlayer) {
      throw new Error("One or both players not found.");
    }

    this.currencyManager.transferCurrency(fromPlayer, toPlayer, currencyType, amount);

    await this.playerRepository.updatePlayer(fromPlayerId, { currency: fromPlayer.currency });
    await this.playerRepository.updatePlayer(toPlayerId, { currency: toPlayer.currency });

    return `Transferred ${amount} ${currencyType} from ${fromPlayerId} to ${toPlayerId}.`;
  }

  async getTotalCurrency(playerId) {
    const player = await this.playerRepository.getById(playerId);
    if (!player) throw new Error(`Player with _id ${playerId} not found.`);

    return this.currencyManager.getTotalCurrency(player);
  }

}

module.exports = PlayerService;
