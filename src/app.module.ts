import { TypeOrmModule } from '@nestjs/typeorm';
import { SignInModule } from './auth/signin/signIn.module';
import { typeOrmConfig } from './dbconfig/typeorm.config';
import { UserModule } from './user/user.module';
import { SignUpModule } from './auth/signup/signUp.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChangePasswordModule } from './auth/change-password/change-password.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_EXP,
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    SignInModule,
    SignUpModule,
    ChangePasswordModule,
    UserModule,
  ],
  exports: [PassportModule, JwtModule],
})
export class AppModule {}
