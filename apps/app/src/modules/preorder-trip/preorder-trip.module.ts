import { Module } from '@nestjs/common';
import { PreorderTripController } from './preorder-trip.controller';
import { PreorderTripService } from './preorder-trip.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Driver } from '../driver/entiities/driver.entity';
import { PreorderTrip } from './entities/preorder.trip';

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver, PreorderTrip])],
  controllers: [PreorderTripController],
  providers: [PreorderTripService, UserService],
})
export class PreorderTripModule {}
