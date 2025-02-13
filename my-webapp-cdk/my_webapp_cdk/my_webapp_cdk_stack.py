from aws_cdk import (
    Stack,
    aws_s3 as s3,
    aws_iam as iam,
    aws_s3_deployment as s3deploy,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as origins,
    RemovalPolicy,

    CfnOutput
)
from constructs import Construct

class MyWebappCdkStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Create an S3 bucket
        website_bucket = s3.Bucket(
            self, "WebsiteBucket",
            website_index_document="index.html",
            website_error_document="index.html",
            public_read_access=True,
            block_public_access=s3.BlockPublicAccess(
                block_public_acls=False,
                block_public_policy=False,
                ignore_public_acls=False,
                restrict_public_buckets=False
            ),
            removal_policy=RemovalPolicy.DESTROY,
            auto_delete_objects=True
        )

        # Then grant public read access to the bucket
        website_bucket.grant_public_access('GET')
        
        # Allow public access through bucket policy
        website_bucket.add_to_resource_policy(
            iam.PolicyStatement(
                actions=['s3:GetObject'],
                resources=[website_bucket.arn_for_objects('*')],
                principals=[iam.AnyPrincipal()]
            )
        )

        # Deploy site contents to S3 bucket
        deployment = s3deploy.BucketDeployment(
            self, "DeployWebsite",
            sources=[s3deploy.Source.asset("./build")],
            destination_bucket=website_bucket,
            retain_on_delete=False,
        )

        # Create CloudFront distribution
        distribution = cloudfront.Distribution(
            self, "Distribution",
            default_behavior=cloudfront.BehaviorOptions(
                origin=origins.S3Origin(website_bucket),
                viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            ),
            default_root_object="index.html",
            error_responses=[
                cloudfront.ErrorResponse(
                    http_status=403,
                    response_http_status=200,
                    response_page_path="/index.html",
                ),
                cloudfront.ErrorResponse(
                    http_status=404,
                    response_http_status=200,
                    response_page_path="/index.html",
                ),
            ]
        )

        # Output the website URL
        CfnOutput(
            self, "WebsiteURL",
            value=distribution.distribution_domain_name,
            description="Website URL"
        )
