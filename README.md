
## Available Scripts

> #### default CRA scripts
```sh
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
```
> ### serverless scripts
```sh
    "client:deploy:s3": "sls client deploy --no-config-change --no-policy-change --no-cors-change",
    "client:deploy:nc": "npm run client:deploy:s3 -- --no-confirm",
    "client:build:deploy": "npm run build && npm run client:deploy:s3",
    "client:build:deploy:nc": "npm run build && npm run client:deploy:nc",
    "cloudfront:setup": "sls deploy",
    "cloudfront:domainInfo": "sls domainInfo",
    "cloudfront:invalidateCache": "sls invalidateCloudFrontCache",
    "cloudfront:build:deploy": "npm run client:build:deploy && npm run cloudfront:invalidateCache",
    "cloudfront:build:deploy:nc": "npm run client:build:deploy:nc && npm run cloudfront:invalidateCache",
    "cloudfront:update:build:deploy": "npm run cloudfront:setup && npm run cloudfront:build:deploy",
    "cloudfront:update:build:deploy:nc": "npm run cloudfront:setup && npm run cloudfront:build:deploy:nc"
```

* **[S3 bucket](http://spa-first-bucket.s3-website-eu-west-1.amazonaws.com/)**
* **[Cloudfront](dhrqdbq3i157n.cloudfront.net)**
* **Automated configured S3 bucket/cloudfront resources**: 
    * [S3 bucket](http://spa-second-bucket.s3-website-eu-west-1.amazonaws.com/)
    * [Cloudfront](dg2e8nno6k0ty.cloudfront.net)

