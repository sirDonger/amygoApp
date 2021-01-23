import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'amygo',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  logging: false,
};
