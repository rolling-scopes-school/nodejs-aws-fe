const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const OUTPUTS_FILE = "cdk-outputs.json";
const ENV_FILE = ".env";

try {
  console.log("Fetching CDK stack outputs...");

  execSync(
    'cdk deploy --app "npx ts-node infra/bin/infra.ts" --outputs-file cdk-outputs.json --require-approval never',
    { stdio: 'inherit' }
  );
  

  const outputs = JSON.parse(fs.readFileSync(OUTPUTS_FILE, "utf8"));
  const stackOutputs = outputs.InfraStack;

  if (!stackOutputs) {
    throw new Error("Could not find outputs for InfraStack.");
  }

  const { BucketName, DistributionId } = stackOutputs;

  if (!BucketName || !DistributionId) {
    throw new Error("Missing required outputs (BucketName or DistributionId).");
  }

  const envContent = `BUCKET_NAME=${BucketName}\nDISTRIBUTION_ID=${DistributionId}\n`;
  fs.writeFileSync(ENV_FILE, envContent);

  console.log(`.env file updated with:
BUCKET_NAME=${BucketName}
DISTRIBUTION_ID=${DistributionId}`);
} catch (err) {
  console.error("Failed to update .env from CDK outputs:", err.message);
  process.exit(1);
}
