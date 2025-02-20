class Quest {
    constructor(args = {}) {
      const {
        title = "Untitled Quest",
        description = "A new quest awaits.",
        objectives = [],          // List of objectives to complete the quest
        status = "Pending",       // Status of the quest (e.g., Pending, Ongoing, Completed)
        rewards = [],             // Rewards for completing the quest
        assignedTo = [],          // NPCs assigned to this quest
        difficulty = "Medium",    // Difficulty level (Easy, Medium, Hard)
        relatedFactions = [],     // Factions tied to the quest
        consequences = {},        // Potential consequences of the quest
        ...otherOptions
      } = args;
  
      Object.assign(this, {
        title,
        description,
        objectives,
        status,
        rewards,
        assignedTo,
        difficulty,
        relatedFactions,
        consequences,
        ...otherOptions,
      });
    }
  }
  
  module.exports = Quest;
  