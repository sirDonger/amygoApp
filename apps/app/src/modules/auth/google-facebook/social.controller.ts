import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SocialService } from './social.service';

@Controller('auth')
export class SocialController{
    constructor(
        private readonly socialService: SocialService
    ){}

    @Get('google/login')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req){}

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req){
        return this.socialService.googleLogin(req);
    }
}