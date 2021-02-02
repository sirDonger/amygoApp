import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { Driver } from '../driver/entities/driver.entity';
import { TripDto } from './dto/trip.dto';

@Injectable()
export class TripService{
    constructor(
        @InjectRepository(Trip)
        private tripRepository: Repository<Trip>,

        @InjectRepository(Driver)
        private driverRepository: Repository<Driver>
    ){}

    public async createTrip(tripDto: TripDto, userId){
        const driver = await this.driverRepository.findOne({
            where: {
              id: userId,
            },
        });

        tripDto.driver = driver;
        await this.tripRepository.save(tripDto);
    }
}