import express from "express";
import AWS from "aws-sdk";

import config from "../config/index.js";
import { computeSecretHash } from "../utils/secret_hash.js";

const router = express.Router();

// Configure AWS Cognito
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: config.aws_region, // e.g., 'us-east-1'
});

const userPoolId = config.cognito_user_pool;
const clientId = config.cognito_client_id;

// Sign-Up API
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const secretHash = computeSecretHash(
    clientId,
    config.cognito_client_secret,
    email
  );

  const params = {
    ClientId: clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: "name", Value: name },
      { Name: "email", Value: email },
    ],
    SecretHash: secretHash,
  };

  try {
    // const data = await cognito.signUp(params).promise();
    const data = await cognito.signUp(params).promise();
    res.status(200).json({ message: "User signed up successfully", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/verify", async (req, res) => {
  const { email, confirmationCode } = req.body;

  const secretHash = computeSecretHash(
    clientId,
    config.cognito_client_secret,
    email
  );

  const params = {
    ClientId: clientId,
    Username: email,
    ConfirmationCode: confirmationCode,
    SecretHash: secretHash,
  };

  try {
    const data = await cognito.confirmSignUp(params).promise();
    res.status(200).json({ message: "User verified successfully", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const secretHash = computeSecretHash(
    clientId,
    config.cognito_client_secret,
    email
  );

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  };

  try {
    const data = await cognito.initiateAuth(params).promise();
    res.status(200).json({ message: "User logged in successfully", data });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post("/logout", async (req, res) => {
  const { accessToken } = req.body;

  const params = {
    AccessToken: accessToken,
  };

  try {
    await cognito.globalSignOut(params).promise();
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/refresh-token", async (req, res) => {
  const { refreshToken, email } = req.body;

  const secretHash = computeSecretHash(
    clientId,
    config.cognito_client_secret,
    email
  );

  const params = {
    AuthFlow: "REFRESH_TOKEN_AUTH",
    ClientId: clientId,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
      SECRET_HASH: secretHash,
    },
  };

  try {
    const data = await cognito.initiateAuth(params).promise();
    res.status(200).json({ message: "Token refreshed successfully", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
