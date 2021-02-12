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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully signed in' })
  @ApiUnauthorizedResponse({ description: 'Provide valid access token' })
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
