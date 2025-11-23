import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users/users.module';
import { join } from 'path';
// import { ChangesService } from './changes/changes.service';
// import { ChangesModule } from './changes/changes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      graphiql: true,
    }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [],
  // providers: [ChangesService],
})
export class AppModule {}
