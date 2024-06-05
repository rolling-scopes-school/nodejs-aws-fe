#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StaticSite } from './cdk-stack';

class MyStaticSiteStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string) {
    super(parent, name);

    new StaticSite(this, 'JSCCStaticWebsite');
  }
}

const app = new cdk.App();

new MyStaticSiteStack(app, 'MyJSCCStaticWebsite');

app.synth();