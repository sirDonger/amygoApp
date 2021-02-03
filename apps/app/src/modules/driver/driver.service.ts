import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { In, Repository } from 'typeorm';
import { SignupUserDto } from '../auth/signup/dto/signupUser.dto';
import { SignupDriverDto } from '../auth/signup/dto/signupDriver.dto';
import { UserDto } from '../user/dto/user.dto';
import { CarDto } from './dto/car.dto';
import { ChangeProfileDto } from '../change-profile/dto/changeProfile.dto';
import { Driver } from './entities/driver.entity';
import { Car } from './entities/car.entity';
import { DocumentsStatus } from './documentStatus.enum';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,

    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  public async findByEmail(email: string): Promise<User> {
    const driver = await this.driverRepository.findOne({
      where: {
        email,
      },
    });

    if (!driver) {
      if (!driver)
        throw new NotFoundException(`Driver ${email} not found`);
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

  public async findByPhoneNumber(phoneNumber: string): Promise<User> {
    const driver = await this.driverRepository.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    if (!driver) {
      throw new NotFoundException(`Driver #${phoneNumber} not found`);
    }
    return driver;
  }

  public async createDriver(userDto: SignupDriverDto): Promise<UserDto> {
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

  public async createCar(carDto: CarDto, userId){
    const driver = await this.driverRepository.findOne({
      where: {
        id: userId,
      },
    });
    carDto.driver = driver;
    // console.log(await this.carRepository.save(carDto));
    await this.carRepository.save(carDto)
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
