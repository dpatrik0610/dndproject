class Player {
  constructor({
    name = "Unknown Adventurer",
    age = 0,
    height = "Unknown",
    weight = "Unknown",
    race = "Human",
    subrace = null,
    background = "Commoner",
    alignment = "Neutral",
    classes = [],
    subclasses = [],
    abilityScores = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    savingThrows = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
    skills = {},
    feats = {},
    knownLanguages = ["Common"],
    proficiencies = [],
    traits = [],
    conditions = [],
    inventory = [],
    currency = { platinum: 0, gold: 0, silver: 0, copper: 0 },
    hp = 10,
    tempHp = 0,
    hitDice = "1d8",
    ac = 10,
    initBonus = 0,
    speed = 30,
    spellSlots = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    knownSpells = [],
    inspiration = false,
    passivePerception = 10,
    effects = [],
    resistances = [],
    immunities = [],
    vulnerabilities = [],
    deathSaves = { successes: 0, failures: 0 },
    familiar = null,
    proficiencyBonus = 2,
    reputation = 0
  } = {}) {
    this.name = name;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.race = race;
    this.subrace = subrace;
    this.background = background;
    this.alignment = alignment;
    this.classes = classes;
    this.subclasses = subclasses;
    this.abilityScores = abilityScores;
    this.savingThrows = savingThrows;
    this.skills = skills;
    this.feats = feats;
    this.knownLanguages = knownLanguages;
    this.proficiencies = proficiencies;
    this.traits = traits;
    this.conditions = conditions;
    this.inventory = inventory;
    this.currency = currency;
    this.hp = hp;
    this.tempHp = tempHp;
    this.hitDice = hitDice;
    this.ac = ac;
    this.initBonus = initBonus;
    this.speed = speed;
    this.spellSlots = spellSlots;
    this.knownSpells = knownSpells;
    this.inspiration = inspiration;
    this.passivePerception = passivePerception;
    this.effects = effects;
    this.resistances = resistances;
    this.immunities = immunities;
    this.vulnerabilities = vulnerabilities;
    this.deathSaves = deathSaves;
    this.familiar = familiar;
    this.proficiencyBonus = proficiencyBonus;
    this.reputation = reputation;
  }

  addCondition(condition) {
    try {
      if (typeof condition !== 'string' || condition.trim() === "") {
        throw new Error("Condition must be a non-empty string");
      }
      if (!this.conditions.includes(condition)) {
        this.conditions.push(condition);
      }
    } catch (error) {
      console.error(`Error adding condition: ${error.message}`);
    }
  }

  updateHp(amount) {
    try {
      if (typeof amount !== 'number') {
        throw new Error("Amount to update HP must be a number");
      }
      if (amount < -this.hp) {
        throw new Error("Cannot reduce HP below zero");
      }
      this.hp = Math.max(0, this.hp + amount);
    } catch (error) {
      console.error(`Error updating HP: ${error.message}`);
    }
  }

  addProficiency(proficiency) {
    try {
      if (typeof proficiency !== 'string' || proficiency.trim() === "") {
        throw new Error("Proficiency must be a non-empty string");
      }
      if (!this.proficiencies.includes(proficiency)) {
        this.proficiencies.push(proficiency);
      }
    } catch (error) {
      console.error(`Error adding proficiency: ${error.message}`);
    }
  }
  
  setLevel(value) {
    try {
      if (value < 1 || value > 20) {
        throw new Error("Level must be between 1 and 20");
      }
      this.level += value;
      this.updateProficiencyBonus();
    } catch (error) {
      console.error(`Error setting new Level: ${error.message}`);
    }
  }

  updateProficiencyBonus() {
    try {
      this.proficiencyBonus = Math.floor(1 + this.level / 4);
    } catch (error) {
      console.error(`Error updating proficiency bonus: ${error.message}`);
    }
  }
  
  updateAbilityScore(ability, value) {
    try {
      if (!["str", "dex", "con", "int", "wis", "cha"].includes(ability)) {
        throw new Error("Invalid ability score");
      }
      if (typeof value !== 'number' || value < -5 || value > 5) {
        throw new Error("Ability score modifier must be between -5 and 5");
      }
      this.abilityScores[ability] = Math.max(1, this.abilityScores[ability] + value);
    } catch (error) {
      console.error(`Error updating ability score: ${error.message}`);
    }
  }

  addFeat(feat) {
    try {
      if (typeof feat !== 'string' || feat.trim() === "") {
        throw new Error("Feat must be a non-empty string");
      }
      if (!this.feats.includes(feat)) {
        this.feats.push(feat);
      }
    } catch (error) {
      console.error(`Error adding feat: ${error.message}`);
    }
  }

  updateDeathSaves(successes = 0, failures = 0) {
    try {
      if (typeof successes !== 'number' || typeof failures !== 'number') {
        throw new Error("Both successes and failures must be numbers");
      }
      this.deathSaves.successes = Math.min(3, this.deathSaves.successes + successes);
      this.deathSaves.failures = Math.min(3, this.deathSaves.failures + failures);
    } catch (error) {
      console.error(`Error updating death saves: ${error.message}`);
    }
  }

  addEffect(effect) {
    try {
      if (typeof effect !== 'string' || effect.trim() === "") {
        throw new Error("Effect must be a non-empty string");
      }
      if (!this.effects.includes(effect)) {
        this.effects.push(effect);
      }
    } catch (error) {
      console.error(`Error adding effect: ${error.message}`);
    }
  }

  removeEffect(effect) {
    try {
      const index = this.effects.indexOf(effect);
      if (index === -1) {
        throw new Error("Effect not found");
      }
      this.effects.splice(index, 1);
    } catch (error) {
      console.error(`Error removing effect: ${error.message}`);
    }
  }

  addLanguage(language) {
    try {
      if (typeof language !== 'string' || language.trim() === "") {
        throw new Error("Language must be a non-empty string");
      }
      if (!this.knownLanguages.includes(language)) {
        this.knownLanguages.push(language);
      }
    } catch (error) {
      console.error(`Error adding language: ${error.message}`);
    }
  }

  removeLanguage(language) {
  try {
      const index = this.knownLanguages.indexOf(language);
      if (index === -1) {
        throw new Error("Language not found");
      }
      this.knownLanguages.splice(index, 1);
    } catch (error) {
      console.error(`Error removing language: ${error.message}`);
    }
  }
  
  updateSpeed(speedModifier) {
  try {
    if (typeof speedModifier !== 'number') {
      throw new Error("Speed modifier must be a number");
    }
    this.speed += speedModifier;
  } catch (error) {
    console.error(`Error updating speed: ${error.message}`);
  }
}

toggleInspiration() {
  this.inspiration = !this.inspiration;
}

addResistance(damageType) {
  try {
    if (typeof damageType !== 'string' || damageType.trim() === "") {
      throw new Error("Damage type must be a non-empty string");
    }
    if (!this.resistances.includes(damageType)) {
      this.resistances.push(damageType);
    }
  } catch (error) {
    console.error(`Error adding resistance: ${error.message}`);
  }
}

removeResistance(damageType) {
  try {
    const index = this.resistances.indexOf(damageType);
    if (index === -1) {
      throw new Error("Resistance not found");
    }
    this.resistances.splice(index, 1);
  } catch (error) {
    console.error(`Error removing resistance: ${error.message}`);
  }
}

addImmunity(damageType) {
  try {
    if (typeof damageType !== 'string' || damageType.trim() === "") {
      throw new Error("Damage type must be a non-empty string");
    }
    if (!this.immunities.includes(damageType)) {
      this.immunities.push(damageType);
    }
  } catch (error) {
    console.error(`Error adding immunity: ${error.message}`);
  }
}

removeImmunity(damageType) {
  try {
    const index = this.immunities.indexOf(damageType);
    if (index === -1) {
      throw new Error("Immunity not found");
    }
    this.immunities.splice(index, 1);
  } catch (error) {
    console.error(`Error removing immunity: ${error.message}`);
  }
}

addVulnerability(damageType) {
  try {
    if (typeof damageType !== 'string' || damageType.trim() === "") {
      throw new Error("Damage type must be a non-empty string");
    }
    if (!this.vulnerabilities.includes(damageType)) {
      this.vulnerabilities.push(damageType);
    }
  } catch (error) {
    console.error(`Error adding vulnerability: ${error.message}`);
  }
}

removeVulnerability(damageType) {
  try {
    const index = this.vulnerabilities.indexOf(damageType);
    if (index === -1) {
      throw new Error("Vulnerability not found");
    }
    this.vulnerabilities.splice(index, 1);
  } catch (error) {
    console.error(`Error removing vulnerability: ${error.message}`);
  }
}


}

module.exports = Player;
