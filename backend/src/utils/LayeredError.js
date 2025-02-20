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

  static handleError(error, customMessage = '') {
    const errorMessage = error.message || customMessage;
    const statusCode = error.statusCode || 500;
    throw new LayeredError(errorMessage, 'WorldRepository', statusCode);
  }
}

module.exports = LayeredError;
