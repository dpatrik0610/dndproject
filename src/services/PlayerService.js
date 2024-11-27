class PlayerService {
    constructor(playerRepository) {
      this.playerRepository = playerRepository;
    }
  
    async getPlayers() {
      return this.playerRepository.getAll();
    }
  
    async createPlayer(playerData) {
      return this.playerRepository.create(playerData);
    }
  }
  
  module.exports = PlayerService;