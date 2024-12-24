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


    // Constructor validation
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

  // Core Methods

  setLevel(value) {
    this._updateValue(value, "number", "Level must be between 1 and 20");
    this.level += value;
    this.updateProficiencyBonus();
  }

  updateProficiencyBonus() {
    this.proficiencyBonus = Math.floor(1 + this.level / 4);
  }

  updateAbilityScore(ability, value) {
    const validAbilities = ["str", "dex", "con", "int", "wis", "cha"];
    if (!validAbilities.includes(ability)) {
      throw new Error("Invalid ability score");
    }
    this._updateValue(value, "number", "Ability score modifier must be between -5 and 5");
    this.abilityScores[ability] = Math.max(1, this.abilityScores[ability] + value);
  }

  updateHp(amount) {
    this._updateValue(amount, "number", "Amount to update HP");
    this.hp = Math.max(0, this.hp + amount);
  }

  toggleInspiration() {
    this.inspiration = !this.inspiration;
  }

  addClass(newClass) {
    if (typeof newClass !== "string" || newClass.trim() === "") {
      throw new Error("Class must be a non-empty string");
    }
    if (!this.classes.includes(newClass)) {
      this.classes.push(newClass);
    } else {
      console.warn(`${newClass} is already a class for this player.`);
    }
  }

