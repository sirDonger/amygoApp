import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { FileUploadService } from '../file-upload';
import { Driver } from '../driver/entiities/driver.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Driver]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
    }),
  ],
  providers: [UserService, FileUploadService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
