import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Cognito } from './cognito';
import { Vpc } from './vpc';
import { Db } from './db';
import { Port } from 'aws-cdk-lib/aws-ec2';

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Cognito(this);

    const vpc = new Vpc(this);
    const db = new Db(this, vpc);

    db.instance.connections.allowFromAnyIpv4(Port.tcp(5432));
  }
}
