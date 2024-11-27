class PlayerController {
    constructor(playerService) {
      this.playerService = playerService;
    }
  
    async getAll(req, res) {
      try {
        const players = await this.playerService.getPlayers();
        res.json(players);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    async create(req, res) {
      try {
        const player = await this.playerService.createPlayer(req.body);
        res.status(201).json(player);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }
  }
  
  module.exports = PlayerController;
  