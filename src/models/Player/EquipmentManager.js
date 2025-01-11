class EquipmentManager {
  static addEquipment(player, item, bodyPart) {
    if (!player.loadout.hasOwnProperty(bodyPart)) {
      throw new Error(`Invalid body part: ${bodyPart}`);
    }

    const existingItem = player.loadout[bodyPart];
    if (existingItem && Object.keys(existingItem).length > 0) {
      throw new Error(`There is already equipment in the ${bodyPart} slot.`);
    }

    player.loadout[bodyPart] = { ...item };
  }

  static removeEquipment(player, bodyPart) {
    if (!player.loadout.hasOwnProperty(bodyPart)) {
      throw new Error(`Invalid body part: ${bodyPart}`);
    }

    if (!player.loadout[bodyPart] || Object.keys(player.loadout[bodyPart]).length === 0) {
      throw new Error(`No equipment found in the ${bodyPart} slot.`);
    }

    player.loadout[bodyPart] = {};
  }

  static updateEquipment(player, bodyPart, newItem) {
    if (!player.loadout.hasOwnProperty(bodyPart)) {
      throw new Error(`Invalid body part: ${bodyPart}`);
    }

    if (!player.loadout[bodyPart] || Object.keys(player.loadout[bodyPart]).length === 0) {
      throw new Error(`No equipment found in the ${bodyPart} slot to update.`);
    }

    player.loadout[bodyPart] = { ...newItem };
  }

  static getEquipment(player, bodyPart) {
    if (!player.loadout.hasOwnProperty(bodyPart)) {
      throw new Error(`Invalid body part: ${bodyPart}`);
    }

    return player.loadout[bodyPart] || null;
  }


  static listEquipment(player) {
    return player.loadout;
  }
}

module.exports = EquipmentManager;
