import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { SignupUserDto } from './dto/signup.user.dto';
import { UserDto } from '../../user/dto/user.dto';
import { UserService } from '../../user/user.service';

@Injectable()
export class SignUpService {
  constructor(private readonly usersService: UserService) {}

  public async signupUser(
    registerUserDto: SignupUserDto,
    role: string,
  ): Promise<UserDto> {
    registerUserDto.password = await bcrypt.hash(registerUserDto.password, 10);
    registerUserDto.email = registerUserDto.email.toLowerCase();

    return this.usersService.create(registerUserDto, role);
  }
}
