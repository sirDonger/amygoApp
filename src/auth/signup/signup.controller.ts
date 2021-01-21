import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupUserDto } from './dto/signup.user.dto';

@Controller('/auth/signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  public async register(
    @Res() res,
    @Body() registerUserDto: SignupUserDto,
  ): Promise<any> {
    try {
      await this.signupService.signup(registerUserDto);

      return res.status(HttpStatus.OK).json({
        message: 'User registration successfully!',
        status: 200,
      });
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: err,
        status: 400,
      });
    }
  }

  @Get()
  genGreeting():string{
    return "It's sign up api"
  }
}
