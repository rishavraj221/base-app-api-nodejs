import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 8000,
  aws_region: process.env.AWS__REGION,
  cognito_client_id: process.env.COGNITO_CLIENT_ID,
  cognito_user_pool: process.env.COGNITO_USER_POOL_ID,
  cognito_client_secret: process.env.COGNITO_CLIENT_SECRET,
};
