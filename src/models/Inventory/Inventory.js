class Inventory {
  constructor({ playerId, equipmentManager, currencyManager, bodyParts, capacity = null } = {}) {
    this.playerId = playerId;
    this.equipmentManager = equipmentManager;
    this.currencyManager = currencyManager;
    this.bodyParts = bodyParts;
    this.capacity = capacity;
    this.items = [];
    this.weight = 0;
    this.currency = { platinum: 0, gold: 0, silver: 0, copper: 0 };
  }

  addItem(item) {
    this.items.push(item);
    this.updateWeight();
  }

  removeItem(itemId) {
    const itemIndex = this.items.findIndex(item => item.name === itemId || item.index === itemId);
    if (itemIndex !== -1) {
      const removedItem = this.items.splice(itemIndex, 1)[0];
      this.updateWeight();
      return removedItem;
    }
    return null;
  }

  sellItem(itemId, sellRate = 0) {
    const item = this.removeItem(itemId);
    if (!item) return null;
    const saleValue = Math.floor(item.cost.quantity * sellRate);
    this.currencyManager.addCurrency(this, item.cost.unit, saleValue);
    return { item, saleValue, currencyUnit: item.cost.unit };
  }

  equipItem(item, bodyPart) {
    this.equipmentManager.addEquipment(item, bodyPart);
    this.removeItem(item.name);
  }

  unequipItem(bodyPart) {
    const item = this.equipmentManager.getEquipment(bodyPart);
    if (item) {
      this.addItem(item);
      this.equipmentManager.removeEquipment(bodyPart);
    }
  }

  addCurrency(currencyType, amount) {
    this.currencyManager.addCurrency(this, currencyType, amount);
  }

  removeCurrency(currencyType, amount) {
    this.currencyManager.removeCurrency(this, currencyType, amount);
  }

  transferCurrency(toInventory, currencyType, amount) {
    this.currencyManager.transferCurrency(this, toInventory, currencyType, amount);
  }

  getTotalCurrency() {
    return this.currencyManager.getTotalCurrency(this);
  }

  updateWeight() {
    const itemWeight = this.items.reduce((total, item) => total + item.weight, 0);
    const equipmentWeight = this.equipmentManager
      .listEquipment()
      .reduce((total, item) => total + item.weight, 0);
    this.weight = itemWeight + equipmentWeight;
    if (this.capacity && this.weight > this.capacity) {
      throw new Error("Inventory capacity exceeded");
    }
  }

  listItems() {
    return this.items;
  }

  listEquippedItems() {
    return this.equipmentManager.listEquipment();
  }
}

module.exports = Inventory;
