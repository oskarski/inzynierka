import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { readFileSync } from 'fs';
import { Vpc } from './vpc';
import { CfnEIP } from 'aws-cdk-lib/aws-ec2';

export class BeApp {
  readonly instance: ec2.Instance;

  constructor(stack: cdk.Stack, vpc: Vpc) {
    const beAppSecurityGroup = new ec2.SecurityGroup(
      stack,
      'be-app-instance-security-group',
      {
        vpc: vpc.instance,
        allowAllOutbound: true,
      }
    );

    beAppSecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'allow SSH connections from anywhere'
    );

    beAppSecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'allow HTTP traffic from anywhere'
    );

    beAppSecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(443),
      'allow HTTPS traffic from anywhere'
    );

    this.instance = new ec2.Instance(stack, 'be-app-ec2-instance', {
      vpc: vpc.instance,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      securityGroup: beAppSecurityGroup,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE3,
        ec2.InstanceSize.MICRO
      ),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: 'inzynierka-be-app-key-pair',
    });

    const userDataScript = readFileSync('../apps/backend/ec2.sh', 'utf8');

    this.instance.addUserData(userDataScript);

    new CfnEIP(stack, 'inzynierka-be-elastic-ip', {
      instanceId: this.instance.instanceId,
    });
  }
}
