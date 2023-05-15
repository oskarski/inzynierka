import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class Vpc {
  readonly instance: ec2.Vpc;

  constructor(stack: cdk.Stack) {
    this.instance = new ec2.Vpc(stack, 'inzynierka-vpc', {
      cidr: '10.0.0.0/16',
      natGateways: 0,
      maxAzs: 3,
      subnetConfiguration: [
        {
          name: 'inzynierka-public-subnet-1',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: 'inzynierka-isolated-subnet-1',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 28,
        },
      ],
    });
  }
}
