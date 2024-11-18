import crypto from "crypto";

/**
 * @file Provides utility function to generate a secret hash for user authentication.
 * 
 * The file includes a function to compute a secret hash using HMAC SHA256 algorithm. 
 * This function aims to facilitate the authentication process by generating a base64 
 * encoded hash combining the client secret, username, and client ID. 
 * This is crucial for secure communication in an authentication workflow.
 */

/**
 * Computes the secret hash required for user authentication.
 *
 * This function uses HMAC SHA256 algorithm to generate a base64 encoded secret hash.
 * It combines the client secret, username, and client ID to authenticate requests.
 *
 * @param {string} clientId - The client ID for the application.
 * @param {string} clientSecret - The client secret corresponding to the client ID.
 * @param {string} username - The username of the user trying to authenticate.
 * @returns {string} A base64 encoded secret hash for the provided credentials.
 */
export function computeSecretHash(clientId, clientSecret, username) {
  try {
    // Create HMAC with SHA256 using the clientSecret as the key
    const secretHash = crypto
      .createHmac("SHA256", clientSecret)
      .update(username + clientId) // Combine username and clientId as a single string input
      .digest("base64"); // Output the result as a base64 encoded string
    
    return secretHash; // Return the computed secret hash
  } catch (error) {
    console.error("Error computing secret hash:", error);
    throw new Error("Failed to compute secret hash. Please check your credentials.");
  }
}
