const { BodyParts } = require("./BodyParts");

class EquipmentManager {
  constructor({ playerId, equipment = [] }) {
    this.playerId = playerId;
    this.equipment = equipment;
  }

  addEquipment(item, bodyPart) {
    if (!Object.values(BodyParts).includes(bodyPart)) {
      throw new Error(`Invalid body part: ${bodyPart}`);
    }

    const existingItem = this.equipment.find(equip => equip.bodyPart === bodyPart);
    if (existingItem) {
      throw new Error(`There is already equipment in the ${bodyPart} slot.`);
    }

    this.equipment.push({ ...item, bodyPart });
  }

  removeEquipment(bodyPart) {
    const index = this.equipment.findIndex(equip => equip.bodyPart === bodyPart);
    if (index === -1) {
      throw new Error(`No equipment found in the ${bodyPart} slot.`);
    }

    this.equipment.splice(index, 1);
  }

  updateEquipment(bodyPart, newItem) {
    const index = this.equipment.findIndex(equip => equip.bodyPart === bodyPart);
    if (index === -1) {
      throw new Error(`No equipment found in the ${bodyPart} slot.`);
    }

    this.equipment[index] = { ...newItem, bodyPart };
  }

  getEquipment(bodyPart) {
    return this.equipment.find(equip => equip.bodyPart === bodyPart) || null;
  }

  listEquipment() {
    return this.equipment;
  }
}

module.exports = EquipmentManager;
