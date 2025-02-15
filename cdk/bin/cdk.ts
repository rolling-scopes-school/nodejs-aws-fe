#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MyShopStack } from '../lib/cdk-stack';

const app = new cdk.App();
new MyShopStack(app, 'MyShopStack', {
 
});