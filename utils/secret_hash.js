import crypto from "crypto";

// Function to compute the SECRET_HASH
export function computeSecretHash(clientId, clientSecret, username) {
  const secretHash = crypto
    .createHmac("SHA256", clientSecret)
    .update(username + clientId)
    .digest("base64");
  return secretHash;
}
