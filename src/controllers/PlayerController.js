class PlayerController {
  constructor(playerService) {
    this.playerService = playerService;
  }

  async getAllPlayers(req, res) {
    try {
      const players = await this.playerService.getPlayers();
      res.status(200).json(players);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async getPlayerById(req, res) {
    try {
      const { playerId } = req.params;
      if (!playerId) return res.status(400).json({ error: "Missing 'playerId' parameter." });

      const player = await this.playerService.getPlayerById(playerId);
      if (!player) return res.status(404).json({ error: `Player with _id ${playerId} not found.` });

      res.status(200).json(player);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async createPlayer(req, res) {
    try {
      const playerData = req.body;
      if (!playerData) return res.status(400).json({ error: "Missing 'playerData' in request body." });

      const result = await this.playerService.createPlayer(playerData);
      res.status(201).json({ message: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async updatePlayer(req, res) {
    try {
      const { playerId } = req.params;
      const playerData = req.body;

      if (!playerId || !playerData) {
        return res.status(400).json({ error: "Missing 'playerId' or 'playerData' in request." });
      }

      const result = await this.playerService.updatePlayer(playerId, playerData);
      res.status(200).json({ message: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async deletePlayer(req, res) {
    try {
      const { playerId } = req.params;
      if (!playerId) return res.status(400).json({ error: "Missing 'playerId' parameter." });

      const result = await this.playerService.deletePlayer(playerId);
      res.status(200).json({ message: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = PlayerController;
