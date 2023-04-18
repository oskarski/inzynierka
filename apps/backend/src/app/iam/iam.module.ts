import { Module } from '@nestjs/common';
import { IamController } from './iam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { IamService } from './services';
import { UserRepository } from './repositories';
import { CognitoAdapter } from './cognito.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [IamController],
  providers: [IamService, UserRepository, CognitoAdapter],
  exports: [IamService],
})
export class IamModule {}
