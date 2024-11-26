import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import config from "./config/index.js";
import authRoutes from "./routes/auth.js";
import gameStatsRouter from "./routes/gameStats.js";

// Initialize Express application
const app = express();
const port = config.port;

// Enable CORS for cross-origin resource sharing
app.use(cors());

// Middleware to parse JSON bodies from incoming requests
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to lean alive base app api!");
});

app.use("/auth", authRoutes);
app.use("/game-stats", gameStatsRouter);

export default app;
