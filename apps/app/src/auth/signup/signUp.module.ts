import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { SignUpService } from './signUp.service';
import { SignupController } from './signUp.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [SignUpService, UserService],
  controllers: [SignupController],
})
export class SignUpModule {}
