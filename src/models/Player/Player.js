const PlayerMethods = require("./PlayerManager");
class Player {
  constructor(args = {}) {
    const { } = args;

    Object.assign(this, {
      playerId,
      name: "Unknown Adventurer",
      age: 0,
      height: 0,
      weight: 0,
      race: "Human",
      subrace: null,
      level : 1,
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
      loadout: {
        HEAD: {},
        HAND_LEFT: {},
        HAND_RIGHT: {},
        CHEST: {},
        LEGS: {},
        FEET: {},
        BACK: {},
        NECK: {},
        RING_LEFT: {},
        RING_RIGHT: {},
        OTHER: {}
      },
      ...args,
    });

    PlayerMethods.updateProficiencyBonus(this);
  }
}

module.exports = Player;
