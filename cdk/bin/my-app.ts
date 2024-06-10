import * as cdk from "aws-cdk-lib";
import { AWSRSStaticBucket } from "../lib/my-stack";

const app = new cdk.App();
new AWSRSStaticBucket(app, "Mystack");
