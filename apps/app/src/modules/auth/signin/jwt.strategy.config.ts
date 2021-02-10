import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { JwtPayloadInterface } from './interfaces/jwt.payload.interface';
import { ConfigService } from '@nestjs/config';
import { DriverService } from '../../driver/driver.service';

@Injectable()
export class JwtStrategyConfig extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly driverService: DriverService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.GOOGLE_CLIENT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayloadInterface) {
    const { userId } = payload;
    let user;

    if (req.url.includes('user'))
      user = await this.userService.findById(userId);
    else user = await this.driverService.findById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;
    return user;
  }
}
