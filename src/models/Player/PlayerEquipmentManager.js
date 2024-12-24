const BodyParts = Object.freeze({
    HEAD: "head",
    HAND_LEFT: "hand_left",
    HAND_RIGHT: "hand_right",
    CHEST: "chest",
    LEGS: "legs",
    FEET: "feet",
    BACK: "back",
    NECK: "neck",
    RING_LEFT: "ring_left",
    RING_RIGHT: "ring_right",
    OTHER: "",
  });
  
  class EquipmentManager {
    static addEquipment(player, equipment, bodyPart) {
      if (!Object.values(BodyParts).includes(bodyPart)) {
        throw new Error(`Invalid body part: ${bodyPart}`);
      }
  
      // Check if the body part is already occupied
      const existingItem = player.equipment.find(item => item.bodyPart === bodyPart);
      if (existingItem) {
        throw new Error(`There is already equipment in the ${bodyPart} slot.`);
      }
  
      // Add the equipment to the player's equipments and assign it to the body part
      player.equipment.push({ ...equipment, bodyPart });
    }
  
    static removeEquipment(player, bodyPart) {
      if (!Object.values(BodyParts).includes(bodyPart)) {
        throw new Error(`Invalid body part: ${bodyPart}`);
      }
  
      // Find the equipment in the body part slot
      const index = player.equipment.findIndex(item => item.bodyPart === bodyPart);
      if (index === -1) {
        throw new Error(`No equipment found in the ${bodyPart} slot.`);
      }
  
      // Remove the equipment from the player's inventory
      player.equipment.splice(index, 1);
    }
  
    static updateEquipment(player, bodyPart, newEquipment) {
      if (!Object.values(BodyParts).includes(bodyPart)) {
        throw new Error(`Invalid body part: ${bodyPart}`);
      }
  
      // Find the equipment in the body part slot
      const index = player.equipment.findIndex(item => item.bodyPart === bodyPart);
      if (index === -1) {
        throw new Error(`No equipment found in the ${bodyPart} slot.`);
      }
  
      // Update the equipment in the player's equipment slot
      player.equipment[index] = { ...newEquipment, bodyPart };
    }
  
    static getEquipment(player, bodyPart) {
      if (!Object.values(BodyParts).includes(bodyPart)) {
        throw new Error(`Invalid body part: ${bodyPart}`);
      }
  
      // Find the equipment in the body part slot
      const item = player.equipment.find(item => item.bodyPart === bodyPart);
      return item ? item : null;
    }
  }
  
  module.exports = { EquipmentManager, BodyParts };
  