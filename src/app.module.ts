import { TypeOrmModule } from '@nestjs/typeorm';
import { SignInModule } from './auth/signin/signIn.module';
import { typeOrmConfig } from './dbconfig';
import { UserModule } from './user/user.module';
import { SignUpModule } from './auth/signup/signUp.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChangePasswordModule } from './auth/change-password/change-password.module';
import { ChangeProfileModule } from './auth/change-profile/change-profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    SignInModule,
    SignUpModule,
    ChangePasswordModule,
    ChangeProfileModule,
    UserModule,
  ],
})
export class AppModule {}
