import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { In, Repository } from 'typeorm';
import { SignupDto } from '../auth/signup/dto/signup.dto';
import { UserDto } from '../user/dto/user.dto';
import { CarDto } from './dto/car.dto';
import { ChangeProfileDto } from '../change-profile/dto/changeProfile.dto';
import { Driver } from './entities/driver.entity';
import { Car } from './entities/car.entity';
import { DocumentsStatus } from './documentStatus.enum';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,

    @InjectRepository(Car)
    private carRepository: Repository<Car>
  ) {}

  public async findByEmail(email: string): Promise<User> {
    const driver = await this.driverRepository.findOne({
      where: {
        email,
      },
    });

    if (!driver) {
      if (!driver)
        throw new NotFoundException(`Driver ${email} not registered`);
    }
    return driver;
  }

  public async findById(userId: string): Promise<User> {
    const driver = await this.driverRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!driver) {
      throw new NotFoundException(`Driver #${userId} not found`);
    }
    return driver;
  }

  public async createDriver(userDto: SignupDto): Promise<UserDto> {
    const user = await this.driverRepository.save(userDto);
    const { password, ...rest } = user;

    return rest;
  }

  public async updateProfile(driver, userData: ChangeProfileDto) {
    await this.driverRepository.update(driver, userData);
  }

  public async addDocuments(driver) {
    await this.driverRepository.save(driver);
  }

  async changePassword(driver, newHashedPassword: string) {
    await this.driverRepository.update(driver, {
      password: newHashedPassword,
    });
  }

  public async createCar(carDto: CarDto){
    await this.carRepository.save(carDto);
  }

  async getDriversWaitingForConfirmation() {
    const drivers = await this.driverRepository.find({
      where: {
        documentsStatus: DocumentsStatus.WAITING_FOR_CONFIRMATION,
      },
    });

    return drivers;
  }
}
