import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { SignupUserDto } from '../auth/signup/dto/signup.user.dto';
import { ChangeProfileDto } from '../auth/change-profile/dto/changeProfile.dto';
import { FileUploadService } from '../helpers/file-upload';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    return user;
  }

  public async findById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }

  public async create(userDto: SignupUserDto, image?): Promise<UserDto> {
    try {
      if (image) {
        this.fileUploadService.isFileValid(image);
      }
      const user = await this.userRepository.save(userDto);
      if (image) {
        await this.fileUploadService.upload(image);
      }
      const { password, ...rest } = user;
      return rest;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async updateProfile(user, userData: ChangeProfileDto) {
    await this.userRepository.update(user, userData);
  }
}
