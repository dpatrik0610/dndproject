const {listCollections} = require("../config/database")

const logCollections = async (db) => {
    const collections = await listCollections(db);
    console.log("\nAvailable collections:", collections);
}

module.exports = logCollections;