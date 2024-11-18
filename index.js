/**
 * Entry point for the Express.js application.
 * This script initializes and configures an Express server, sets up middleware for JSON parsing,
 * enables CORS for cross-origin requests, and mounts various API routes.
 *
 * The main purpose of this application is to serve as a backend API for 'lean alive base app'
 * providing endpoints for authentication and other services. The authentication routes are
 * specifically under the "/auth" path.
 */

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import config from "./config/index.js";
import authRoutes from "./routes/auth.js";

// Initialize Express application
const app = express();
const port = config.port;

// Enable CORS for cross-origin resource sharing
app.use(cors());

// Middleware to parse JSON bodies from incoming requests
app.use(bodyParser.json());

/**
 * GET /
 * Root endpoint providing a welcome message to confirm that the server is running.
 *
 * Request: None
 * Response: A welcome message in plain text with HTTP status 200.
 */
app.get("/", (req, res) => {
  res.status(200).send("Welcome to lean alive base app api!");
});

// Mount authentication routes at the "/auth" path
app.use("/auth", authRoutes);

export default app;
