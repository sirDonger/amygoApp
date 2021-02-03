import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Driver } from './entiities/driver.entity';
import { FileUploadService } from '../file-upload';
import { PreorderTripService } from '../preorder-trip/preorder-trip.service';
import { PreorderTrip } from '../preorder-trip/entities/preorder.trip';
import SendNotificationService from "../preorder-trip/sendNotification.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver, PreorderTrip])],
  controllers: [DriverController],
  providers: [DriverService, FileUploadService, PreorderTripService, SendNotificationService],
  exports: [DriverService],
})
export class DriverModule {}
