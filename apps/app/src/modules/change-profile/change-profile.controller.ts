import {
  Body,
  Controller,
  HttpStatus,
  Param,
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
import { FileUploadService } from '../file-upload';
import { UserService } from '../user/user.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiNoContentResponse,
  ApiParam,
  ApiPayloadTooLargeResponse,
  ApiUnauthorizedResponse,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';

@Controller('/:role/profile/update')
export class ChangeProfileController {
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('profileImage'))
  @ApiParam({ name: 'role', enum: ['user', 'driver'] })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'Congrats, you changed your profile!' })
  @ApiUnauthorizedResponse({ description: 'Provide valid token' })
  @ApiConsumes('multipart/form-data')
  @ApiPayloadTooLargeResponse({
    description: "File's size should be less than 6Mb",
  })
  @ApiUnsupportedMediaTypeResponse({
    description: 'file extensions allowed: jpg, jpeg, png, svg, tiff, webp',
  })
  public async updateProfile(
    @Body() changeProfileDto: ChangeProfileDto,
    @Param('role') role: string,
    @UploadedFile() image,
    @Req() req,
    @Res() res,
  ): Promise<void> {
    try {
      const { id } = req.user;

      if (image) {
        this.fileUploadService.isFileValid(image);
        image.originalname = Date.now() + image.originalname;
        changeProfileDto.profileImage =
          process.env.S3_BUCKET_URL + image.originalname;

        const { profileImage } = await this.userService.findById(id);

        await this.fileUploadService.delete(profileImage);
        await this.fileUploadService.upload(image);
      }

      await this.changeProfileService.updateProfile(changeProfileDto, id, role);

      res.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      res
        .status(err.status)
        .json({ message: err.response.message || err.message });
    }
  }

  constructor(
    private readonly changeProfileService: ChangeProfileService,
    private readonly userService: UserService,
    private readonly fileUploadService: FileUploadService,
  ) {}
}