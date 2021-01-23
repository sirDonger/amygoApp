import { Body, Controller, Post } from '@nestjs/common';
import { SignInUserDto } from './dto/signIn.user.dto';
import { SignInService } from './signIn.service';

@Controller('auth/signIn')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post()
  public async signIn(@Body() signInUserDto: SignInUserDto): Promise<any> {
    return await this.signInService.signIn(signInUserDto);
  }
}
