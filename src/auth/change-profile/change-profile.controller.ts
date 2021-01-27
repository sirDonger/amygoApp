import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ChangeProfileService } from './change-profile.service';
import { ChangeProfileDto } from './dto/changeProfile.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../../helpers/file-upload';
import { UserService } from '../../user/user.service';

@Controller('user/profile/update')
export class ChangeProfileController {
  constructor(
    private readonly changeProfileService: ChangeProfileService,
    private readonly userService: UserService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('profileImage'))
  public async updateProfile(
    @Body() changeProfileDto: ChangeProfileDto,
    @UploadedFile() image,
    @Req() req,
    @Res() res,
  ): Promise<void> {
    try {
      const { id } = req.user;

      if (image) {
        image.originalname = Date.now() + image.originalname;
        changeProfileDto.profileImage =
          process.env.S3_BUCKET_URL + image.originalname;

        const { profileImage } = await this.userService.findById(id);

        await this.fileUploadService.delete(profileImage);
        await this.fileUploadService.upload(image);
      }

      await this.changeProfileService.updateProfile(changeProfileDto, id);

      res.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      throw new InternalServerErrorException(
        err,
        HttpStatus.BAD_REQUEST.toString(),
      );
    }
  }
}
