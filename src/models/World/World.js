const { ObjectId } = require("mongodb");

class World {
  constructor(args = {}) {
    const {
      worldId = new ObjectId(),
      name = "Unnamed World",
      description = "A new and mysterious world.",
      factions = [],
      regions = [],
      quests = [],
      events = [],
      npcList = [],
      currencies = [],
      globalItems = [],
      economyState = {},
      lore = {},
      weatherPatterns = {},
      currentTime = [],
      players = [],
      ...args
    } = args;

    Object.assign(this, {
      worldId,
      name,
      description,
      factions,         // List of factions within the world
      regions,          // Geographical regions with important locations and settlements
      quests,           // Active and completed quests within the world
      events,           // Major world events (wars, disasters, etc.)
      npcList,          // NPCs that exist in the world, including factions, leaders, etc.
      currencies,       // Types of currency used in the world (gold, silver, etc.)
      globalItems,      // Legendary items, artifacts, and treasures in the world
      economyState,     // The current economy: market prices, trade, etc.
      lore,             // Lore about the world's history, races, gods, etc.
      weatherPatterns,  // Weather patterns (seasons, storms, etc.)
      currentTime,      // Current time of the campaign.
      players,          // List of players that have contributed to or are active in the world
      ...args,
    });
  }
}

module.exports = World;
