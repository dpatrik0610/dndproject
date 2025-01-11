class Inventory {
  constructor({ entityId, capacity = null} = {}) {
    this.entityId = entityId;
    this.items = [];
    this.weight = 0;
    this.currency = { platinum: 0, gold: 0, silver: 0, copper: 0 };
    this.capacity = capacity;
  }
}

module.exports = Inventory;
