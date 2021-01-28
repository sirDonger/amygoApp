import { HttpStatus, Injectable } from '@nestjs/common';
import { MessagesEnum } from '../../../constants/messagesEnum';
import { ChangeProfileDto } from './dto/changeProfile.dto';
import { UserService } from '../user.service';
import { ResponseDto } from '../../auth/dtoResponse/response.dto';

@Injectable()
export class ChangeProfileService {
  constructor(private readonly userService: UserService) {}
  public async updateProfile(
    changeProfileDto: ChangeProfileDto,
    userId: string,
    role: string,
  ): Promise<ResponseDto> {
    const user = await this.userService.findById(userId, role);

    if (!user) {
      return {
        message: MessagesEnum.SIGN_IN_FAILED,
        status: HttpStatus.UNAUTHORIZED,
      };
    }
    await this.userService.updateProfile(user, changeProfileDto, role);
  }
}
