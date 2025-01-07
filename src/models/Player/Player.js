const { ObjectId } = require("mongodb");
const PlayerMethods = require("./PlayerMethods");
const CurrencyManager = require("../Inventory/CurrencyManager");
const { EquipmentManager, BodyParts } = require("../Inventory/EquipmentManager");
const Inventory = require("../Inventory/Inventory");
const {logTemplates : logger} = require("../../utils/logTemplates");
class Player {
  constructor(args = {}) {
    const { inventory, playerId = new ObjectId(), ...args } = args;

    Object.assign(this, {
      playerId,
      name: "Unknown Adventurer",
      age: 0,
      height: 0,
      weight: 0,
      race: "Human",
      subrace: null,
      background: "Commoner",
      alignment: "Neutral",
      classes: [],
      subclasses: [],
      abilityScores: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      savingThrows: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
      skills: {},
      feats: {},
      knownLanguages: ["Common"],
      proficiencies: [],
      traits: [],
      conditions: [],
      hp: 10,
      tempHp: 0,
      hitDice: "1d8",
      ac: 10,
      initBonus: 0,
      speed: 30,
      spellSlots: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
      knownSpells: [],
      inspiration: false,
      passivePerception: 10,
      effects: [],
      resistances: [],
      immunities: [],
      vulnerabilities: [],
      deathSaves: { successes: 0, failures: 0 },
      familiar: null,
      proficiencyBonus: 2,
      reputation: 0,
      npc: false,
      capacity,
      equipment: [],
      ...args,
    });

    if (!inventory) {
      const equipmentManager = new EquipmentManager({ playerId });
      const currencyManager = new CurrencyManager();
      this.inventory = new Inventory({
        playerId,
        equipmentManager,
        currencyManager,
        BodyParts,
        capacity
      });
      logger.info(`Generating new Inventory for Player: (id: ${this.playerId}) ${this.name}...`);
    } else {
      this.inventory = inventory;
    }

    PlayerMethods.updateProficiencyBonus(this);
  }

  // Currency-related methods
  addCurrency(currencyType, amount) {
    this.inventory.addCurrency(currencyType, amount);
  }

  removeCurrency(currencyType, amount) {
    this.inventory.removeCurrency(currencyType, amount);
  }

  transferCurrency(toPlayer, currencyType, amount) {
    this.inventory.transferCurrency(toPlayer.inventory, currencyType, amount);
  }

  getTotalCurrency() {
    return this.inventory.getTotalCurrency();
  }

  // Equipment-related methods
  equipItem(item, bodyPart) {
    this.inventory.equipItem(item, bodyPart);
  }

  unequipItem(bodyPart) {
    this.inventory.unequipItem(bodyPart);
  }

  // Inventory-related methods
  addItemToInventory(item) {
    this.inventory.addItem(item);
  }

  removeItemFromInventory(identifier) {
    return this.inventory.removeItem(identifier);
  }

  sellItem(identifier, sellRate = 0) {
    return this.inventory.sellItem(identifier, sellRate);
  }

  listInventoryItems() {
    return this.inventory.listItems();
  }

  listEquippedItems() {
    return this.inventory.listEquippedItems();
  }
}

module.exports = Player;
