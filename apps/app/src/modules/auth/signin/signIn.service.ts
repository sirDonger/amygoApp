import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from './dto/signIn.user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtPayloadInterface } from './interfaces/jwt.payload.interface';
import { MessagesEnum } from '../../../constants/messagesEnum';
import { ResponseDto } from '../dtoResponse/response.dto';

@Injectable()
export class SignInService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(signInUserDto: SignInUserDto): Promise<ResponseDto> {
    const userData = await this.userService.findByEmail(
      signInUserDto.email.toLowerCase(),
    );
    if (!userData) {
      return {
        message: MessagesEnum.SIGN_IN_FAILED,
        status: HttpStatus.UNAUTHORIZED,
      };
    }

    const isPasswordValid = await bcrypt.compare(
      signInUserDto.password,
      userData.password,
    );

    if (!isPasswordValid) {
      return {
        message: MessagesEnum.SIGN_IN_FAILED,
        status: HttpStatus.UNAUTHORIZED,
      };
    }

    const payload: JwtPayloadInterface = {
      userId: userData.id,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      status: HttpStatus.OK,
    };
  }
}
