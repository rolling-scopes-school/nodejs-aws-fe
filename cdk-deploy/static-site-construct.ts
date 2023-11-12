import { Construct, Stack } from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as iam from "@aws-cdk/aws-iam";
import * as cloudfront from "@aws-cdk/aws-cloudfront";

export class StaticSite extends Construct {
    constructor(parent: Stack, name: string) {
        super(parent, name);

        const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, "useless-shop-2");

        const siteBucket = new s3.Bucket(this, "useless-shop-bucket-1", {
            bucketName: 'useless-shop-bucket-2',
            websiteIndexDocument: "index.html",
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        });

        siteBucket.addToResourcePolicy(
            new iam.PolicyStatement({
                actions: ["s3:GetObject"],
                resources: [siteBucket.arnForObjects("*")],
                principals: [
                    new iam.CanonicalUserPrincipal(
                        cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
                    ),
                ],
            })
        );

        const distribution = new cloudfront.CloudFrontWebDistribution(
            this,
            "useless-shop-cfwd-2",
            {
                originConfigs: [
                    {
                        s3OriginSource: {
                            s3BucketSource: siteBucket,
                            originAccessIdentity: cloudFrontOAI,
                        },
                        behaviors: [
                            {
                                isDefaultBehavior: true,
                            },
                        ],
                    },
                ],
            }
        );

        new s3deploy.BucketDeployment(this, "useless-shop-bucket-deployment-2", {
            sources: [s3deploy.Source.asset("./dist")],
            destinationBucket: siteBucket,
            distribution,
            distributionPaths: ["/*"],
        });
    }
}