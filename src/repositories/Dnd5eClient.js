const axios = require('axios');
const cache = new Map();

class Dnd5eClient {
  constructor() {
    this.baseURL = process.env.DND_5E_URL;

    if (!this.baseURL) {
      throw new Error("Base URL for DnD 5e API not found. Please set DND_5E_URL in the .env file.");
    }
  }

  getBasePaths = () => this.getData("/api");
  getAbilityScores = (id = null) => this.getData(`/api/ability-scores${id ? `/${id}` : ''}`);
  getAlignments = (id = null) => this.getData(`/api/alignments${id ? `/${id}` : ''}`);
  getBackgrounds = (id = null) => this.getData(`/api/backgrounds${id ? `/${id}` : ''}`);
  getClasses = (id = null) => this.getData(`/api/classes${id ? `/${id}` : ''}`);
  getConditions = (id = null) => this.getData(`/api/conditions${id ? `/${id}` : ''}`);
  getDamageTypes = (id = null) => this.getData(`/api/damage-types${id ? `/${id}` : ''}`);
  getEquipment = (id = null) => this.getData(`/api/equipment${id ? `/${id}` : ''}`);
  getEquipmentCategories = (id = null) => this.getData(`/api/equipment-categories${id ? `/${id}` : ''}`);
  getFeats = (id = null) => this.getData(`/api/feats${id ? `/${id}` : ''}`);
  getFeatures = (id = null) => this.getData(`/api/features${id ? `/${id}` : ''}`);
  getLanguages = (id = null) => this.getData(`/api/languages${id ? `/${id}` : ''}`);
  getMagicItems = (id = null) => this.getData(`/api/magic-items${id ? `/${id}` : ''}`);
  getMagicSchools = (id = null) => this.getData(`/api/magic-schools${id ? `/${id}` : ''}`);
  getMonsters = (id = null) => this.getData(`/api/monsters${id ? `/${id}` : ''}`);
  getProficiencies = (id = null) => this.getData(`/api/proficiencies${id ? `/${id}` : ''}`);
  getRaces = (id = null) => this.getData(`/api/races${id ? `/${id}` : ''}`);
  getRuleSections = (id = null) => this.getData(`/api/rule-sections${id ? `/${id}` : ''}`);
  getRules = (id = null) => this.getData(`/api/rules${id ? `/${id}` : ''}`);
  getSkills = (skill = null) => this.getData(`/api/skills${skill ? `/${skill}` : ''}`);
  getSpells = (spell = null) => this.getData(`/api/spells${spell ? `/${spell}` : ''}`);
  getSubclasses = (id = null) => this.getData(`/api/subclasses${id ? `/${id}` : ''}`);
  getSubraces = (id = null) => this.getData(`/api/subraces${id ? `/${id}` : ''}`);
  getTraits = (id = null) => this.getData(`/api/traits${id ? `/${id}` : ''}`);
  getWeaponProperties = (id = null) => this.getData(`/api/weapon-properties${id ? `/${id}` : ''}`);

  async getData(path) {
    if (cache.has(path)) {
      return cache.get(path);
    }

    const URI = `${this.baseURL}${path}`;
    try {
      const response = await axios.get(URI);
      const data = response.data.results || response.data;
      cache.set(path, data);
      return data;
    } catch (err) {
      console.error(`Error fetching data from ${URI}: ${err.message}`);
      throw new Error(`Failed to fetch from ${URI}: ${err.message}`);
    }
  }
}

module.exports = Dnd5eClient;
