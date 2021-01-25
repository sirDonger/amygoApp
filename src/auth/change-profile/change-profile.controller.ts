import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ChangeProfileService } from './change-profile.service';
import { ChangeProfileDto } from './dto/changeProfileDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user/profile/update')
export class ChangeProfileController {
  constructor(private readonly changeProfileService: ChangeProfileService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  public async updateProfile(
    @Body() changeProfileDto: ChangeProfileDto,
    @Req() req,
    @Res() res,
  ): Promise<any> {
    try {
      const { id } = req.user;

      await this.changeProfileService.updateProfile(changeProfileDto, id);

      res
        .status(HttpStatus.ACCEPTED)
        .json({ message: 'You changed your profile' });
    } catch (err) {
      throw new BadRequestException(err, HttpStatus.BAD_REQUEST.toString());
    }
  }
}
