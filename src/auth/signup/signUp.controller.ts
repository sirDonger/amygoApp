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
import { Messages } from '../messagesEnum/messages';
import { FileUploadService } from '../../helpers/file-upload/file-upload.service';

@Controller('/auth/signUp')
export class SignupController {
  constructor(
    private readonly signupService: SignUpService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('profileImage'))
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
        console.log(image, 'image');
        image.originalname = Date.now() + image.originalname;
        console.log(image.filename);
        signupUserDto.profileImage = process.env.S3_BUCKET_URL +  image.originalname;
        await this.fileUploadService.upload(image);
      }

      await this.signupService.signup(signupUserDto);

      return res.status(HttpStatus.CREATED).json({
        message: Messages.NEW_USER_CREATED,
      });
    } catch (err) {
      return res.json(err)
    }
  }
}
