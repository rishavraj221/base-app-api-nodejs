#!/bin/bash

# Prompt the user for the input
read -p "Enter the s3 bucket name: " s3_bucket_name

# Run the AWS CLI command
aws s3 mb s3://"$s3_bucket_name" --region eu-central-1