class Faction {
    constructor(args = {}) {
      const {
        name = "Unnamed Faction",
        description = "A new and mysterious faction.",
        leaders = [],            // The leader(s) of the faction (could be an NPC)
        members = [],            // List of NPCs or entities in the faction
        alignment = "Neutral",   // Faction's alignment (Good, Evil, Neutral)
        goals = [],              // Goals the faction is working toward
        allies = [],             // List of allied factions
        enemies = [],            // List of enemy factions
        influence = 0,           // Faction's level of influence in the world
        ...otherOptions
      } = args;
  
      Object.assign(this, {
        name,
        description,
        leader,
        members,
        alignment,
        goals,
        allies,
        enemies,
        influence,
        ...otherOptions,
      });
    }
  }
  
  module.exports = Faction;
  