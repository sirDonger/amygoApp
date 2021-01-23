import { Module } from '@nestjs/common';
import { SignInController } from './signInController';
import { SignInService } from './signin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: 'hgghuyui',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [SignInService, UserService, JwtStrategy],
  controllers: [SignInController],
})
export class SignInModule {}
