import { HttpStatus, Injectable } from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { MessagesEnum } from '../messagesEnum';

@Injectable()
export class ChangePasswordService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async changePassword(
    changePasswordDto: ChangePasswordDto,
    userId: string,
  ): Promise<{ message: string; status: number }> {
    const { password, newPassword } = changePasswordDto;
    const user = await this.userRepository.findOne(userId);

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

    await this.userRepository.update(user, {
      password: newHashedPassword,
    });

    return {
      message: MessagesEnum.PASSWORD_CHANGED,
      status: HttpStatus.ACCEPTED,
    };
  }
}
