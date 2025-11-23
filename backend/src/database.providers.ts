import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [User],
        synchronize: configService.get<boolean>('SYNCHRONIZE_DB'),
        logging: true,
      });

      return dataSource.initialize();
    },
  },
];
