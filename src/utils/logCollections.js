const { listCollections } = require("../config/database");
const { logger } = require("./logger");

const logCollections = async (db) => {
    const collections = await listCollections(db);
    logger.info(`Available collections: ${collections.map(col => `[${col}]`).join(", ")}`);
}

module.exports = logCollections;