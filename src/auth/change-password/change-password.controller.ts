import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ChangePasswordService } from './change-password.service';
import { ChangePasswordDto } from './dto/change-passwordDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth/change-password')
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  public async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req,
  ): Promise<any> {
    const { id } = req.user;
    return this.changePasswordService.changePassword(changePasswordDto, id);
  }
}
