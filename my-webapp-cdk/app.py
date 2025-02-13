#!/usr/bin/env python3
import os
import aws_cdk as cdk
from my_webapp_cdk.my_webapp_cdk_stack import MyWebappCdkStack

app = cdk.App()
MyWebappCdkStack(app, "MyWebappCdkStack")
app.synth()
