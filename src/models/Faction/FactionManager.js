class FactionManager {

    static addMember(faction, memberId) {
      if (!memberId) {
        throw new Error('Invalid member ID.');
      }
  
      if (faction.members.includes(memberId)) {
        throw new Error(`Member with ID '${memberId}' is already in the faction.`);
      }
  
      faction.members.push(memberId);
    }
  
    static removeMember(faction, memberId) {
      const index = faction.members.indexOf(memberId);
      if (index === -1) {
        throw new Error(`Member with ID '${memberId}' not found in the faction.`);
      }
  
      faction.members.splice(index, 1);
    }
  
    static addLeader(faction, leaderId) {
      if (!leaderId) {
        throw new Error('Invalid leader ID.');
      }
  
      if (faction.leaders.includes(leaderId)) {
        throw new Error(`Leader with ID '${leaderId}' is already in the faction.`);
      }
  
      faction.leaders.push(leaderId);
    }
  
    static removeLeader(faction, leaderId) {
      const index = faction.leaders.indexOf(leaderId);
      if (index === -1) {
        throw new Error(`Leader with ID '${leaderId}' not found in the faction.`);
      }
  
      faction.leaders.splice(index, 1);
    }
  
    static addAlly(faction, allyId) {
      if (!allyId) {
        throw new Error('Invalid ally ID.');
      }
  
      if (faction.allies.includes(allyId)) {
        throw new Error(`Faction with ID '${allyId}' is already an ally.`);
      }
  
      faction.allies.push(allyId);
    }
  
    static removeAlly(faction, allyId) {
      const index = faction.allies.indexOf(allyId);
      if (index === -1) {
        throw new Error(`Faction with ID '${allyId}' is not an ally.`);
      }
  
      faction.allies.splice(index, 1);
    }
  
    static addEnemy(faction, enemyId) {
      if (!enemyId) {
        throw new Error('Invalid enemy ID.');
      }
  
      if (faction.enemies.includes(enemyId)) {
        throw new Error(`Faction with ID '${enemyId}' is already an enemy.`);
      }
  
      faction.enemies.push(enemyId);
    }
  
    static removeEnemy(faction, enemyId) {
      const index = faction.enemies.indexOf(enemyId);
      if (index === -1) {
        throw new Error(`Faction with ID '${enemyId}' is not an enemy.`);
      }
  
      faction.enemies.splice(index, 1);
    }
  
    static addGoal(faction, goal) {
      if (!goal) {
        throw new Error('Goal must be a valid string or object.');
      }
  
      if (faction.goals.includes(goal)) {
        throw new Error(`Goal '${goal}' is already set for the faction.`);
      }
  
      faction.goals.push(goal);
    }
  
    static removeGoal(faction, goal) {
      const index = faction.goals.indexOf(goal);
      if (index === -1) {
        throw new Error(`Goal '${goal}' not found in the faction.`);
      }
  
      faction.goals.splice(index, 1);
    }
  
    static updateInfluence(faction, amount) {
      if (typeof amount !== 'number') {
        throw new Error('Influence amount must be a number.');
      }
  
      faction.influence += amount;
  
      if (faction.influence < 0) {
        faction.influence = 0;
      }
    }
  
    static factionDetails(faction) {
      return {
        name: faction.name,
        description: faction.description,
        alignment: faction.alignment,
        influence: faction.influence,
        goals: faction.goals,
        allies: faction.allies,
        enemies: faction.enemies,
        members: faction.members,
        leaders: faction.leaders,
      };
    }
  }
  
  module.exports = FactionManager;
  