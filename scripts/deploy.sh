# exit if non zero result
set -e
# create infrastructure (buckets, cloud front, etc.)
AWS_PROFILE=nodejs-in-aws-3 sls deploy
# build project locally
npm run build
# deploy static to s3 bucket
AWS_PROFILE=nodejs-in-aws-3 sls client deploy --no-config-change --no-policy-change --no-cors-change
# invalidate cache
AWS_PROFILE=nodejs-in-aws-3 sls invalidateCloudFrontCache
