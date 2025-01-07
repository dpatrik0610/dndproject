const CurrencyManager = require("../Inventory/CurrencyManager");
const { EquipmentManager, BodyParts } = require("../Inventory/EquipmentManager");
const Inventory = require("../Inventory/Inventory");
const {logTemplates : logger} = require("../../utils/logTemplates");

class InventoryManager {

  // Currency Management
  static addCurrency(inventory, currencyType, amount) {
    inventory.addCurrency(currencyType, amount);
  }

  static removeCurrency(inventory, currencyType, amount) {
    inventory.removeCurrency(currencyType, amount);
  }

  static transferCurrency(inventory, toPlayer, currencyType, amount) {
    inventory.transferCurrency(toPlayer.inventory, currencyType, amount);
  }

  static getTotalCurrency(inventory) {
    return inventory.getTotalCurrency();
  }

  // Equipment and Inventory Management.
  static generateNewInventory(player) {
    playerId = player.playerId;

    const equipmentManager = new EquipmentManager({ playerId });
    const currencyManager = new CurrencyManager();

    logger.info(`Generating new Inventory for Player: (id: ${this.playerId}) ${this.name}...`);
    new Inventory({
      playerId,
      equipmentManager,
      currencyManager,
      BodyParts,
      capacity
    });
  }

  static equipItem(inventory, item, bodyPart) {
    inventory.equipItem(item, bodyPart);
  }

  static unequipItem(inventory, bodyPart) {
    inventory.unequipItem(bodyPart);
  }

  static addItemToInventory(inventory, item) {
    inventory.addItem(item);
  }

  static removeItemFromInventory(inventory, identifier) {
    return inventory.removeItem(identifier);
  }

  static sellItem(inventory, identifier, sellRate) {
    return inventory.sellItem(identifier, sellRate);
  }

  static listInventoryItems(inventory) {
    return inventory.listItems();
  }

  static listEquippedItems(inventory) {
    return inventory.listEquippedItems();
  }

}

module.exports = InventoryManager;