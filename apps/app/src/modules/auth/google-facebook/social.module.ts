import {Module} from '@nestjs/common';
import { from } from 'rxjs';
import {SocialController} from './social.controller';
import {SocialService} from './social.service';
import {GoogleStrategy} from './strategies/google.strategy';

@Module({
    imports: [],
    controllers: [SocialController],
    providers: [SocialService, GoogleStrategy]
})

export class SocialModule{}