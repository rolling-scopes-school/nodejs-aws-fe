import aws_cdk as core
import aws_cdk.assertions as assertions

from cdk_infrastructure.cdk_infrastructure_stack import CdkInfrastructureStack

# example tests. To run these tests, uncomment this file along with the example
# resource in cdk_infrastructure/cdk_infrastructure_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = CdkInfrastructureStack(app, "cdk-infrastructure")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
