import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DriverService } from '../driver/driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Driver } from '../driver/entities/driver.entity';
import { Car } from '../driver/entities/car.entity';
import { Trip } from '../trip/entities/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver, Car, Trip])],
  controllers: [AdminController],
  providers: [AdminService, DriverService],
})
export class AdminModule {}
