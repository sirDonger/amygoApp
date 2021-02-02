import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { SignupUserDto } from '../auth/signup/dto/signupUser.dto';
import { ChangeProfileDto } from '../change-profile/dto/changeProfile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      if (!user) throw new NotFoundException(`User ${email} not registered`);
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

  public async createUser(userDto: SignupUserDto): Promise<UserDto> {
    const user = await this.userRepository.save(userDto);
    const { password, ...rest } = user;

    return rest;
  }

  public async updateProfile(user, userData: ChangeProfileDto) {
    await this.userRepository.update(user, userData);
  }

  async changePassword(user, newHashedPassword: string) {
    await this.userRepository.update(user, {
      password: newHashedPassword,
    });
  }
}
