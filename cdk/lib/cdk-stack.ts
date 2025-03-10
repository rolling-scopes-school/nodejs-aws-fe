import * as cdk from "aws-cdk-lib";
import {
  CloudFrontWebDistribution,
  Distribution,
  OriginAccessIdentity,
} from "aws-cdk-lib/aws-cloudfront";
import { CanonicalUserPrincipal, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cloudfrontOAI = new OriginAccessIdentity(this, "Shop-OAI");

    const siteBucket = new Bucket(this, "ShopStaticBucket", {
      bucketName: "aws-shop-react-313",
      websiteIndexDocument: "index.html",
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    });

    siteBucket.addToResourcePolicy(
      new PolicyStatement({
        actions: ["S3:GetObject"],
        resources: [siteBucket.arnForObjects("*")],
        principals: [
          new CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );

    const distribution = new CloudFrontWebDistribution(
      this,
      "aws-shop-react-313-distribution",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: siteBucket,
              originAccessIdentity: cloudfrontOAI,
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

    new BucketDeployment(this, "aws-shop-react-313-deployment", {
      sources: [Source.asset("../dist")],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}
