import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { SignupUserDto } from './dto/signup.user.dto';
import { UserDto } from '../../user/dto/user.dto';
import { UserService } from '../../user/user.service';

@Injectable()
export class SignUpService {
  constructor(private readonly usersService: UserService) {}

  public async signup(registerUserDto: SignupUserDto): Promise<UserDto> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);

    registerUserDto.password = hash;

    return this.usersService.create(registerUserDto);
  }
}