import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Driver } from './entities/driver.entity';
import { Car } from './entities/car.entity';
import { Trip } from '../trip/entities/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver, Car, Trip])],
  controllers: [DriverController],
  providers: [DriverService],
  exports: [DriverService],
})
export class DriverModule {}
