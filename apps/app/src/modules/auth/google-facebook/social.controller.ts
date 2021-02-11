import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SocialService } from './social.service';
const resolvePkg = require('resolve-pkg');

@Controller('auth')
export class SocialController{
    constructor(
        private readonly socialService: SocialService
    ){}

    @Get('google/login')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req){
        console.log(resolvePkg('@some/package'));
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req){
        return this.socialService.socialLogin(req);
    }

    @Get('facebook/login')
    @UseGuards(AuthGuard('facebook'))
    async facebookLogin(@Req() req){}

    @Get('facebook/redirect')
    @UseGuards(AuthGuard('facebook'))
    facebookAuthRedirect(@Req() req){
        return this.socialService.socialLogin(req)
    }
}