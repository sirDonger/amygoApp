import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { SignupUserDto } from '../auth/signup/dto/signup.user.dto';
import { ChangeProfileDto } from './change-profile/dto/changeProfile.dto';
import { Driver } from '../driver/entiities/driver.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  public async findByEmail(email: string): Promise<User> {
    let user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      user = await this.driverRepository.findOne({
        where: {
          email,
        },
      });
      if (!user) throw new NotFoundException(`User ${email} not registered`);
    }
    return user;
  }

  public async findById(userId: string): Promise<User> {
    console.log('find by id');
    let user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      user = await this.driverRepository.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) {
        throw new NotFoundException(`User #${userId} not found`);
      }
    }
    return user;
  }

  public async create(userDto: SignupUserDto, role: string): Promise<UserDto> {
    try {
      let user;
      switch (role) {
        case 'user': {
          user = await this.userRepository.save(userDto);
          break;
        }
        case 'driver': {
          user = await this.driverRepository.save(userDto);
          break;
        }
      }

      const { password, ...rest } = user;
      return rest;
    } catch (err) {
      throw new ConflictException(err.detail);
    }
  }

  public async updateProfile(user, userData: ChangeProfileDto) {
    console.log(user);
    await this.userRepository.update(user, userData);
  }

  async changePassword(user, newHashedPassword: string) {
    console.log(user);
    await this.userRepository.update(user, {
      password: newHashedPassword,
    });
    await this.driverRepository.update(user, {
      password: newHashedPassword,
    });
  }
}
