class Projections {
    static get spell() {
      return {
        _id: 0,
        index: 1,
        name: 1,
        level: 1,
        url: 1,
      };
    }
  
    static get race() {
      return {
        _id: 0,
        index: 1,
        name: 1,
        url: 1,
      };
    }
  
    static get player() {
      return {
        _id: 0,
        name: 1,
        race: 1,
        class: 1,
        level: 1,
        hp: 1,
        ac: 1,
        url: 1,
      };
    }
  }
  
  module.exports = Projections;
  