import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from './dto/signIn.user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './interfaces/jwt.payload';

@Injectable()
export class SignInService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(
    loginDto: SignInUserDto,
  ): Promise<any | { status: number; message: string }> {
    const userData = await this.userService.findByEmail(loginDto.email);
    if (!userData) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      userData.password,
    );

    if (!isPasswordValid) {
      return {
        message: 'Authentication failed. Wrong password',
        status: 412,
      };
    }

    const payload: JwtPayload = {
      userId: userData.id,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken: accessToken,
      status: 200,
    };
  }
}
