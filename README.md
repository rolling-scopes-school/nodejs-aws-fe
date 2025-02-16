# AWS S3 & CloudFront Deployment

## Deployed Application Links

- **CloudFront URL:** [https://d1ahyogkj7onzu.cloudfront.net/](https://d1ahyogkj7onzu.cloudfront.net/)
- **S3 Website URL:** [https://nodejs-aws-shop-react-438465144658-eu-west-1.s3.eu-west-1.amazonaws.com/](https://nodejs-aws-shop-react-438465144658-eu-west-1.s3.eu-west-1.amazonaws.com/) _(should return 403 Access Denied)_

## Deployment Steps

### Manual Deployment

1. Created an S3 bucket and configured it for website hosting.
2. Uploaded the MyShop! application manually.
3. Configured CloudFront to serve the app securely.
4. Invalidated CloudFront cache after making UI changes.

### Automated Deployment with AWS CDK

1. Created an AWS CDK stack to automate the deployment.
2. The stack:
   - Creates an S3 bucket.
   - Configures a CloudFront distribution with OAI.
   - Uses `BucketDeployment` to upload files automatically.
   - Triggers CloudFront cache invalidation after deployment.
3. Verified that `cdk destroy` removes all resources.

## Important Notes!!!
Always run bootstrap before the first deployment in a new AWS account/region

- destroy and cleanup commands will remove AWS resources - use with caution

- Use diff before deploy to review changes

- quick-deploy is recommended for development iterations

- Check doctor if you encounter any issues with deployment

## Available Scripts

In the project directory, you can run the following npm commands:

### Deployment Commands

- `npm run deploy`
  - Deploys the CDK stack to AWS without requiring manual approval
  - Use this for initial deployment or updating existing resources

- `npm run quick-deploy`
  - Cleans the build directory and deploys the stack
  - Useful when you want to ensure a fresh deployment

- `npm run destroy`
  - Removes all resources created by the CDK stack
  - Use with caution as this will delete all related AWS resources

### Setup and Maintenance

- `npm run bootstrap`
  - Initializes the CDK toolkit stack in your AWS account
  - Required before first deployment in a new account/region

- `npm run cleanup`
  - Performs a complete cleanup of all resources and redeploys
  - Useful when you need a fresh start
  - Executes the following sequence:
    1. Destroys the application stack
    2. Removes CDK bootstrap resources
    3. Cleans local CDK state
    4. Bootstraps again
    5. Deploys the stack

### Development and Debugging

- `npm run synth`
  - Synthesizes CloudFormation templates from your CDK code
  - Useful for reviewing what will be deployed

- `npm run diff`
  - Shows the difference between deployed stack and current code
  - Helpful before deploying changes

- `npm run list`
  - Lists all stacks in the application
  - Useful for verifying stack configuration

- `npm run doctor`
  - Checks your CDK environment for potential issues
  - Helpful for troubleshooting

### Cleanup Commands

- `npm run clean`
  - Removes the CDK build output directory (cdk.out)
  - Useful when you want to ensure a clean build

### Usage Examples

```bash
# First-time setup
npm run bootstrap

# Normal deployment flow
npm run deploy

# Check changes before deployment
npm run diff

# Complete reset and redeploy
npm run cleanup

# Remove all resources
npm run destroy
