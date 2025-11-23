import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ChangesService } from '../changes/changes.service';
import { GetQueryStructureResult } from '../utils/graphql-typeorm-projection';

@Injectable()
export class UsersService {
  private usersRepository: Repository<User>;
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
    private changesService: ChangesService,
  ) {
    this.usersRepository = this.dataSource.getRepository(User);
  }
  async create(createUserInput: CreateUserInput) {
    return await this.usersRepository.save(createUserInput).catch(() => {
      const message = `Error creating user`;
      throw new Error(message);
    });
  }

  async findAll(gql?: GetQueryStructureResult) {
    return await this.usersRepository
      .find({
        select: gql?.select as (keyof User)[],
        relations: gql?.relations,
      })
      .catch(() => {
        const message = `Error finding users`;
        throw new Error(message);
      });
  }

  async findOne(uid: string, gql?: GetQueryStructureResult) {
    return await this.usersRepository
      .findOne({
        where: { uid },
        select: gql?.select as (keyof User)[],
        relations: gql?.relations,
      })
      .catch(() => {
        const message = `Error finding user ${uid}`;
        throw new Error(message);
      });
  }

  async update(uid: string, updateUserInput: UpdateUserInput) {
    const user = await this.findOne(uid);
    return await this.usersRepository
      .save({ uid, updateUserInput })
      .then(async (result) => {
        if (
          result?.rank &&
          updateUserInput?.rank !== result?.rank &&
          user?.rank
        ) {
          await this.changesService.create({
            referenceId: uid,
            // TODO: Get user from request.
            changed_by_user_id: uid,
            from: user?.rank,
            to: result?.rank,
          });
        }

        return result;
      })
      .catch((error) => {
        const message = `Error updating user ${uid}`;
        console.log(error);
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
