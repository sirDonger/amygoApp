import { Module } from '@nestjs/common';
import { ChangePasswordController } from './change-password.controller';
import { ChangePasswordService } from './change-password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { Driver } from '../../driver/entiities/driver.entity';
import { UserService } from '../../user/user.service';
import { UserModule } from '../../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver]), UserModule],
  controllers: [ChangePasswordController],
  providers: [ChangePasswordService, UserService],
})
export class ChangePasswordModule {}
