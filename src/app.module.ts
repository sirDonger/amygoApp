import { TypeOrmModule } from '@nestjs/typeorm';
import { SignInModule } from './auth/signin/signIn.module';
import { typeOrmConfig } from './dbconfig/typeorm.config';
import { UserModule } from './user/user.module';
import { SignUpModule } from './auth/signup/signUp.module';
import { LocationModule } from './location/location.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    SignInModule,
    SignUpModule,
    UserModule,
    LocationModule
  ],
})
export class AppModule {}
