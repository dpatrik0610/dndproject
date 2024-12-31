const { listCollections } = require("../config/database");
const { logTemplates } = require("./logTemplates");

const logCollections = async (db) => {
    const collections = await listCollections(db);
    logTemplates.info(`Available collections: ${collections.map(col => `[${col}]`).join(", ")}`);
}

module.exports = logCollections;