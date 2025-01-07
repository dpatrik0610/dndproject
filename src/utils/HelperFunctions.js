class HelperFunctions {
    static addToArray(array, value) {
      if (typeof value !== 'string' || value.trim() === "") {
        throw new Error("Value must be a non-empty string");
      }
      if (!array.includes(value)) {
        array.push(value);
      }
    }
  
    static removeFromArray(array, value) {
      const index = array.indexOf(value);
      if (index === -1) {
        throw new Error("Value not found");
      }
      array.splice(index, 1);
    }
  
    static updateValue(value, type, errorMessage) {
      if (typeof value !== type) {
        throw new Error(errorMessage);
      }
    }
  }
  
  module.exports = HelperFunctions;
  