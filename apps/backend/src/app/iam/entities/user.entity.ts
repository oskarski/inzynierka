import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserId } from '@lib/shared';

export enum UserStatus {
  notConfirmed = 'not_confirmed',
  confirmed = 'confirmed',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UserId;

  @Column()
  status: UserStatus;

  static notConfirmed(id: UserId): User {
    const user = new User();

    user.id = id;
    user.status = UserStatus.notConfirmed;

    return user;
  }
}
