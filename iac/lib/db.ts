import * as cdk from 'aws-cdk-lib';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Vpc } from './vpc';

export class Db {
  readonly instance: rds.DatabaseInstance;

  constructor(stack: cdk.Stack, vpc: Vpc) {
    this.instance = new rds.DatabaseInstance(stack, 'inzynierka-db-instance', {
      vpc: vpc.instance,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_13_9,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE3,
        ec2.InstanceSize.MICRO
      ),
      credentials: rds.Credentials.fromGeneratedSecret('postgres'),
      multiAz: false,
      allocatedStorage: 20,
      maxAllocatedStorage: 20,
      allowMajorVersionUpgrade: false,
      autoMinorVersionUpgrade: true,
      backupRetention: cdk.Duration.days(0),
      deleteAutomatedBackups: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: false,
      databaseName: 'inzynierka',
      publiclyAccessible: true,
    });
  }
}
