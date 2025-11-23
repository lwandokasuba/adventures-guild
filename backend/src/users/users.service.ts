import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private usersRepository: Repository<User>;
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {
    this.usersRepository = this.dataSource.getRepository(User);
  }
  async create(createUserInput: CreateUserInput) {
    return await this.usersRepository.save(createUserInput).catch(() => {
      const message = `Error creating user`;
      throw new Error(message);
    });
  }

  async findAll(selectFields?: string[]) {
    return await this.usersRepository
      .find({
        select: selectFields as (keyof User)[],
      })
      .catch(() => {
        const message = `Error finding users`;
        throw new Error(message);
      });
  }

  async findOne(uid: string, selectFields?: string[]) {
    return await this.usersRepository
      .findOne({ where: { uid }, select: selectFields as (keyof User)[] })
      .catch(() => {
        const message = `Error finding user ${uid}`;
        throw new Error(message);
      });
  }

  async update(uid: string, updateUserInput: UpdateUserInput) {
    return await this.usersRepository.update(uid, updateUserInput).catch(() => {
      const message = `Error updating user ${uid}`;
      throw new Error(message);
    });
  }

  async remove(uid: string) {
    return await this.usersRepository.delete(uid).catch(() => {
      const message = `Error removing user ${uid}`;
      throw new Error(message);
    });
  }
}
