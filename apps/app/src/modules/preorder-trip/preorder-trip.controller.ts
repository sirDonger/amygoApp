import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post, Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PreorderTripService } from './preorder-trip.service';
import { PreorderTripDto } from './dto/preorder-trip.dto';
import { AuthGuard } from '@nestjs/passport';
import SendNotificationService from './sendNotification.service';
import {ConfirmDriverOfferDto} from "./dto/confirmDriverOffer.dto";


@Controller('user/preorder-trip')
export class PreorderTripController {
  constructor(
    private readonly userService: UserService,
    private readonly sendNotification: SendNotificationService,
    private readonly preorderTripService: PreorderTripService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async preorderTrip(
    @Body() preorderTripDto: PreorderTripDto,
    @Res() res,
    @Req() req,
  ) {
    try {
      preorderTripDto.userId = req.user.id;

      await this.preorderTripService.preorder(preorderTripDto);

      res.status(HttpStatus.CREATED).json({ message: 'Preorder created' });
    } catch (err) {
      res.status(err.status).json({ message: err.detail || err.message });
    }
  }

  @Get('offers')
  @UseGuards(AuthGuard('jwt'))
  async getOffers(@Res() res, @Req() req) {
    try {
      const offers = await this.preorderTripService.getAllOffers(req.user.id);

      res.json(offers);
    } catch (err) {
      console.log(err);
      res.status(err.status).json({ message: err.detail || err.message });
    }
  }

  @Put('confirmDriver')
  @UseGuards(AuthGuard('jwt'))
  async confirmDriver(
      @Body() confirmDriverOfferDto: ConfirmDriverOfferDto,
      @Res() res,
      @Req() req,
  ) {
    try {
      confirmDriverOfferDto.userId = req.user.id;
      console.log(confirmDriverOfferDto)

      await this.preorderTripService.confirmDriver(confirmDriverOfferDto);

      res.json({ message: 'Preorder accepted' });
    } catch (err) {
      console.log(err)
      res.status(err.status).json({ message: err.detail || err.message });
    }
  }
}
