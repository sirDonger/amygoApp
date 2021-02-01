import { Module } from '@nestjs/common';
import { ChangeProfileController } from './change-profile.controller';
import { ChangeProfileService } from './change-profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { FileUploadService } from '../file-upload';
import { Driver } from '../driver/entities/driver.entity';
import { DriverService } from '../driver/driver.service';
import { Car } from '../driver/entities/car.entity';
import { Trip } from '../trip/entities/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver, Car, Trip])],
  controllers: [ChangeProfileController],
  providers: [
    ChangeProfileService,
    UserService,
    FileUploadService,
    DriverService,
  ],
})
export class ChangeProfileModule {}
