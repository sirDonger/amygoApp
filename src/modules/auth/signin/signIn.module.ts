import { Module } from '@nestjs/common';
import { SignInController } from './signIn.controller';
import { SignInService } from './signIn.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyConfig } from './jwt.strategy.config';
import { FileUploadService } from '../../../helpers/file-upload';

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
  providers: [SignInService, UserService, JwtStrategyConfig, FileUploadService],
  controllers: [SignInController],
  exports: [PassportModule, JwtStrategyConfig],
})
export class SignInModule {}
