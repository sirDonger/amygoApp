import { Module } from '@nestjs/common';
import { PreorderTripController } from './preorder-trip.controller';
import { PreorderTripService } from './preorder-trip.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Driver } from '../driver/entities/driver.entity';
import { PreorderTrip } from './entities/preorderTrip.entity';
import SendNotification from './sendNotification.service';
import {Car} from "../driver/entities/car.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver,Car, PreorderTrip])],
  controllers: [PreorderTripController],
  providers: [PreorderTripService, UserService, SendNotification],
})
export class PreorderTripModule {}
