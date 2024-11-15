import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import config from "./config/index.js";
import authRoutes from "./routes/auth.js";

// Initialize Express App
const app = express();
const port = config.port;

app.use(cors());

// Middleware
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.status(200).send("Welcome to lean alive base app api!");
});

app.use("/auth", authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
