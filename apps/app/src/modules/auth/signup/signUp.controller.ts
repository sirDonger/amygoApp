import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { SignUpService } from './signUp.service';
import { SignupUserDto } from './dto/signup.user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessagesEnum } from '../../../constants/messagesEnum';
import { FileUploadService } from '../../file-upload';

@Controller('/:role/auth/signUp')
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
    @Param('role') role: string,
    @Body() signupUserDto: SignupUserDto,
  ): Promise<void> {
    try {
      if (image) {
        this.fileUploadService.isFileValid(image);
        image.originalname = Date.now() + image.originalname;
        signupUserDto.profileImage =
          process.env.S3_BUCKET_URL + image.originalname;
      }

      await this.signupService.signupUser(signupUserDto, role);

      if (image) {
        await this.fileUploadService.upload(image);
      }

      res.status(HttpStatus.CREATED).json({
        message:
          role === 'user'
            ? MessagesEnum.NEW_USER_CREATED
            : MessagesEnum.NEW_DRIVER_CREATED,
      });
    } catch (err) {
      res.status(err.status).json({ message: err.message });
    }
  }
}