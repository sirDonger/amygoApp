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
import { SignupDto } from './dto/signup.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessagesEnum } from '../../../constants/messagesEnum';
import { FileUploadService } from '../../file-upload';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller('/:role/auth/signUp')
export class SignupController {
  constructor(
    private readonly signupService: SignUpService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('profileImage'))
  @ApiParam({ name: 'role', enum: ['user', 'driver'] })
  @ApiConflictResponse({
    description: 'Email or phoneNumber already exists!',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBadRequestResponse({
    description:
      'Please read a message in response ' +
      "body, to figure out which validation constraint you didn't pass",
  })
  @ApiCreatedResponse({ description: 'Successfully created new user!' })
  public async register(
    @Res() res,
    @UploadedFile() image,
    @Param('role') role: string,
    @Body() signupUserDto: SignupDto,
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
      res
        .status(HttpStatus.CONFLICT)
        .json({ message: err.detail || err.message });
    }
  }
}
