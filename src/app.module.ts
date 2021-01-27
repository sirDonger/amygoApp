import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ChangeProfileModule } from './modules/user/change-profile/change-profile.module';
import { typeOrmConfig } from './config/dbconfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ChangeProfileModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule {}
