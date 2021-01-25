import {
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { SignInUserDto } from './dto/signIn.user.dto';
import { SignInService } from './signIn.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth/signIn')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post()
  @ApiBadRequestResponse({ description: 'Email should be valid' })
  @ApiOkResponse({ description: 'Successfully signed in' })
  @ApiNotFoundResponse({ description: 'This email is not registered yet' })
  @ApiUnauthorizedResponse({ description: 'Email or password is incorrect!' })
  public async signIn(
    @Body() signInUserDto: SignInUserDto,
    @Res() res,
  ): Promise<any> {
    try {
      console.log(signInUserDto, 'signInUserDto');
      const response = await this.signInService.signIn(signInUserDto);
      res
        .status(response.status)
        .json({ message: response.message, accessToken: response.accessToken });
    } catch (err) {
      throw new NotFoundException(err, HttpStatus.BAD_REQUEST.toString());
    }
  }
}
