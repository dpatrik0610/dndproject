class PlayerValidation {
    static validateConstructor(args) {
      const {
        name, age, height, weight, race, abilityScores, hp, speed, proficiencyBonus, deathSaves,
      } = args;
  
      if (typeof name !== "string" || name.trim() === "") {
        throw new Error("Name must be a non-empty string");
      }
      if (typeof age !== "number" || age < 0 || age > 150) {
        throw new Error("Age must be a number between 0 and 150");
      }
      if (typeof height !== "string" || height.trim() === "") {
        throw new Error("Height must be a non-empty string");
      }
      if (typeof weight !== "string" || weight.trim() === "") {
        throw new Error("Weight must be a non-empty string");
      }
      if (typeof race !== "string" || race.trim() === "") {
        throw new Error("Race must be a non-empty string");
      }
      if (abilityScores) {
        Object.keys(abilityScores).forEach((key) => {
          if (!["str", "dex", "con", "int", "wis", "cha"].includes(key)) {
            throw new Error(`Invalid ability score: ${key}`);
          }
          if (typeof abilityScores[key] !== "number" || abilityScores[key] < 1 || abilityScores[key] > 20) {
            throw new Error("Ability scores must be between 1 and 20");
          }
        });
      }
      if (typeof hp !== "number" || hp < 0) {
        throw new Error("HP must be a number greater than or equal to 0");
      }
      if (typeof speed !== "number" || speed <= 0) {
        throw new Error("Speed must be a positive number");
      }
      if (typeof proficiencyBonus !== "number" || proficiencyBonus <= 0) {
        throw new Error("Proficiency bonus must be a positive number");
      }
      if (deathSaves) {
        if (typeof deathSaves.successes !== "number" || deathSaves.successes < 0 || deathSaves.successes > 3) {
          throw new Error("Death save successes must be a number between 0 and 3");
        }
        if (typeof deathSaves.failures !== "number" || deathSaves.failures < 0 || deathSaves.failures > 3) {
          throw new Error("Death save failures must be a number between 0 and 3");
        }
      }
    }
  }
  
  module.exports = PlayerValidation;
  