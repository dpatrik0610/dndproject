class InventoryManager {
  static addItemToInventory(inventory, item) {
    if (!item || typeof item !== 'object') {
      throw new Error('Invalid item. Item must be an object.');
    }

    if (item.weight == null || isNaN(item.weight)) {
      throw new Error('Item must have a valid weight.');
    }

    if (inventory.capacity !== null && inventory.weight + (item.weight || 0) > inventory.capacity) {
      throw new Error('Adding this item would exceed the inventory capacity.');
    }

    const itemModified = this.modifyItemQuantity(inventory, item, 1);
    if (!itemModified) {
      inventory.items.push({ ...item, quantity: item.quantity || 1 });
    }

    this.updateWeight(inventory);
  }

  static removeItemFromInventory(inventory, identifier) {
    const item = inventory.items.find(
      i => i.name === identifier || i.index === identifier || i.equipmentId === identifier
    );
    if (!item) {
      throw new Error(`Item with identifier '${identifier}' not found in inventory.`);
    }

    const itemModified = this.modifyItemQuantity(inventory, item, -1);
    if (!itemModified) {
      throw new Error(`Unable to modify item '${identifier}' quantity.`);
    }

    this.updateWeight(inventory);

    return item.quantity ? { ...item, quantity: item.quantity } : { ...item };
  }

  static listInventoryItems(inventory) {
    if (!Array.isArray(inventory.items)) {
      throw new Error('Invalid inventory structure. Items must be an array.');
    }

    return [...inventory.items];
  }

  static updateWeight(inventory) {
    if (!Array.isArray(inventory.items)) {
      throw new Error('Invalid inventory structure. Items must be an array.');
    }

    inventory.weight = this.calculateInventoryWeight(inventory);
  }

  /**
   * Helper method to calculate the total weight of all items in the inventory.
   * @param {Object} inventory - The inventory object.
   * @returns {number} - The total weight of all items in the inventory.
   */
  static calculateInventoryWeight(inventory) {
    return inventory.items.reduce(
      (total, item) => total + (item.weight || 0) * (item.quantity || 1),
      0
    );
  }

  /**
   * Helper method to adjust an item's quantity in the inventory.
   * @param {Object} inventory - The inventory object.
   * @param {Object} item - The item object to modify.
   * @param {number} amount - The amount to adjust the quantity by (positive or negative).
   * @returns {boolean} - Returns true if the item was found and modified, otherwise false.
   */
  static modifyItemQuantity(inventory, item, amount) {
    const identifier = item.equipmentId || item.index;
    const existingItem = inventory.items.find(i => i.index === identifier || i.equipmentId === identifier);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + amount;

      if (existingItem.quantity <= 0) {
        inventory.items = inventory.items.filter(i => i.index !== identifier && i.equipmentId !== identifier);
      }
      return true;
    }

    return false;
  }
}

module.exports = InventoryManager;
