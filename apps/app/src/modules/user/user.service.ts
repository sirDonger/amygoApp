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

  public async findByEmail(email: string, role: string): Promise<User> {
    let user;
    switch (role) {
      case 'user': {
        user = await this.userRepository.findOne({
          where: {
            email,
          },
        });
        break;
      }
      case 'driver': {
        user = await this.driverRepository.findOne({
          where: {
            email,
          },
        });
        break;
      }
    }

    if (!user) {
      if (!user) throw new NotFoundException(`User ${email} not registered`);
    }
    return user;
  }

  public async findById(userId: string, role?: string): Promise<User> {
    let user;
    if (!role) {
      user = await this.userRepository.findOne({
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
      }
    } else {
      switch (role) {
        case 'user': {
          user = await this.userRepository.findOne({
            where: {
              id: userId,
            },
          });
          break;
        }
        case 'driver': {
          user = await this.driverRepository.findOne({
            where: {
              id: userId,
            },
          });
          break;
        }
      }
    }

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
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

  public async updateProfile(user, userData: ChangeProfileDto, role: string) {
    switch (role) {
      case 'user': {
        await this.userRepository.update(user, userData);
        break;
      }
      case 'driver': {
        await this.driverRepository.update(user, userData);
        break;
      }
    }
  }

  async changePassword(user, newHashedPassword: string, role: string) {
    switch (role) {
      case 'user': {
        await this.userRepository.update(user, {
          password: newHashedPassword,
        });
        break;
      }
      case 'driver': {
        await this.driverRepository.update(user, {
          password: newHashedPassword,
        });
        break;
      }
    }
  }
}
