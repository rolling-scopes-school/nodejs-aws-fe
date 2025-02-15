#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { AwsCdkStack } from "../lib/aws-cdk-stack";

const app = new cdk.App();
new AwsCdkStack(app, "AwsCdkStack", {
  env: { account: "442042536878", region: "eu-north-1" },
});
