import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { SignUpService } from './signUp.service';
import { SignupController } from './signUp.controller';
import { FileUploadModule } from '../../file-upload/file-upload.module';
import { Driver } from '../../driver/entiities/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver]), FileUploadModule],
  providers: [SignUpService, UserService],
  controllers: [SignupController],
})
export class SignUpModule {}
