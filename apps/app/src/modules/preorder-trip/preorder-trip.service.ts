import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PreorderTripDto } from './dto/preorder-trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreorderTrip } from './entities/preorder.trip';
import { constant } from '../../constants';
import { PreorderTripStatus } from './enum/PreorderTripStatus.enum';
import { Driver } from '../driver/entiities/driver.entity';
import {ConfirmDriverOfferDto} from "./dto/confirmDriverOffer.dto";
import SendNotificationService from "./sendNotification.service";

@Injectable()
export class PreorderTripService {
  constructor(
    @InjectRepository(PreorderTrip)
    private preorderTripRepository: Repository<PreorderTrip>,
    private readonly sendNotificationService: SendNotificationService
  ) {}

  async preorder(preorderTripDto: PreorderTripDto) {
    await this.preorderTripRepository.save(preorderTripDto);
  }

  async findAllNotAcceptedPreorderTrips(): Promise<PreorderTrip[]> {
    //TODO limit, order by location....
    const preorderTrips = await this.preorderTripRepository.find({
      select: ["preorderTripId", "when", "where", "from", "userId", "numberOfPeople"],
      where: [
        {statusOfPreorderTrip: PreorderTripStatus.WAITING_FOR_CONFIRMATION},
        {statusOfPreorderTrip: PreorderTripStatus.NO_OFFERING}
        ]
    });

    return preorderTrips;
  }

  async acceptPreorderTrip(
    preorderTripId: string,
    driver: Driver,
  ): Promise<void> {
    const preorderTrip = await this.preorderTripRepository.findOne({
      where: {
        preorderTripId,
      },
    });
    //TODO send user notification to preorderTrip.userId

    console.log(preorderTrip, 'PREORDER TRIP');
    preorderTrip.statusOfPreorderTrip =
      PreorderTripStatus.WAITING_FOR_CONFIRMATION;
    preorderTrip.drivers.push(driver);
    await this.preorderTripRepository.save(preorderTrip);
  }

  async driverRejectPreorderTrip(preorderTripId: string): Promise<void> {
    const preorderTrip = await this.preorderTripRepository.findOne({
      where: {
        preorderTripId,
      },
    });

    if (
      preorderTrip.when.getTime() - new Date(Date.now()).getTime() >=
      constant.MIN_DATE_OF_PREORDER
    ) {
      console.log(preorderTrip.when.getTime());
      console.log(new Date(Date.now()).getTime());
      preorderTrip.statusOfPreorderTrip = PreorderTripStatus.NO_OFFERING;
      //TODO filter array
      preorderTrip.drivers = null;

      await this.preorderTripRepository.save(preorderTrip);
      return;
    }
    //TODO which exception??
    throw new NotAcceptableException(
      null,
      "You can't deny trip sooner than one hour before the trip start",
    );
  }

  async getAllOffers(userId: string) {
    const allOffers = await this.preorderTripRepository.findOne({
      where: {
        userId,
        statusOfPreorderTrip: PreorderTripStatus.WAITING_FOR_CONFIRMATION,
      },
    });

    if (!allOffers.drivers.length) {
      throw new NotFoundException(null, 'There is no offers from drivers');
    }


    return {preorderTripId: allOffers.preorderTripId, drivers: allOffers.drivers.map(driver => {
      const {documentsStatus, documents, emergencyContact, password,  profileImage, ...rest} = driver
      return rest})
    };
  }

  async confirmDriver(confirmDriverOfferDto: ConfirmDriverOfferDto) {
    const {preorderTripId, driverId} = confirmDriverOfferDto;
    const preorderTrip = await this.preorderTripRepository.findOne({
      where: {
        preorderTripId
      }
    });

    preorderTrip.drivers = preorderTrip.drivers.filter(driver => driver.id === driverId);
    preorderTrip.statusOfPreorderTrip = PreorderTripStatus.ACCEPTED;

    this.sendNotificationService.addCronJob(preorderTripId, preorderTrip.when)

    await this.preorderTripRepository.save(preorderTrip);

  }
}
