const { MongoClient } = require('mongodb');
const { logger } = require('../utils/logger');

let dbInstance = null;
let clientInstance = null;

// Connect to the database
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  const dbName = process.env.DB_NAME || "dndproject";

  // Check for missing environment variables
  if (!mongoUri || !dbName) {
    logger.error("MongoDB URI or DB_NAME is not defined. Check your .env file.");
    throw new Error("MONGO_URI or DB_NAME not found in environment variables.");
  }

  try {
    clientInstance = new MongoClient(mongoUri, {
      autoSelectFamily: false,
    });

    // Connect to the MongoDB server
    await clientInstance.connect();
    dbInstance = clientInstance.db(dbName);
    
    logger.success(`Connected to MongoDB database: ${dbInstance.databaseName}`);
    return dbInstance;
  } catch (err) {
    logger.error(`MongoDB connection error: ${err.message}`);
    throw err;
  }
};

// Get the current database instance
const getDB = () => {
  if (!dbInstance) {
    throw new Error("Database connection not established. Call connectDB first.");
  }
  return dbInstance;
};

// Close the connection when the application is terminated
const closeDB = async () => {
  if (clientInstance) {
    await clientInstance.close();
    logger.info("MongoDB connection closed.");
  }
};

const listCollections = async () => {
  try {
    const collections = await dbInstance.listCollections().toArray();

    return collections.map(col => col.name);
  } catch (err) {
    logger.error(`Error listing collections: ${err.message}`);
    throw err;
  }
};

// Get collection's data by its name.
const getCollection = async (collectionName) => {
  try {
    if (!(await checkCollectionExists(collectionName))) {
      throw new Error(`Collection "${collectionName}" doesn't exist.`);
    }

    return dbInstance.collection(collectionName);
  } catch (err) {
    logger.error(`Collection error: ${err.message}`);
    throw err;  
  }
}

// Check if a collection exists in the database
const checkCollectionExists = async (collectionName) => {
  try {
    const collections = await listCollections();

    return collections.includes(collectionName);
  } catch (err) {
    logger.error(`Error checking if collection exists: ${err.message}`);
    throw err;
  }
};

module.exports = { connectDB, getDB, closeDB, listCollections, getCollection };
