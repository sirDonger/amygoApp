import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Driver } from './entities/driver.entity';
import { Car } from './entities/car.entity';
import { Trip } from '../trip/entities/trip.entity';
import { FileUploadService } from '../file-upload';
import { PreorderTripService } from '../preorder-trip/preorder-trip.service';
import { PreorderTrip } from '../preorder-trip/entities/preorder.trip';
import SendNotificationService from "../preorder-trip/sendNotification.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver, Car, Trip, PreorderTrip, PreorderTripService, SendNotificationService])],
  controllers: [DriverController],
  providers: [DriverService, FileUploadService],
  exports: [DriverService],
})
export class DriverModule {}
