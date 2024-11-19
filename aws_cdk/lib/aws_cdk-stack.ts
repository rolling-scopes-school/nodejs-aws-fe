import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Task02 } from "../construct/task02";

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Task02(this, "StaticSite");
  }
}
