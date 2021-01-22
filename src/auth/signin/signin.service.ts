import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../../user/user.service';
import { User } from '../../user/entities/user.entity';
import { JwtPayload } from './interfaces/jwt.payload';
import { SignInUserDto } from './dto/signin.user.dto';
import { config } from '../../config/config';

@Injectable()
export class SignInService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async validate(signInUserDto: SignInUserDto): Promise<User> {
    return await this.userService.findByEmail(signInUserDto.email);
  }

  public async signIn(
    loginDto: SignInUserDto,
  ): Promise<any | { status: number; message: string }> {
    return this.validate(loginDto).then((userData) => {
      if (!userData) {
        throw new UnauthorizedException();
      }

      const passwordIsValid = bcrypt.compareSync(
        loginDto.password,
        userData.password,
      );

      if (!passwordIsValid == true) {
        return {
          message: 'Authentication failed. Wrong password',
          status: 400,
        };
      }

      const payload = {
        name: userData.name,
        email: userData.email,
        id: userData.id,
      };

      const accessToken = this.jwtService.sign(payload);

      return {
        expiresIn: config.JWT_ACCESS_EXP,
        accessToken: accessToken,
        user: payload,
        status: 200,
      };
    });
  }

  public async validateUserByJwt(payload: JwtPayload) {
    const user = await this.userService.findByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return this.createJwtPayload(user);
  }

  protected createJwtPayload(user) {
    const data: JwtPayload = {
      email: user.email,
    };

    const jwt = this.jwtService.sign(data);

    return {
      expiresIn: 3600,
      token: jwt,
    };
  }
}
