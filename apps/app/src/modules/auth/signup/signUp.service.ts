import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
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
    registerUserDto: SignupDto,
    role: string,
  ): Promise<UserDto> {
    registerUserDto.password = await bcrypt.hash(registerUserDto.password, 10);
    registerUserDto.email = registerUserDto.email.toLowerCase();

    if (role === 'user') return this.usersService.createUser(registerUserDto);

    return this.driverService.createDriver(registerUserDto);
  }
}
