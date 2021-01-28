import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { SignInUserDto } from './dto/signIn.user.dto';
import { SignInService } from './signIn.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('/:role/auth/signIn')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post()
  @ApiBadRequestResponse({ description: 'Email should be valid' })
  @ApiOkResponse({ description: 'Successfully signed in' })
  @ApiNotFoundResponse({ description: 'This email is not registered yet' })
  @ApiUnauthorizedResponse({ description: 'Email or password is incorrect!' })
  public async signIn(
    @Param('role') role,
    @Body() signInUserDto: SignInUserDto,
    @Res() res,
  ): Promise<void> {
    try {
      const response = await this.signInService.signIn(signInUserDto, role);

      res
        .status(response.status)
        .json({ message: response.message, accessToken: response.accessToken });
    } catch (err) {
      res.status(err.status).json({ message: err.message });
    }
  }
}
