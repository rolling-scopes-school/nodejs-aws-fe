import * as cdk from "@aws-cdk/core";
import { StaticSite } from "./static-site-construct";

class StaticSiteStack extends cdk.Stack {
    constructor(parent: cdk.App, name: string) {
        super(parent, name);

        new StaticSite(this, name);
    }
}

const app = new cdk.App();

new StaticSiteStack(app, "useless-shop-2");

app.synth();