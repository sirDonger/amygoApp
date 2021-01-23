import { Module } from '@nestjs/common';
import { SignInController } from './signIn.controller';
import { SignInService } from './signIn.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_EXP,
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [SignInService, UserService, JwtStrategy],
  controllers: [SignInController],
  exports: [PassportModule, JwtStrategy],
})
export class SignInModule {}
