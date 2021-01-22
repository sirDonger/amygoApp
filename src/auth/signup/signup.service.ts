import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { SignupUserDto } from './dto/signup.user.dto';
import { UserService } from '../../user/user.service';
import { IUser } from '../../user/interfaces/user.interface';

@Injectable()
export class SignupService {
  constructor(private readonly usersService: UserService) {}

  public async signup(registerUserDto: SignupUserDto): Promise<IUser> {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(registerUserDto.password, saltRounds);

    registerUserDto.password = hash;
    console.log(hash);

    return this.usersService.create(registerUserDto);
  }
}
