import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [SignupService, UserService],
  controllers: [SignupController],
})
export class SignupModule {}
