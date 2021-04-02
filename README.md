# Serverless framework example app
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Serverless framework](https://www.serverless.com)

## Requirements
-   NodeJS 12+
-   AWS CLI
-   AWS account
-   AWS CLI must be configured with personal credentials

## Setup

```bash
npm install -g serverless
npm install
```

## Deployment 
```bash
npm run cloudfront:update:build:deploy:nc
```

## Links
Please find the app deployed manually with S-3 [here](http://metal-tickets-store-fe-bucket.s3-website-eu-west-1.amazonaws.com/)

Please find the app deployed by serverless framework [here](https://d12t0bvcb8pyyn.cloudfront.net)

## Changelog
### task2-serve-spa-aws
- S3 bucket has been created and configured properly. The app has been uploaded to the bucket and is available though the Internet.
- In addition to the previous work a CloudFront distribution is created and configured properly and the site is served now with CloudFront and is available through the Internet over CloudFront URL, not S3-website link (due to changes in bucket’s policy).
- Serverless-finch and serverless-single-page-app plugins are added and configured. The app can be built and deployed by running npm script command.