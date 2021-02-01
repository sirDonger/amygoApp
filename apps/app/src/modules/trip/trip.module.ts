import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { User } from '../user/entities/user.entity';
import { Driver } from '../driver/entities/driver.entity';
import { Car } from '../driver/entities/car.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Car, Driver, Trip])],
    providers: [TripService],
    controllers: [TripController]
})

export class TripModule {}