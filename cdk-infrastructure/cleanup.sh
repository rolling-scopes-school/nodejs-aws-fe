#!/bin/bash

echo "Starting cleanup and deployment process..."

# Function to check if a command was successful, but ignore specific errors
check_status() {
    status=$?
    if [ $status -ne 0 ]; then
        if [[ $2 == "ignore" ]]; then
            echo "Warning: $1 - continuing anyway..."
            return 0
        else
            echo "Error: $1 failed"
            exit 1
        fi
    fi
}

# 1. Destroy the application stack
echo "Destroying WebsiteStack..."
cdk destroy WebsiteStack --force
check_status "Stack destruction" "ignore"

# 2. Destroy CDK Toolkit stack
echo "Destroying CDK Toolkit stack..."
aws cloudformation delete-stack --stack-name CDKToolkit
check_status "CDK Toolkit stack deletion" "ignore"

# 3. Wait for CDKToolkit stack to be fully deleted
echo "Waiting for CDKToolkit stack deletion to complete..."
aws cloudformation wait stack-delete-complete --stack-name CDKToolkit
check_status "Waiting for CDKToolkit deletion" "ignore"

# 4. Delete the bootstrap bucket (only if it exists)
echo "Checking and deleting bootstrap bucket if exists..."
if aws s3 ls "s3://cdk-hnb659fds-assets-438465144658-eu-west-1" >/dev/null 2>&1; then
    echo "Bootstrap bucket exists, deleting..."
    aws s3 rb s3://cdk-hnb659fds-assets-438465144658-eu-west-1 --force
else
    echo "Bootstrap bucket doesn't exist, skipping deletion..."
fi

# 5. Clean local CDK state
echo "Cleaning local CDK state..."
rm -rf cdk.out/
check_status "Local state cleanup"

# 6. Bootstrap again
echo "Bootstrapping CDK..."
cdk bootstrap aws://438465144658/eu-west-1
check_status "CDK bootstrap"

# 7. Deploy
echo "Deploying stack..."
cdk deploy --require-approval never
check_status "Stack deployment"

echo "Process completed successfully!"
