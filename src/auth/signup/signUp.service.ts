import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { SignupUserDto } from './dto/signup.user.dto';
import { UserDto } from '../../user/dto/user.dto';
import { UserService } from '../../user/user.service';

@Injectable()
export class SignUpService {
  constructor(private readonly usersService: UserService) {}

  public async signup(registerUserDto: SignupUserDto, image): Promise<UserDto> {
    registerUserDto.password = await bcrypt.hash(registerUserDto.password, 10);
    registerUserDto.email = registerUserDto.email.toLowerCase();
    try {
      return this.usersService.create(registerUserDto, image);
    } catch (err) {
      throw err;
    }
  }
}
