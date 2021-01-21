import {
  Controller,
  Get,
  Res,
  Param,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('/api/user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('/:userId/profile')
  public async getUser(
    @Res() res,
    @Param('userId') userId: string,
  ): Promise<IUser> {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    return res.status(HttpStatus.OK).json({
      user: user,
      status: 200,
    });
  }
}
