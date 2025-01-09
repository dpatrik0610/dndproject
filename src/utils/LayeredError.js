class LayeredError extends Error {
    constructor(message, layer) {
      super(message);
      this.layer = layer;
      this.name = 'LayeredError';
    }
  
    toString() {
      return `[${this.layer}] ${this.message}`;
    }
}
module.exports = LayeredError