removeClass(classToRemove) {
    const index = this.classes.indexOf(classToRemove);
    if (index !== -1) {
      this.classes.splice(index, 1);
    } else {
      throw new Error(`${classToRemove} is not a class for this player.`);
    }
  }

  addSubclass(subclass) {
    if (typeof subclass !== "string" || subclass.trim() === "") {
      throw new Error("Subclass must be a non-empty string");
    }
    if (!this.subclasses.includes(subclass)) {
      this.subclasses.push(subclass);
    }
  }

  removeSubclass(subclass) {
    const index = this.subclasses.indexOf(subclass);
    if (index !== -1) {
      this.subclasses.splice(index, 1);
    } else {
      throw new Error(`${subclass} is not a subclass for this player.`);
    }
  }

  getClassDetails() {
    return {
      classes: [...this.classes],
      subclasses: [...this.subclasses],
    };
  }

  addTrait(trait) {
    if (typeof trait !== "string" || trait.trim() === "") {
      throw new Error("Trait must be a non-empty string");
    }
    if (!this.traits.includes(trait)) {
      this.traits.push(trait);
    }
  }

  removeTrait(trait) {
    const index = this.traits.indexOf(trait);
    if (index !== -1) {
      this.traits.splice(index, 1);
    } else {
      throw new Error(`${trait} is not in the traits list.`);
    }
  }

  hasTrait(trait) {
    return this.traits.includes(trait);
  }

  learnSpell(spell) {
    if (typeof spell !== "string" || spell.trim() === "") {
      throw new Error("Spell must be a non-empty string");
    }
    if (!this.knownSpells.includes(spell)) {
      this.knownSpells.push(spell);
    }
  }

  forgetSpell(spell) {
    const index = this.knownSpells.indexOf(spell);
    if (index !== -1) {
      this.knownSpells.splice(index, 1);
    } else {
      throw new Error(`${spell} is not in the known spells list.`);
    }
  }

  knowsSpell(spell) {
    return this.knownSpells.includes(spell);
  }

  adjustReputation(amount) {
    if (typeof amount !== "number") {
      throw new Error("Amount must be a number");
    }
    this.reputation += amount;
  }

  hasReputation(threshold) {
    return this.reputation >= threshold;
  }


  // Modifiers

  addCondition(condition) {
    this._addToArray(this.conditions, condition);
  }

  removeEffect(effect) {
    this._removeFromArray(this.effects, effect);
  }

  addProficiency(proficiency) {
    this._addToArray(this.proficiencies, proficiency);
  }

  addFeat(feat) {
    this._addToArray(this.feats, feat);
  }

  addEffect(effect) {
    this._addToArray(this.effects, effect);
  }

  addLanguage(language) {
    this._addToArray(this.knownLanguages, language);
  }

  removeLanguage(language) {
    this._removeFromArray(this.knownLanguages, language);
  }

  updateSpeed(speedModifier) {
    this._updateValue(speedModifier, "number", "Speed modifier must be a number");
    this.speed += speedModifier;
  }

  addResistance(damageType) {
    this._addToArray(this.resistances, damageType);
  }

  removeResistance(damageType) {
    this._removeFromArray(this.resistances, damageType);
  }

  addImmunity(damageType) {
    this._addToArray(this.immunities, damageType);
  }

  removeImmunity(damageType) {
    this._removeFromArray(this.immunities, damageType);
  }

  addVulnerability(damageType) {
    this._addToArray(this.vulnerabilities, damageType);
  }

  removeVulnerability(damageType) {
    this._removeFromArray(this.vulnerabilities, damageType);
  }

  updateDeathSaves(successes = 0, failures = 0) {
    this._updateValue(successes, "number", "Successes must be numbers");
    this._updateValue(failures, "number", "Failures must be numbers");
    this.deathSaves.successes = Math.min(3, this.deathSaves.successes + successes);
    this.deathSaves.failures = Math.min(3, this.deathSaves.failures + failures);
  }

  // Helper Methods
  
  /**
   * Adds a value to an array if it is not already present.
   * @param {Array} array - The array to add the value to.
   * @param {string} value - The value to add.
   */
  _addToArray(array, value) {
    try {
      if (typeof value !== 'string' || value.trim() === "") {
        throw new Error("Value must be a non-empty string");
      }
      if (!array.includes(value)) {
        array.push(value);
      }
    } catch (error) {
      console.error(`Error adding value: ${error.message}`);
    }
  }

  /**
   * Removes a value from an array.
   * @param {Array} array - The array to remove the value from.
   * @param {string} value - The value to remove.
   */
  _removeFromArray(array, value) {
    try {
      const index = array.indexOf(value);
      if (index === -1) {
        throw new Error("Value not found");
      }
      array.splice(index, 1);
    } catch (error) {
      console.error(`Error removing value: ${error.message}`);
    }
  }

  /**
   * Updates a value if it matches the specified type.
   * @param {any} value - The value to update.
   * @param {string} type - The expected type of the value.
   * @param {string} errorMessage - The error message if validation fails.
   */
  _updateValue(value, type, errorMessage) {
    if (typeof value !== type) {
      throw new Error(errorMessage);
    }
  }

  getSummary() {
    return {
      name: this.name,
      age: this.age,
      height: this.height,
      weight: this.weight,
      race: {
        main: this.race,
        subrace: this.subrace || null,
      },
      background: this.background,
      alignment: this.alignment,
      classes: {
        main: this.classes,
        subclasses: this.subclasses,
      },
      abilityScores: { ...this.abilityScores },
      savingThrows: { ...this.savingThrows },
      skills: { ...this.skills },
      knownLanguages: [...this.knownLanguages],
      proficiencies: [...this.proficiencies],
      traits: [...this.traits],
      conditions: [...this.conditions],
      inventory: [...this.inventory],
      currency: { ...this.currency },
      combat: {
        hp: this.hp,
        tempHp: this.tempHp,
        ac: this.ac,
        speed: this.speed,
        hitDice: this.hitDice,
        initBonus: this.initBonus,
      },
      spells: {
        spellSlots: { ...this.spellSlots },
        knownSpells: [...this.knownSpells],
      },
      inspiration: this.inspiration,
      passivePerception: this.passivePerception,
      effects: [...this.effects],
      resistances: [...this.resistances],
      immunities: [...this.immunities],
      vulnerabilities: [...this.vulnerabilities],
      deathSaves: { ...this.deathSaves },
      familiar: this.familiar,
      proficiencyBonus: this.proficiencyBonus,
      reputation: this.reputation,
    };
  }
  
}

module.exports = Player;