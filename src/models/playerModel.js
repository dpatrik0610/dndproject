class Player {
    constructor({
      name,
      age,
      height,
      weight,
      race,
      subrace,
      background,
      alignment,
      classes = [],
      subclasses = [],
      abilityScores = {}, // {str, dex, con, int, wis, cha}
      savingThrows = {}, // {str, dex, con, int, wis, cha}
      skills = {}, // {skillName: proficiencyLevel}
      feats = {}, // {level: [feat1, feat2]}
      knownLanguages = [],
      proficiencies = [],
      traits = [],
      conditions = [],
      inventory = [],
      currency = {}, // {platinum: 0, gold: 0, silver: 0, copper: 0}
      hp = 0,
      tempHp = 0,
      hitDice = "",
      ac = 0,
      initBonus = 0,
      speed = 0,
      spellSlots = {}, // {level: count}
      knownSpells = [],
      inspiration = false,
      passivePerception = 0,
      effects = [],
      resistances = [],
      immunities = [],
      vulnerabilities = [],
      deathSaves = { successes: 0, failures: 0 },
      familiar = null, // {name, type, stats}
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
        if (condition === null) return;

        if (!this.conditions.includes(condition)) {
            this.conditions.push(condition);
        }
    }
  
    updateHp(amount) {
        if (amount === null || amount == 0) return;

        this.hp = Math.max(0, this.hp + amount);
    }
  }
  