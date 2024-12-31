class PlayerCurrencyManager {
  static RATES = {
    PLATINUM: 1000000, // 1 Platinum = 1,000,000 copper
    GOLD: 10000,       // 1 Gold = 10,000 copper
    SILVER: 100,       // 1 Silver = 100 copper
    COPPER: 1          // 1 Copper = 1 copper
  };

  static addCurrency(player, currencyType, amount) {
    if (!player.currency.hasOwnProperty(currencyType)) {
      throw new Error(`Invalid currency type: ${currencyType}`);
    }

    if (typeof amount !== "number" || amount < 0) {
      throw new Error("Amount must be a positive number");
    }

    player.currency[currencyType] += amount;
    this.normalizeCurrency(player);
  }

  static removeCurrency(player, currencyType, amount) {
    if (!player.currency.hasOwnProperty(currencyType)) {
      throw new Error(`Invalid currency type: ${currencyType}`);
    }

    if (typeof amount !== "number" || amount < 0) {
      throw new Error("Amount must be a positive number");
    }

    if (player.currency[currencyType] < amount) {
      throw new Error(`Insufficient ${currencyType}`);
    }

    player.currency[currencyType] -= amount;
    this.normalizeCurrency(player);
  }

  static getCurrency(player, currencyType) {
    if (!player.currency.hasOwnProperty(currencyType)) {
      throw new Error(`Invalid currency type: ${currencyType}`);
    }

    return player.currency[currencyType];
  }

  static transferCurrency(fromPlayer, toPlayer, currencyType, amount) {
    if (fromPlayer.currency[currencyType] < amount) {
      throw new Error(`Insufficient ${currencyType} to transfer`);
    }

    this.removeCurrency(fromPlayer, currencyType, amount);
    this.addCurrency(toPlayer, currencyType, amount);
  }

  static getTotalCurrency(player) {
    const totalCopper = this.convertToCopper(player);
    return this.splitCopper(totalCopper);
  }  

  static normalizeCurrency(player) {
    const totalCopper = this.convertToCopper(player);
    const normalized = this.splitCopper(totalCopper);

    player.currency = normalized;
  }

  // Convert the player's entire currency into copper
  static convertToCopper(player) {
    return (
      player.currency.platinum * this.RATES.PLATINUM +
      player.currency.gold * this.RATES.GOLD +
      player.currency.silver * this.RATES.SILVER +
      player.currency.copper
    );
  }

  // Convert copper back into platinum, gold, silver, and copper
  static splitCopper(copper) {
    const platinum = Math.floor(copper / this.RATES.PLATINUM);
    copper -= platinum * this.RATES.PLATINUM;

    const gold = Math.floor(copper / this.RATES.GOLD);
    copper -= gold * this.RATES.GOLD;

    const silver = Math.floor(copper / this.RATES.SILVER);
    copper -= silver * this.RATES.SILVER;

    return {
      platinum,
      gold,
      silver,
      copper
    };
  }
}

module.exports = PlayerCurrencyManager;
