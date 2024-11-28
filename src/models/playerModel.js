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
      if (condition && !this.conditions.includes(condition)) {
        this.conditions.push(condition);
      }
    }
  
    updateHp(amount) {
      if (amount) {
        this.hp = Math.max(0, this.hp + amount);
      }
    }
  
    addToInventory(item) {
      if (item) {
        this.inventory.push(item);
      }
    }
  
    gainExperience(exp) {
      if (exp > 0) {
        this.exp = (this.exp || 0) + exp;
      }
    }
  
    spendCurrency(type, amount) {
      if (this.currency[type] >= amount) {
        this.currency[type] -= amount;
      }
    }
  }
  
  module.exports = Player;
  