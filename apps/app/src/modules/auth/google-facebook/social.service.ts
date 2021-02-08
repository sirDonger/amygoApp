import {Injectable} from '@nestjs/common';

@Injectable()
export class SocialService{
    googleLogin(req){
        if(!req.user){
            return 'No user from google'
        }
        return {
            message: 'User google info',
            user: req.user
        }
    }
}