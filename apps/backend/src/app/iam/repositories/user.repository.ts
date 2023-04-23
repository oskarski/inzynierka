import { Repository } from 'typeorm';
import { User, UserStatus } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserId } from '@lib/shared';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async findUnconfirmedUser(userId: UserId): Promise<User> {
    return this.repository.findOneBy({
      id: userId,
      status: UserStatus.notConfirmed,
    });
  }

  async confirmUser(userId: UserId): Promise<void> {
    await this.repository.update(
      { id: userId },
      { status: UserStatus.confirmed },
    );
  }

  async findUser(userId: UserId): Promise<User> {
    return this.repository.findOneBy({
      id: userId,
    });
  }

  async findUserWithFavouriteRecipes(userId: UserId): Promise<User | null> {
    return this.repository.findOne({
      where: { id: userId },
      relations: {
        favouriteRecipes: true,
      },
    });
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }
}
