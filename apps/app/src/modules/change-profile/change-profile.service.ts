import { HttpStatus, Injectable } from '@nestjs/common';
import { MessagesEnum } from '../../constants/messagesEnum';
import { ChangeProfileDto } from './dto/changeProfile.dto';
import { UserService } from '../user/user.service';
import { ResponseDto } from '../auth/dtoResponse/response.dto';
import { DriverService } from '../driver/driver.service';

@Injectable()
export class ChangeProfileService {
  constructor(
    private readonly userService: UserService,
    private readonly driverService: DriverService,
  ) {}
  public async updateProfile(
    changeProfileDto: ChangeProfileDto,
    userId: string,
    role: string,
  ): Promise<ResponseDto> {
    let user;
    if (role === 'user') {
      user = await this.userService.findById(userId);
    } else {
      user = await this.driverService.findById(userId);
    }

    if (!user) {
      return {
        message: MessagesEnum.SIGN_IN_FAILED,
        status: HttpStatus.UNAUTHORIZED,
      };
    }
    if (role === 'user') {
      await this.userService.updateProfile(user, changeProfileDto);
    } else {
      await this.driverService.updateProfile(user, changeProfileDto);
    }
  }
}
