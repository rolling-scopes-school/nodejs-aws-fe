#!/usr/bin/env python3
import os
import aws_cdk as cdk
from cdk_infrastructure.website_stack import WebsiteStack

app = cdk.App()

# WebsiteStack(app, "WebsiteStack",
#     env=cdk.Environment(
#         # account=os.getenv('CDK_DEFAULT_ACCOUNT'),
#         # region=os.getenv('CDK_DEFAULT_REGION')
#         account='438465144658',  # Replace with your AWS account number
#         region='eu-west-1'              # Replace with your desired region
#     )
# )

account = os.environ.get('CDK_DEFAULT_ACCOUNT', '438465144658')
region = os.environ.get('CDK_DEFAULT_REGION', 'eu-west-1')

WebsiteStack(app, "WebsiteStack",
             env=cdk.Environment(
                 account=account,
                 region=region
             )
)

app.synth()
