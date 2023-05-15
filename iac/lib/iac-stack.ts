import * as cdk from 'aws-cdk-lib';
import { Port } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { Cognito } from './cognito';
import { Vpc } from './vpc';
import { BeApp } from './beApp';
import { Db } from './db';

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Cognito(this);

    const vpc = new Vpc(this);
    const beApp = new BeApp(this, vpc);
    const db = new Db(this, vpc);

    db.instance.connections.allowFrom(beApp.instance, Port.tcp(5432));
    // TODO remove to prevent access to db from the internet
    db.instance.connections.allowFromAnyIpv4(Port.tcp(5432));
  }
}
