import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SignInUserDto } from '../signin/dto/signIn.user.dto';
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
  ): Promise<any> {
    return this.changePasswordService.changePassword(changePasswordDto);
  }
}
