import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 as s3, aws_cloudfront as cloudfront, aws_cloudfront_origins as origins, aws_s3_deployment as s3deploy } from 'aws-cdk-lib';

export class AwsCdkInitStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    const distribution = new cloudfront.Distribution(this, "WebsiteDistribution", {
      defaultBehavior: { origin: new origins.S3Origin(websiteBucket) },
    })

    new s3deploy.BucketDeployment(this, "WebsiteDeployment", {
      destinationBucket: websiteBucket,
      distribution,
      sources: [s3deploy.Source.asset("./dist")],
      distributionPaths: ["/"],
    })

  }
}

