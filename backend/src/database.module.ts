import { Module, Global } from '@nestjs/common';
import { databaseProviders } from './database.providers'; // 👈 Import your provider array

@Global()
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
