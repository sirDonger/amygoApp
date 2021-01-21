import {
  Controller,
  Get,
  Res,
  HttpStatus,
  NotFoundException,
  Headers,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';
import jsonwebtoken from 'jsonwebtoken';

@Controller('/api/user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('/profile')
  public async getUser(
    @Res() res,
    @Headers('Authorization') token: string,
  ): Promise<IUser> {
    const tokenDecoded = jsonwebtoken.decode(token);

    const user = await this.usersService.findById(tokenDecoded[0].id);

    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    return res.status(HttpStatus.OK).json({
      user: user,
      status: 200,
    });
  }
}
