import { HttpStatus, Injectable } from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcryptjs';
import { MessagesEnum } from '../../../constants/messagesEnum';
import { ResponseDto } from '../dtoResponse/response.dto';
import { UserService } from '../../user/user.service';

@Injectable()
export class ChangePasswordService {
  constructor(private userService: UserService) {}
  async changePassword(
    changePasswordDto: ChangePasswordDto,
    userId: string,
    role: string,
  ): Promise<ResponseDto> {
    const { password, newPassword } = changePasswordDto;
    const user = await this.userService.findById(userId, role);
    if (!user) {
      return {
        message: MessagesEnum.EMAIL_NOT_EXISTS,
        status: HttpStatus.PRECONDITION_FAILED,
      };
    }

    if (user.id !== userId) {
      return {
        message: MessagesEnum.NOT_ALLOWED_OPERATION,
        status: HttpStatus.FORBIDDEN,
      };
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return {
        message: MessagesEnum.WRONG_PASSWORD,
        status: HttpStatus.PRECONDITION_FAILED,
      };
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userService.changePassword(user, newHashedPassword, role);

    return {
      message: MessagesEnum.PASSWORD_CHANGED,
      status: HttpStatus.NO_CONTENT,
    };
  }
}
