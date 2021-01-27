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
import { MessagesEnum } from '../messagesEnum';

@Controller('/auth/signUp')
export class SignupController {
  constructor(private readonly signupService: SignUpService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profileImage'))
  public async register(
    @Res() res,
    @UploadedFile() image,
    @Body() signupUserDto: SignupUserDto,
  ): Promise<void> {
    try {
      if (image) {
        image.originalname = Date.now() + image.originalname;
        signupUserDto.profileImage =
          process.env.S3_BUCKET_URL + image.originalname;
      }

      await this.signupService.signup(signupUserDto, image);

      res.status(HttpStatus.CREATED).json({
        message: MessagesEnum.NEW_USER_CREATED,
      });
    } catch (err) {
      res.status(err.status).json({ message: err.message });
    }
  }
}
