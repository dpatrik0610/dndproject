const axios = require('axios');

class Dnd5eClient {
  constructor() {
    this.baseURL = process.env.DND_5E_URL;

    if (!this.baseURL) {
      throw new Error("Base URL for DnD 5e API not found. Please set DND_5E_URL in the .env file.");
    }
  }

  getBasePaths = () => this.getData("/api");
  getAbilityScores = () => this.getData("/api/ability-scores");
  getAlignments = () => this.getData("/api/alignments");
  getBackgrounds = () => this.getData("/api/backgrounds");
  getClasses = () => this.getData("/api/classes");
  getConditions = () => this.getData("/api/conditions");
  getDamageTypes = () => this.getData("/api/damage-types");
  getEquipment = () => this.getData("/api/equipment");
  getEquipmentCategories = () => this.getData("/api/equipment-categories");
  getFeats = () => this.getData("/api/feats");
  getFeatures = () => this.getData("/api/features");
  getLanguages = () => this.getData("/api/languages");
  getMagicItems = () => this.getData("/api/magic-items");
  getMagicSchools = () => this.getData("/api/magic-schools");
  getMonsters = () => this.getData("/api/monsters");
  getProficiencies = () => this.getData("/api/proficiencies");
  getRaces = () => this.getData("/api/races");
  getRuleSections = () => this.getData("/api/rule-sections");
  getRules = () => this.getData("/api/rules");
  getSkills = () => this.getData("/api/skills");
  getSpells = () => this.getData("/api/spells");
  getSubclasses = () => this.getData("/api/subclasses");
  getSubraces = () => this.getData("/api/subraces");
  getTraits = () => this.getData("/api/traits");
  getWeaponProperties = () => this.getData("/api/weapon-properties");

  async getData(path) {
    const URI = `${this.baseURL}${path}`;
    try {
      const response = await axios.get(URI);
      return response.data.results;
    } 
    catch (err) {
      console.error(`Couldn't fetch data from: ${URI} - ${err.message}`);
      throw new Error(`Failed to fetch from ${URI}: ${err.message}`);
    }
  }
}

module.exports = Dnd5eClient;
