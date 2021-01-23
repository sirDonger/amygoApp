import {
  Controller,
  Get,
  Res,
  HttpStatus,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  public async getUser(@Req() req, @Res() res): Promise<void> {
    const user = await this.usersService.findById(req.user.id);

    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    delete user.id;
    delete user.password;

    return res.status(HttpStatus.OK).json(user);
  }
}
