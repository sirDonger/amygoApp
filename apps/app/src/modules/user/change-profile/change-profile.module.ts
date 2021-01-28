import { Module } from '@nestjs/common';
import { ChangeProfileController } from './change-profile.controller';
import { ChangeProfileService } from './change-profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';
import { FileUploadService } from '../../file-upload';
import { Driver } from '../../driver/entiities/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver])],
  controllers: [ChangeProfileController],
  providers: [ChangeProfileService, UserService, FileUploadService],
})
export class ChangeProfileModule {}
