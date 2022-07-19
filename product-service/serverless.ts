import type { AWS } from "@serverless/typescript";

import products from "@functions/products";

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "2",
  plugins: [
    "serverless-auto-swagger",
    "serverless-offline",
    "serverless-esbuild",
  ],

  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "ap-south-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { products },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    autoswagger: {
      typefiles: ["./src/types/product.d.ts"],
      apiType: "http",
      basePath: "/dev",
    },
  },
};

module.exports = serverlessConfiguration;
