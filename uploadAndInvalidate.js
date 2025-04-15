require('dotenv').config();
const { execSync } = require('child_process');

const bucket = process.env.BUCKET_NAME;

if (!bucket) {
  console.error('BUCKET_NAME is not set in .env');
  process.exit(1);
}

const upload = `aws s3 sync dist/ s3://${bucket} --delete`;

console.log(`Uploading to bucket: ${bucket}`);
execSync(upload, { stdio: 'inherit' });

const distributionId = process.env.DISTRIBUTION_ID;

if (!distributionId) {
  console.error('DISTRIBUTION_ID is not set in .env');
  process.exit(1);
}

const invalidate = `aws cloudfront create-invalidation --distribution-id ${distributionId} --paths "/*"`;

console.log(`Creating CloudFront invalidation for distribution: ${distributionId}`);
execSync(invalidate, { stdio: 'inherit' });
