class PlayerInventoryManager {
  addItem(player, item) {
    try {
      if (!item || typeof item !== 'object' || !item.name || item.name.trim() === "") {
        throw new Error("Item must be a valid object with a non-empty name");
      }

      if (player.inventory.some(i => i.name === item.name)) {
        throw new Error(`Item "${item.name}" is already in inventory`);
      }

      player.inventory.push(item);
    } catch (error) {
      console.error(`Error adding item to inventory: ${error.message}`);
    }
  }

  removeItem(player, itemName) {
    try {
      const itemIndex = player.inventory.findIndex(i => i.name === itemName);

      if (itemIndex === -1) {
        throw new Error(`Item "${itemName}" not found in inventory`);
      }

      player.inventory.splice(itemIndex, 1);
    } catch (error) {
      console.error(`Error removing item from inventory: ${error.message}`);
    }
  }

  hasItem(player, itemName) {
    return player.inventory.some(i => i.name === itemName);
  }

  updateItemQuantity(player, itemName, quantity) {
    try {
      if (typeof quantity !== 'number' || quantity <= 0) {
        throw new Error("Quantity must be a positive number");
      }

      const item = player.inventory.find(i => i.name === itemName);
      if (item) {
        item.quantity = quantity;
      } else {
        player.inventory.push({ name: itemName, quantity });
      }
    } catch (error) {
      console.error(`Error updating item quantity: ${error.message}`);
    }
  }

  getItemDetails(player, itemName) {
    return player.inventory.find(i => i.name === itemName) || null;
  }

  clearInventory(player) {
    player.inventory.length = 0;
  }

  displayInventory(player) {
    if (player.inventory.length === 0) {
      console.log("Your inventory is empty.");
    } else {
      console.log("Your inventory contains:");
      player.inventory.forEach(item => {
        console.log(`- ${item.name} (Quantity: ${item.quantity || 1})`);
      });
    }
  }
}

module.exports = PlayerInventoryManager;
