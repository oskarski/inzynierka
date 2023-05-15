import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Vpc } from './vpc';
import { CfnEIP } from 'aws-cdk-lib/aws-ec2';

export class FeApp {
  readonly instance: ec2.Instance;

  constructor(stack: cdk.Stack, vpc: Vpc) {
    const feAppSecurityGroup = new ec2.SecurityGroup(
      stack,
      'fe-app-instance-security-group',
      {
        vpc: vpc.instance,
        allowAllOutbound: true,
      }
    );

    feAppSecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'allow SSH connections from anywhere'
    );

    feAppSecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'allow HTTP traffic from anywhere'
    );

    feAppSecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(443),
      'allow HTTPS traffic from anywhere'
    );

    this.instance = new ec2.Instance(stack, 'fe-app-ec2-instance', {
      vpc: vpc.instance,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      securityGroup: feAppSecurityGroup,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE3,
        ec2.InstanceSize.MICRO
      ),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: 'inzynierka-fe-app-key-pair',
    });

    new CfnEIP(stack, 'inzynierka-fe-elastic-ip', {
      instanceId: this.instance.instanceId,
    });
  }
}
