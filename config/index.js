/**
 * Configuration Module
 * --------------------
 * This module is responsible for loading and exporting environment variables as a configuration object.
 * It facilitates seamless access to settings that may vary between different environments such as development,
 * testing, and production. The configuration settings include server ports, AWS credentials, and MongoDB connection details among others.
 *
 * Usage:
 * Import this module wherever you need access to these configuration details.
 * Example: `import config from 'path-to-this-file';`
 */

import dotenv from "dotenv";

// Load environment variables from a .env file into process.env for application-wide access
dotenv.config();

// Export configuration object with environment variables
export default {
  // Server Configuration - Sets the default server port to 8000 if PORT is not defined in the environment variables
  port: process.env.PORT || 8000,

  // AWS Configuration - Region settings for AWS services utilized by the application
  aws_region: process.env.AWS__REGION,

  // AWS Cognito Configuration - Details for using AWS Cognito services for user authentication
  cognito_client_id: process.env.COGNITO_CLIENT_ID,
  cognito_user_pool: process.env.COGNITO_USER_POOL_ID,
  cognito_client_secret: process.env.COGNITO_CLIENT_SECRET,

  // MongoDB Configuration - Connection URI and database name for MongoDB connection
  mongo_uri: process.env.MONGO_URI,
  mongo_db_name: process.env.MONGO_DB_NAME,
};
