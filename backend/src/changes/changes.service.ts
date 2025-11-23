import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Change } from './entities/change.entity';
import { CreateChangeInput } from './dto/create-change.input';

@Injectable()
export class ChangesService {
  private changesRepository: Repository<Change>;
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {
    this.changesRepository = this.dataSource.getRepository(Change);
  }
  async create(createChangeInput: CreateChangeInput) {
    return await this.changesRepository.save(createChangeInput).catch(() => {
      const message = `Error creating change`;
      throw new Error(message);
    });
  }

  async findAll(selectFields?: string[]) {
    return await this.changesRepository
      .find({
        select: selectFields as (keyof Change)[],
      })
      .catch(() => {
        const message = `Error finding changes`;
        throw new Error(message);
      });
  }

  async findOne(id: string, selectFields?: string[]) {
    return await this.changesRepository
      .findOne({ where: { id }, select: selectFields as (keyof Change)[] })
      .catch(() => {
        const message = `Error finding change ${id}`;
        throw new Error(message);
      });
  }

  async remove(id: string) {
    return await this.changesRepository.delete(id).catch(() => {
      const message = `Error removing change ${id}`;
      throw new Error(message);
    });
  }
}
