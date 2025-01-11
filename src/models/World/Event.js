class Event {
    constructor(args = {}) {
      const {
        name = "Unnamed Event",
        description = "A mysterious event in the world.",
        type = "General",         // Event type (e.g., War, Disaster, Festival)
        startDate = null,         // Event start date
        endDate = null,           // Event end date
        isOngoing = false,        // Event currently happening or not.
        participants = [],        // List of factions, NPCs, or players involved
        outcome = null,           // Outcome of the event (can be set after resolution)
        consequences = {},        // Consequences for the world, factions, or regions
        ...otherOptions
      } = args;
  
      Object.assign(this, {
        name,
        description,
        type,
        startDate,
        endDate,
        participants,
        outcome,
        consequences,
        ...otherOptions,
      });
    }
  }
  
  module.exports = Event;
  