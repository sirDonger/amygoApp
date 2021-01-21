import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from '../config/config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: +config.PORT,
  username: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  logging: false,
};
