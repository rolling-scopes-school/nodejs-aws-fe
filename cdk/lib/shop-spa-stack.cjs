const path = require('path');
const cdk = require('aws-cdk-lib');
const { Stack, RemovalPolicy, Duration } = cdk;
const { Construct } = require('constructs');
const { Bucket, BlockPublicAccess } = require('aws-cdk-lib/aws-s3');
const {
    Distribution,
    ViewerProtocolPolicy,
    OriginAccessIdentity,
} = require('aws-cdk-lib/aws-cloudfront');
const { S3Origin } = require('aws-cdk-lib/aws-cloudfront-origins');
const { BucketDeployment, Source } = require('aws-cdk-lib/aws-s3-deployment');

class ShopSpaStack extends Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        const bucket = new Bucket(this, 'ShopSpaBucket', {
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });

        const originAccessIdentity = new OriginAccessIdentity(this, 'ShopSpaOAI');
        bucket.grantRead(originAccessIdentity);

        const distribution = new Distribution(this, 'ShopSpaDistribution', {
            defaultRootObject: 'index.html',
            defaultBehavior: {
                origin: new S3Origin(bucket, {
                    originAccessIdentity,
                }),
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            errorResponses: [
                {
                    httpStatus: 403,
                    responseHttpStatus: 200,
                    responsePagePath: '/index.html',
                    ttl: Duration.minutes(0),
                },
                {
                    httpStatus: 404,
                    responseHttpStatus: 200,
                    responsePagePath: '/index.html',
                    ttl: Duration.minutes(0),
                },
            ],
        });

        new BucketDeployment(this, 'ShopSpaDeployment', {
            sources: [Source.asset(path.join(__dirname, '../../dist'))],
            destinationBucket: bucket,
            distribution,
            distributionPaths: ['/*'],
        });
    }
}

module.exports = { ShopSpaStack };