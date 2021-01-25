import { HttpStatus, Injectable } from '@nestjs/common';
import { Messages } from '../messagesEnum/messages';
import { ChangeProfileDto } from './dto/changeProfileDto';
import { UserService } from '../../user/user.service';

@Injectable()
export class ChangeProfileService {
  constructor(private readonly userService: UserService) {}
  public async updateProfile(
    changeProfileDto: ChangeProfileDto,
    userId: string,
  ): Promise<any | { status: number; message: string }> {
    const user = await this.userService.findById(userId);
    if (!user) {
      return {
        message: Messages.SIGN_IN_FAILED,
        status: HttpStatus.UNAUTHORIZED,
      };
    }
    await this.userService.updateProfile(user, changeProfileDto);
  }
}
