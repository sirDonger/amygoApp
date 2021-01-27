import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { SignUpService } from './signUp.service';
import { SignupController } from './signUp.controller';
import { FileUploadService } from '../../helpers/file-upload';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [SignUpService, UserService, FileUploadService],
  controllers: [SignupController],
})
export class SignUpModule {}
