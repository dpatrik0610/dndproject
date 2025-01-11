class InventoryManager {

  static addItemToInventory(inventory, item) {
    if (!item || typeof item !== 'object') {
      throw new Error('Invalid item. Item must be an object.');
    }

    if (inventory.capacity && inventory.weight + (item.weight || 0) > inventory.capacity) {
      throw new Error('Adding this item would exceed the inventory capacity.');
    }

    const itemModified = this.modifyItemQuantity(inventory, item, 1);
    if (!itemModified) {
      // If the item is not already in the inventory, add it as a new item
      inventory.items.push({ ...item, quantity: item.quantity || 1 });
    }

    inventory.weight = inventory.items.reduce(
      (total, i) => total + (i.weight || 0) * (i.quantity || 1),
      0
    );
  }

  static removeItemFromInventory(inventory, identifier) {
    const item = inventory.items.find(
      i => i.name === identifier || i.index === identifier
    );
    if (!item) {
      throw new Error(`Item with identifier '${identifier}' not found in inventory.`);
    }

    const itemModified = this.modifyItemQuantity(inventory, item, -1);
    if (!itemModified) {
      throw new Error(`Unable to modify item '${identifier}' quantity.`);
    }

    inventory.weight = inventory.items.reduce(
      (total, i) => total + (i.weight || 0) * (i.quantity || 1),
      0
    );

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

    inventory.weight = inventory.items.reduce((total, item) => total + (item.weight || 0), 0);
  }

    /**
   * Helper method to adjust an item's quantity in the inventory.
   * @param {Object} inventory - The inventory object.
   * @param {Object} item - The item object to modify.
   * @param {number} amount - The amount to adjust the quantity by (positive or negative).
   * @returns {boolean} - Returns true if the item was found and modified, otherwise false.
   */
    static modifyItemQuantity(inventory, item, amount) {
      const existingItem = inventory.items.find(i => i.name === item.name);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + amount;
  
        if (existingItem.quantity <= 0) {
          // Remove the item if the quantity drops to zero or below
          inventory.items = inventory.items.filter(i => i.name !== item.name);
        }
        return true;
      }
      return false;
    }
}

module.exports = InventoryManager;
