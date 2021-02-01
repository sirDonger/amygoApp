import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Driver } from './entiities/driver.entity';
import { FileUploadService } from '../file-upload';

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver])],
  controllers: [DriverController],
  providers: [DriverService, FileUploadService],
  exports: [DriverService],
})
export class DriverModule {}
