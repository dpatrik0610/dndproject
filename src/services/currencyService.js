class CurrencyService {
    constructor(playerRepository, currencyManager) {
        this.playerRepository = playerRepository;
        this.currencyManager = currencyManager;
    }

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