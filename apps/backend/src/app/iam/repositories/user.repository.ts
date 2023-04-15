import { Repository } from 'typeorm';
import { User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<void> {
    await this.repository.save(user);
  }
}
