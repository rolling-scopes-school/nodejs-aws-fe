# exit if non zero result
set -e
# create infrastructure (buckets, cloud front, etc.)
sls deploy
# build project locally
npm run build
# deploy static to s3 bucket
sls client deploy --no-config-change --no-policy-change --no-cors-change
# invalidate cache
sls invalidateCloudFrontCache
