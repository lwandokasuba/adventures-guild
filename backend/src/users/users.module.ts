import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DatabaseModule } from '../database.module';
import { ChangesModule } from '../changes/changes.module';

@Module({
  imports: [DatabaseModule, ChangesModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
