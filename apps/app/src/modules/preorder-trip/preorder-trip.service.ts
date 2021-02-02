import { Injectable } from '@nestjs/common';
import { PreorderTripDto } from './dto/preorder-trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreorderTrip } from './entities/preorder.trip';

@Injectable()
export class PreorderTripService {
  constructor(
    @InjectRepository(PreorderTrip)
    private preorderTripRepository: Repository<PreorderTrip>,
  ) {}

  async preorder(preorderTripDto: PreorderTripDto) {
    await this.preorderTripRepository.save(preorderTripDto);
  }

  async findAllNotAcceptedPreorderTrips(): Promise<PreorderTrip[]> {
    const preorderTrips = await this.preorderTripRepository.find({
      where: {
        isAccepted: false,
      },
    });

    return preorderTrips;
  }

  async acceptPreorderTrip(
    preorderTripId: string,
    driverId: string,
  ): Promise<void> {
    const preorderTrip = await this.preorderTripRepository.findOne({
      where: {
        preorderTripId,
      },
    });
    preorderTrip.isAccepted = true;
    preorderTrip.driverId = driverId;
    await this.preorderTripRepository.save(preorderTrip);
  }
}
