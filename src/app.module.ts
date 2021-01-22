import { TypeOrmModule } from '@nestjs/typeorm';
import { SignInModule } from './auth/signin/signInModule';
import { typeOrmConfig } from './dbconfig/typeorm.config';
import { UserModule } from './user/user.module';
import { SignupModule } from './auth/signup/signup.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SignInModule,
    SignupModule,
    UserModule,
  ],
})
export class AppModule {}
