#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const { ShopSpaStack } = require('../lib/shop-spa-stack.cjs');

const app = new cdk.App();

new ShopSpaStack(app, 'ShopSpaStack', {
    env: {
        region: 'eu-central-1',
    },
});