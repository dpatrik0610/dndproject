class LayeredError extends Error {
    constructor(message, layer, statusCode = 500) {
      super(message);
      this.layer = layer;
      this.name = 'LayeredError';
      this.statusCode = statusCode;
    }
  
    toString() {
      return `[${this.layer}] (${this.statusCode}) ${this.message}`;
    }
}
module.exports = LayeredError