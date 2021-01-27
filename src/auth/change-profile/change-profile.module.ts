import { Module } from '@nestjs/common';
import { ChangeProfileController } from './change-profile.controller';
import { ChangeProfileService } from './change-profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { FileUploadService } from '../../helpers/file-upload';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ChangeProfileController],
  providers: [ChangeProfileService, UserService, FileUploadService],
})
export class ChangeProfileModule {}
