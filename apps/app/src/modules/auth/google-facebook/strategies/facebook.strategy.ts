import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {SocialService} from '../social.service';
import {Provider} from '../../../../constants/providers.enum';
import {VerifyCallback, Strategy} from 'passport-oauth2';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, Provider.FACEBOOK){
    constructor(
        private readonly socialService: SocialService,
    ){
        super({
            authorizationURL: 'https://www.facebook.com/v6.0/dialog/oauth?client_id'+process.env.FACEBOOK_CLIENT_ID+'&redirect_uri='+encodeURIComponent('https://localhost/api/auth/facebook/redirect'),
            tokenURL: 'https://graph.facebook.com/v6.0/oauth/access_token',
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callback: 'https://localhost/api/auth/facebook/redirect',
            scopes: ['emails', 'name']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>{
        console.log('----------------------status----------------------')
        const {name, emails, photos} = profile;
        // const jwt = await this.socialService.validateOAuthLogin(profile.id, Provider.FACEBOOK);
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value
        }

        const payload = {
            user,
            provider: Provider.FACEBOOK,
            // jwt: await jwt,
            facebookAccessToken: accessToken
        }
        done(null, payload);
    }

}