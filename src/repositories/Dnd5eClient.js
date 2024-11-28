const axios = require('axios');

class Cache {
  constructor(expiryTime= 60*60*1000 /*1 hour*/){
    this.cache = new Map();
    this.expiryTime = expiryTime;
  }

  get(path){
    const cacheEntry = this.cache.get(path);
    const currentTime = Date.now();

    if (cacheEntry && (currentTime - cacheEntry.timestamp < this.expiryTime)) {
      return cacheEntry.data;
    }

    return null;
  }

  set(path, data){
    const timestamp = Date.now();
    this.cache.set(path, {data, timestamp});
  }
}
const cache = new Map();

class Dnd5eClient {
  constructor() {
    this.baseURL = process.env.DND_5E_URL;

    if (!this.baseURL) {
      throw new Error("Base URL for DnD 5e API not found. Please set DND_5E_URL in the .env file.");
    }

    // Dynamically create methods for each API path
    this.resources = [
      "ability-scores", "alignments", "backgrounds", "classes", "conditions",
      "damage-types", "equipment", "equipment-categories", "feats", "features",
      "languages", "magic-items", "magic-schools", "monsters", "proficiencies",
      "races", "rule-sections", "rules", "skills", "spells", "subclasses",
      "subraces", "traits", "weapon-properties"
    ];

    // This generates class methods dynamically, because dnd5eAPI has many base endpoints.
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
