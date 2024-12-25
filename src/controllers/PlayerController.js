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

  // Currency

  async addCurrency(req, res) {
    try {
      const { playerId } = req.params;
      const { currencyType, amount } = req.body;

      if (!currencyType || typeof amount !== "number") {
        return res.status(400).json({ error: "Missing or invalid 'currencyType' or 'amount'." });
      }

      const message = await this.playerService.addCurrency(playerId, currencyType, amount);
      res.status(200).json({ message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async removeCurrency(req, res) {
    try {
      const { playerId } = req.params;
      const { currencyType, amount } = req.body;

      if (!currencyType || typeof amount !== "number") {
        return res.status(400).json({ error: "Missing or invalid 'currencyType' or 'amount'." });
      }

      const message = await this.playerService.removeCurrency(playerId, currencyType, amount);
      res.status(200).json({ message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async transferCurrency(req, res) {
    try {
      const { fromPlayerId, toPlayerId } = req.params;
      const { currencyType, amount } = req.body;

      if (!currencyType || typeof amount !== "number") {
        return res.status(400).json({ error: "Missing or invalid 'currencyType' or 'amount'." });
      }

      const message = await this.playerService.transferCurrency(fromPlayerId, toPlayerId, currencyType, amount);
      res.status(200).json({ message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async getTotalCurrency(req, res) {
    try {
      const { playerId } = req.params;
  
      if (!playerId) {
        return res.status(400).json({ error: "Missing playerId parameter." });
      }
  
      const totalCurrency = await this.playerService.getTotalCurrency(playerId);
      return res.status(200).json({ playerId, totalCurrency });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to get player's total currency." });
    }
  }
  
}

module.exports = PlayerController;
