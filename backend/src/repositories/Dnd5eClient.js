const axios = require('axios');
const NodeCache = require('node-cache');

class Dnd5eClient {
  constructor() {
    this.baseURL = process.env.DND_5E_URL;

    if (!this.baseURL) {
      throw new Error("Base URL for DnD 5e API not found. Please set DND_5E_URL in the .env file.");
    }

    this.cache = new NodeCache({ 
      stdTTL: 600, 
      checkperiod: 240
    });

    // Dynamically creating methods for each API path
    this.resources = [
      "ability-scores", "alignments", "backgrounds", "classes", "conditions",
      "damage-types", "equipment", "equipment-categories", "feats", "features",
      "languages", "magic-items", "magic-schools", "monsters", "proficiencies",
      "races", "rule-sections", "rules", "skills", "spells", "subclasses",
      "subraces", "traits", "weapon-properties"
    ];

    this.resources.forEach(resource => {
      const methodName = `get${this.capitalize(resource)}`;

      this[methodName] = (id = null) => {
        const path = `/api/${resource}${id ? `/${id}` : ''}`;
        
        return this.getData(path);
      };
    });
  }

  getBasePaths = () => this.getData("/api");

  // Helper to capitalize resource names (for method naming consistency)
  capitalize = (str) => str.replace(/(?:^|-)(\w)/g, (_, c) => c.toUpperCase());

  async getData(path) {
    // Check if the path is cached in memory
    const cachedData = this.cache.get(path);
    if (cachedData) {
      return cachedData;
    }

    const URI = `${this.baseURL}${path}`;
    try {
      const response = await axios.get(URI);
      const data = response.data.results || response.data;

      this.cache.set(path, data);
      return data;
    } catch (err) {
      console.error(`Error fetching data from ${URI}: ${err.message}`);
      throw new Error(`Failed to fetch from ${URI}: ${err.message}`);
    }
  }
}

module.exports = Dnd5eClient;
