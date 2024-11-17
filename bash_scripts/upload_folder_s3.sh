#!/bin/bash

# Prompt the user for input
read -p "Enter your root folder: " root_folder
read -p "Enter your s3 bucket name: " s3_bucket_name

aws s3 sync ./"$root_folder" s3://"$s3_bucket_name"