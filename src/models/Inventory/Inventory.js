class Inventory {
    constructor(args = {}) {
      Object.assign(this, {
        items: [],
        equipment: [],
        currency: { platinum: 0, gold: 0, silver: 0, copper: 0 },
        weight: 0,
        carry_capacity: null, // Max carrying capacity
        ...args,
      });
    }
  
    addItem(equipment) {
      if (!(equipment instanceof Equipment)) {
        throw new Error("Item must be an instance of Equipment.");
      }
      this.items.push(equipment);
      this.updateWeight();
    }
  
    removeItem(identifier) {
      this.items = this.items.filter(
        item => item.name !== identifier && item.index !== identifier
      );
      this.updateWeight();
    }
  
    equipItem(identifier) {
      const item = this.items.find(
        i => i.name === identifier || i.index === identifier
      );
      if (item) {
        this.equipment.push(item);
        this.items = this.items.filter(
          i => i.name !== identifier && i.index !== identifier
        );
        this.updateWeight();
      } else {
        throw new Error("Item not found in inventory.");
      }
    }
  
    unequipItem(identifier) {
      const item = this.equipment.find(
        i => i.name === identifier || i.index === identifier
      );
      if (item) {
        this.items.push(item);
        this.equipment = this.equipment.filter(
          i => i.name !== identifier && i.index !== identifier
        );
        this.updateWeight();
      } else {
        throw new Error("Item not found in equipment.");
      }
    }
  
    updateWeight() {
      const itemWeight = this.items.reduce((total, item) => total + item.weight, 0);
      const equipmentWeight = this.equipment.reduce((total, item) => total + item.weight, 0);
      this.weight = itemWeight + equipmentWeight;
    }
  
    getTotalCurrency() {
      const { platinum, gold, silver, copper } = this.currency;
      return platinum * 10 + gold + silver / 10 + copper / 100;
    }
  
    listItems() {
      return this.items.map(item => item.getDetails());
    }
  
    listEquipment() {
      return this.equipment.map(item => item.getDetails());
    }
  }
  
  module.exports = Inventory;
  