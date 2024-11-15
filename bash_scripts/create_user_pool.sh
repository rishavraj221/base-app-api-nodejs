#!/bin/bash

# Prompt the user for input
read -p "Enter your User Pool Name: " user_pool_name

# Run the AWS CLI command
aws cognito-idp create-user-pool \
  --pool-name "$user_pool_name" \
  --policies '{
    "PasswordPolicy": {
      "MinimumLength": 8,
      "RequireUppercase": true,
      "RequireLowercase": true,
      "RequireNumbers": true,
      "RequireSymbols": true
    }
  }' \
  --auto-verified-attributes email \
  --schema '[
    {
      "Name": "email",
      "AttributeDataType": "String",
      "Required": true
    },
    {
      "Name": "name",
      "AttributeDataType": "String",
      "Required": true
    }
  ]'
