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
import { Messages } from '../messagesEnum/messages';

@Controller('/auth/signUp')
export class SignupController {
  constructor(private readonly signupService: SignUpService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profileImage', fileLimits))
  public async register(
    @Res() res,
    @UploadedFile() image,
    @Body() signupUserDto: SignupUserDto,
  ): Promise<any> {
    try {
      if (signupUserDto.password !== signupUserDto.confirm_password) {
        return res.status(HttpStatus.PRECONDITION_FAILED).json({
          message: Messages.PASSWORDS_NOT_MATCH,
        });
      }

      if (image) {
        signupUserDto.profileImage = image.filename;
      }

      await this.signupService.signup(signupUserDto);

      return res.status(HttpStatus.CREATED).json({
        message: Messages.NEW_USER_CREATED,
      });
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: err,
      });
    }
  }
}
