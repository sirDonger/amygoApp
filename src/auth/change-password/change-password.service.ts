import { HttpStatus, Injectable } from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-passwordDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Messages } from '../messagesEnum/messages';

@Injectable()
export class ChangePasswordService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async changePassword(changePasswordDto: ChangePasswordDto, userId: string) {
    const { email, password, newPassword } = changePasswordDto;
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      return {
        message: Messages.EMAIL_NOT_EXISTS,
        status: HttpStatus.PRECONDITION_FAILED,
      };
    }

    if (user.id !== userId) {
      return {
        message: Messages.NOT_ALLOWED_OPERATION,
        status: HttpStatus.FORBIDDEN,
      };
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return {
        message: Messages.WRONG_PASSWORD,
        status: HttpStatus.PRECONDITION_FAILED,
      };
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userRepository.update(user, {
      password: newHashedPassword,
    });

    return {
      message: Messages.PASSWORD_CHANGED,
      status: HttpStatus.ACCEPTED,
    };
  }
}
