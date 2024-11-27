const { MongoClient } = require('mongodb');

let dbInstance = null;
let clientInstance = null;

// Connect to the database
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  const dbName = process.env.DB_NAME;

  // Check for missing environment variables
  if (!mongoUri || !dbName) {
    console.error("MongoDB URI or DB_NAME is not defined. Check your .env file.");
    throw new Error("MONGO_URI or DB_NAME not found in environment variables.");
  }

  try {
    clientInstance = new MongoClient(mongoUri);

    clientInstance.on('commandStarted', event => {
      console.log('MongoDB command started:', event);
    });

    clientInstance.on('commandSucceeded', event => {
      console.log('MongoDB command succeeded:', event);
    });

    clientInstance.on('commandFailed', event => {
      console.log('MongoDB command failed:', event);
    });

    // Connect to the MongoDB server
    await clientInstance.connect();
    dbInstance = clientInstance.db(dbName);
    
    console.log(`Connected to MongoDB database: ${dbInstance.databaseName}`);
    return dbInstance;
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
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
    console.log("MongoDB connection closed.");
  }
};

const listCollections = async () => {
  try {
    const collections = await dbInstance.listCollections().toArray();

    return collections.map(col => col.name);
    } catch (err) {
    console.error('Error listing collections:', err);
  }
};

// Get collection's data by it's name.
const getCollection = async (collectionName) => {
  try{
    if( !(await checkCollectionExists(collectionName)) ) {
      throw new Error(`Collection "${collectionName}" doesn't exist.`)
    }

    return dbInstance.collection(collectionName);
  } catch (err) {
    console.error("Collection error:", err.message);
    throw err;  
  }
}

// Check if a collection exists in the database
const checkCollectionExists = async (collectionName) => {
  try {
    const collections = await listCollections();

    return collections.includes(collectionName);
  } catch (err) {
    console.error("Error checking if collection exists:", err);
    throw err;
  }
};

module.exports = { connectDB, getDB, closeDB, listCollections, getCollection };
