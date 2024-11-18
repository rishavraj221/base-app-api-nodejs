/**
 * This module initiates the connection to a MongoDB database and starts the server.
 * It uses Mongoose for connecting to the MongoDB instance and Express for server operations.
 * Configurations such as database URI, database name, and server port are imported 
 * from a separate config file.
 */

import mongoose from "mongoose";
import app from "./index.js";
import config from "./config/index.js";

/**
 * Connects to the MongoDB instance using mongoose and starts the Express server 
 * on the configured port.
 */
const startServer = async () => {
  try {
    await mongoose.connect(config.mongo_uri, {
      dbName: config.mongo_db_name,
      useNewUrlParser: true,  // Ensures that new URL string parser is used
      useUnifiedTopology: true, // Enables new unified topology layer
    });
    console.log("Connected to MongoDB!");

    // Start the server and listen on the defined port
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    // Log the error with user-friendly message
    console.error(`Failed to connect to MongoDB: ${err?.message}`);
  }
};

// Start the server and database connection
startServer();
