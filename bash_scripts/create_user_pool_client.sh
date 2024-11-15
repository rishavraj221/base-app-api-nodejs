#!/bin/bash

# Prompt the user for input
read -p "Enter your User Pool ID: " user_pool_id
read -p "Enter your Client Name: " client_name

# Run the AWS CLI command
aws cognito-idp create-user-pool-client \
  --user-pool-id "$user_pool_id" \
  --client-name "$client_name" \
  --generate-secret \
  --explicit-auth-flows "ALLOW_USER_PASSWORD_AUTH" "ALLOW_REFRESH_TOKEN_AUTH"
