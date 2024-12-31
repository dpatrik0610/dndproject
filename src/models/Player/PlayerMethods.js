const PlayerHelpers = require("./PlayerHelpers");

class PlayerMethods {
  static setLevel(player, value) {
    PlayerHelpers.updateValue(value, "number", "Level must be between 1 and 20");
    player.level += value;
    PlayerMethods.updateProficiencyBonus(player);
  }

  static updateProficiencyBonus(player) {
    player.proficiencyBonus = Math.floor(1 + player.level / 4);
  }

  static updateAbilityScore(player, ability, value) {
    const validAbilities = ["str", "dex", "con", "int", "wis", "cha"];
    if (!validAbilities.includes(ability)) {
      throw new Error("Invalid ability score");
    }
    PlayerHelpers.updateValue(value, "number", "Ability score modifier must be between -5 and 5");
    player.abilityScores[ability] = Math.max(1, player.abilityScores[ability] + value);
  }

  static updateHp(player, amount) {
    PlayerHelpers.updateValue(amount, "number", "Amount to update HP");
    player.hp = Math.max(0, player.hp + amount);
  }

  static toggleInspiration(player) {
    player.inspiration = !player.inspiration;
  }

  static addClass(player, newClass) {
    if (typeof newClass !== "string" || newClass.trim() === "") {
      throw new Error("Class must be a non-empty string");
    }
    if (!player.classes.includes(newClass)) {
      player.classes.push(newClass);
    } else {
      console.warn(`${newClass} is already a class for this player.`);
    }
  }

  static removeClass(player, classToRemove) {
    const index = player.classes.indexOf(classToRemove);
    if (index !== -1) {
      player.classes.splice(index, 1);
    } else {
      throw new Error(`${classToRemove} is not a class for this player.`);
    }
  }

  static addSubclass(player, subclass) {
    if (typeof subclass !== "string" || subclass.trim() === "") {
      throw new Error("Subclass must be a non-empty string");
    }
    if (!player.subclasses.includes(subclass)) {
      player.subclasses.push(subclass);
    }
  }

  static removeSubclass(player, subclass) {
    const index = player.subclasses.indexOf(subclass);
    if (index !== -1) {
      player.subclasses.splice(index, 1);
    } else {
      throw new Error(`${subclass} is not a subclass for this player.`);
    }
  }

  static getClassDetails(player) {
    return {
      classes: [...player.classes],
      subclasses: [...player.subclasses],
    };
  }

  static addTrait(player, trait) {
    if (typeof trait !== "string" || trait.trim() === "") {
      throw new Error("Trait must be a non-empty string");
    }
    if (!player.traits.includes(trait)) {
      player.traits.push(trait);
    }
  }

  static removeTrait(player, trait) {
    const index = player.traits.indexOf(trait);
    if (index !== -1) {
      player.traits.splice(index, 1);
    } else {
      throw new Error(`${trait} is not in the traits list.`);
    }
  }

  static hasTrait(player, trait) {
    return player.traits.includes(trait);
  }

  static learnSpell(player, spell) {
    if (typeof spell !== "string" || spell.trim() === "") {
      throw new Error("Spell must be a non-empty string");
    }
    if (!player.knownSpells.includes(spell)) {
      player.knownSpells.push(spell);
    }
  }

  static forgetSpell(player, spell) {
    const index = player.knownSpells.indexOf(spell);
    if (index !== -1) {
      player.knownSpells.splice(index, 1);
    } else {
      throw new Error(`${spell} is not in the known spells list.`);
    }
  }

  static knowsSpell(player, spell) {
    return player.knownSpells.includes(spell);
  }
  
  static updateSpellSlots(player, level, amount) {
    if (typeof level !== "number" || level < 1 || level > 9) {
      throw new Error("Spell level must be between 1 and 9");
    }
  
    if (typeof amount !== "number") {
      throw new Error("Amount must be a number");
    }
  
    player.spellSlots[level] = Math.max(0, (player.spellSlots[level] || 0) + amount);
  }
  

  static adjustReputation(player, amount) {
    if (typeof amount !== "number") {
      throw new Error("Amount must be a number");
    }
    player.reputation += amount;
  }

  static hasReputation(player, threshold) {
    return player.reputation >= threshold;
  }

  // Modifiers

  static addCondition(player, condition) {
    PlayerHelpers.addToArray(player.conditions, condition);
  }

  static removeEffect(player, effect) {
    PlayerHelpers.removeFromArray(player.effects, effect);
  }

  static addProficiency(player, proficiency) {
    PlayerHelpers.addToArray(player.proficiencies, proficiency);
  }

  static addFeat(player, feat) {
    PlayerHelpers.addToArray(player.feats, feat);
  }

  static addEffect(player, effect) {
    PlayerHelpers.addToArray(player.effects, effect);
  }

  static addLanguage(player, language) {
    PlayerHelpers.addToArray(player.knownLanguages, language);
  }

  static removeLanguage(player, language) {
    PlayerHelpers.removeFromArray(player.knownLanguages, language);
  }

  static updateSpeed(player, speedModifier) {
    PlayerHelpers.updateValue(speedModifier, "number", "Speed modifier must be a number");
    player.speed += speedModifier;
  }

  static addResistance(player, damageType) {
    PlayerHelpers.addToArray(player.resistances, damageType);
  }

  static removeResistance(player, damageType) {
    PlayerHelpers.removeFromArray(player.resistances, damageType);
  }

  static addImmunity(player, damageType) {
    PlayerHelpers.addToArray(player.immunities, damageType);
  }

  static removeImmunity(player, damageType) {
    PlayerHelpers.removeFromArray(player.immunities, damageType);
  }

  static addVulnerability(player, damageType) {
    PlayerHelpers.addToArray(player.vulnerabilities, damageType);
  }

  static removeVulnerability(player, damageType) {
    PlayerHelpers.removeFromArray(player.vulnerabilities, damageType);
  }

  static updateDeathSaves(player, successes = 0, failures = 0) {
    PlayerHelpers.updateValue(successes, "number", "Successes must be numbers");
    PlayerHelpers.updateValue(failures, "number", "Failures must be numbers");
    player.deathSaves.successes = Math.min(3, player.deathSaves.successes + successes);
    player.deathSaves.failures = Math.min(3, player.deathSaves.failures + failures);
  }


}

module.exports = PlayerMethods;
