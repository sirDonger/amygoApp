import {Injectable} from '@nestjs/common';

@Injectable()
export class SocialService{
    googleLogin(req){
        if(!req.user){
            return 'No user from google'
        }
        console.log(req.user);
        return {
            message: 'User google info',
            user: req.user
        }
    }
}