import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { SignUpService } from './signUp.service';
import { SignupController } from './signUp.controller';
import { FileUploadModule } from '../../file-upload/file-upload.module';
import { Driver } from '../../driver/entities/driver.entity';
import { DriverService } from '../../driver/driver.service';
import { Car } from '../../driver/entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver, Car]), FileUploadModule],
  providers: [SignUpService, UserService, DriverService],
  controllers: [SignupController],
})
export class SignUpModule {}
