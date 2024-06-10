import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";

export class AWSRSStaticBucket extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cloudfrontOAI = new cdk.aws_cloudfront.OriginAccessIdentity(
      this,
      "cloudfront-OAI"
    );

    const bucket = new s3.Bucket(this, "AWSRSStaticBucket", {
      bucketName: "my-sdk-built-website-bucket",
      websiteIndexDocument: "index.html",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    bucket.addToResourcePolicy(
      new cdk.aws_iam.PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [bucket.arnForObjects("*")],
        principals: [
          new cdk.aws_iam.CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );

    const distribution = new cdk.aws_cloudfront.CloudFrontWebDistribution(
      this,
      "AWSRSStaticBucketDisrtibution",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
              originAccessIdentity: cloudfrontOAI,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      }
    );

    new cdk.aws_s3_deployment.BucketDeployment(
      this,
      "NodeJS-AWS-SHOP-REACT-Deployment",
      {
        sources: [cdk.aws_s3_deployment.Source.asset("../dist")],
        destinationBucket: bucket,
        distribution,
        distributionPaths: ["/*"],
      }
    );
  }
}
