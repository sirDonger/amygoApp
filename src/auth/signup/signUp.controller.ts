import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SignUpService } from './signUp.service';
import { SignupUserDto } from './dto/signup.user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileLimits } from '../fileUpload/fileLimits.config';

@Controller('/auth/signUp')
export class SignupController {
  constructor(private readonly signupService: SignUpService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profileImage', fileLimits))
  public async register(
    @Res() res,
    @UploadedFile() file,
    @Body() registerUserDto: SignupUserDto,
  ): Promise<any> {
    try {
      if (registerUserDto.password === registerUserDto.confirm_password) {
        registerUserDto.profileImage = file.filename;
        await this.signupService.signup(registerUserDto);
        return res.status(HttpStatus.OK).json({
          message: 'User created successfully!',
          status: 200,
        });
      } else {
        return res.status(HttpStatus.PRECONDITION_FAILED).json({
          message: 'Password was not confirmed',
          status: 412,
        });
      }
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: err,
        status: 500,
      });
    }
  }
}
