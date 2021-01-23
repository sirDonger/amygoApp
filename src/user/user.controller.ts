import {
  Controller,
  Get,
  Res,
  HttpStatus,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  public async getUser(@Req() req, @Res() res): Promise<IUser> {
    const user = await this.usersService.findById(req.body.userId);

    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    return res.status(HttpStatus.OK).json({
      user: user,
      status: 200,
    });
  }
}
