import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { SignupUserDto } from './dto/signupUser.dto';
import { SignupDriverDto } from './dto/signupDriver.dto';
import { UserDto } from '../../user/dto/user.dto';
import { UserService } from '../../user/user.service';
import { DriverService } from '../../driver/driver.service';

@Injectable()
export class SignUpService {
  constructor(
    private readonly usersService: UserService,
    private readonly driverService: DriverService,
  ) {}

  public async signupUser(
    registerUserDto: SignupUserDto,
  ): Promise<UserDto> {
    registerUserDto.password = await bcrypt.hash(registerUserDto.password, 10);
    registerUserDto.email = registerUserDto.email.toLowerCase();

    return this.usersService.createUser(registerUserDto);
  }

  public async signupDriver(
    registerDriverDto: SignupDriverDto,
  ): Promise<UserDto>{
    registerDriverDto.password = await bcrypt.hash(registerDriverDto.password, 10);
    registerDriverDto.email = registerDriverDto.email.toLowerCase();
    
    return this.driverService.createDriver(registerDriverDto);
  }
}
