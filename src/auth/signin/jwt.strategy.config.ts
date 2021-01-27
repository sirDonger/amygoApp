import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { JwtPayloadInterface } from './interfaces/jwt.payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategyConfig extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: JwtPayloadInterface) {
    const { userId } = payload;
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;
    return user;
  }
}
