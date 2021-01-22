import { Body, Controller, Post } from '@nestjs/common';
import { SignInService } from './signin.service';
import { SignInUserDto } from './dto/signin.user.dto';

@Controller('auth/signin')
export class SignInController {
}
