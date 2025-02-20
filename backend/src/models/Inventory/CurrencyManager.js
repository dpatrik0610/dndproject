class CurrencyManager {
  static RATES = {
    PLATINUM: 1000000, // 1 Platinum = 1,000,000 copper
    GOLD: 10000,       // 1 Gold = 10,000 copper
    SILVER: 100,       // 1 Silver = 100 copper
    COPPER: 1          // 1 Copper = 1 copper
  };

  static addCurrency(inventory, currencyType, amount) {
    if (!inventory.currency.hasOwnProperty(currencyType)) {
      throw new Error(`Invalid currency type: ${currencyType}`);
    }

    if (typeof amount !== "number" || amount < 0) {
      throw new Error("Amount must be a positive number");
    }

    inventory.currency[currencyType] += amount;
    this.normalizeCurrency(inventory);
  }

  static removeCurrency(inventory, currencyType, amount) {
    if (!inventory.currency.hasOwnProperty(currencyType)) {
      throw new Error(`Invalid currency type: ${currencyType}`);
    }

    if (typeof amount !== "number" || amount < 0) {
      throw new Error("Amount must be a positive number");
    }

    if (inventory.currency[currencyType] < amount) {
      throw new Error(`Insufficient ${currencyType}`);
    }

    inventory.currency[currencyType] -= amount;
    this.normalizeCurrency(inventory);
  }

  static getCurrency(inventory, currencyType) {
    if (!inventory.currency.hasOwnProperty(currencyType)) {
      throw new Error(`Invalid currency type: ${currencyType}`);
    }

    return inventory.currency[currencyType];
  }

  static transferCurrency(fromInventory, toInventory, currencyType, amount) {
    if (fromInventory.currency[currencyType] < amount) {
      throw new Error(`Insufficient ${currencyType} to transfer`);
    }

    this.removeCurrency(fromInventory, currencyType, amount);
    this.addCurrency(toInventory, currencyType, amount);
  }

  static getTotalCurrency(inventory) {
    const totalCopper = this.convertToCopper(inventory);
    return this.splitCopper(totalCopper);
  }  

  static normalizeCurrency(inventory) {
    const totalCopper = this.convertToCopper(inventory);
    const normalized = this.splitCopper(totalCopper);

    inventory.currency = normalized;
  }

  // Convert the inventory's entire currency into copper
  static convertToCopper(inventory) {
    return (
      inventory.currency.platinum * this.RATES.PLATINUM +
      inventory.currency.gold * this.RATES.GOLD +
      inventory.currency.silver * this.RATES.SILVER +
      inventory.currency.copper
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

module.exports = CurrencyManager;
