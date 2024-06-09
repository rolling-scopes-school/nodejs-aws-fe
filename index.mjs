import { aws_s3 as s3 } from "aws-cdk-lib";
import cloudfront from "aws-cdk-lib/aws-cloudfront";
import s3deploy from "aws-cdk-lib/aws-s3-deployment";
import iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { App, Stack } from "aws-cdk-lib";

export class StaticSite extends Construct {
  constructor(parent, name) {
    super(parent, name);

    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, "OAI");

    const siteBucket = new s3.Bucket(this, "MyBuckerAutomated", {
      bucketName: "my-bucket-automated",
      websiteIndexDocument: "index.html",
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    siteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["S3:GetObject"],
        resources: [siteBucket.arnForObjects("*")],
        principals: [
          new iam.CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "my-distribution-automated",
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

    new s3deploy.BucketDeployment(this, "My-Bucket-Deployment", {
      sources: [s3deploy.Source.asset("./dist")],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}

const app = new App();
const stack = new Stack(app, "MyStack");
new StaticSite(stack, "MyWebsite");
app.synth();
