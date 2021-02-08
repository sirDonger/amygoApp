import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(){
        super({
            clientID: '230377840955-be3k6ppfmqhtk7k7nk85ri9pjgss5knm.apps.googleusercontent.com',
            clientSecret: 'pil89ZJf_yKemsDX3zwEGhZK',
            callbackURL: 'http://localhost:8083/api/auth/google/redirect',
            scope: ['email','profile']
        })
    }

    async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile
        const user = {
          email: emails[0].value,
          firstName: name.givenName,
          lastName: name.familyName,
          picture: photos[0].value,
          accessToken
        }
        done(null, user);
      }
}