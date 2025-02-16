from aws_cdk import (
    Stack,
    aws_s3 as s3,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as origins,
    aws_s3_deployment as s3deploy,
    aws_iam as iam,
    RemovalPolicy,
    CfnOutput
)
from constructs import Construct


class WebsiteStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Create S3 bucket with specific name
        website_bucket = s3.Bucket(
            self, "WebsiteBucket",
            bucket_name=f"nodejs-aws-shop-react-{Stack.of(self).account}-{Stack.of(self).region}".lower(
            ),
            removal_policy=RemovalPolicy.DESTROY,
            auto_delete_objects=True,
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL
        )

        # Create CloudFront Origin Access Control
        cfn_origin_access_control = cloudfront.CfnOriginAccessControl(
            self, "OriginAccessControl",
            origin_access_control_config=cloudfront.CfnOriginAccessControl.OriginAccessControlConfigProperty(
                name="WebsiteOAC",
                origin_access_control_origin_type="s3",
                signing_behavior="always",
                signing_protocol="sigv4",
                description="Origin Access Control for website bucket"
            )
        )

        # Create CloudFront distribution
        distribution = cloudfront.Distribution(
            self, "Distribution",
            default_behavior=cloudfront.BehaviorOptions(
                origin=origins.S3BucketOrigin(
                    bucket=website_bucket,
                    origin_access_control_id=cfn_origin_access_control.ref
                ),
                viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cache_policy=cloudfront.CachePolicy.CACHING_OPTIMIZED
            ),
            default_root_object="index.html",
            error_responses=[
                cloudfront.ErrorResponse(
                    http_status=403,
                    response_http_status=200,
                    response_page_path="/index.html"
                ),
                cloudfront.ErrorResponse(
                    http_status=404,
                    response_http_status=200,
                    response_page_path="/index.html"
                )
            ]
        )

        # Add bucket policy for CloudFront access
        website_bucket.add_to_resource_policy(
            iam.PolicyStatement(
                effect=iam.Effect.ALLOW,
                principals=[iam.ServicePrincipal("cloudfront.amazonaws.com")],
                actions=["s3:GetObject"],
                resources=[website_bucket.arn_for_objects("*")],
                conditions={
                    "StringEquals": {
                        "AWS:SourceArn": f"arn:aws:cloudfront::{Stack.of(self).account}:distribution/{distribution.distribution_id}"
                    }
                }
            )
        )

        # Deploy site contents to S3
        s3deploy.BucketDeployment(
            self, "DeployWebsite",
            sources=[s3deploy.Source.asset("../dist")],
            destination_bucket=website_bucket,
            distribution=distribution,
            distribution_paths=["/*"],
            memory_limit=1024
        )

        # Output the CloudFront URL
        CfnOutput(self, "CloudFrontURL",
                  value=distribution.distribution_domain_name,
                  description="CloudFront Distribution URL"
                  )

        # Output the S3 Bucket Name
        CfnOutput(self, "BucketName",
                  value=website_bucket.bucket_name,
                  description="S3 Bucket Name"
                  )
