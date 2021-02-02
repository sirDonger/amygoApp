import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PreorderTripService } from './preorder-trip.service';
import { PreorderTripDto } from './dto/preorder-trip.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user/preorder-trip')
export class PreorderTripController {
  constructor(
    private readonly userService: UserService,
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
      console.log('contr');

      res.status(HttpStatus.CREATED).json({ message: 'Preorder created' });
    } catch (err) {
      console.log(err);
      res.status(err.status).json({ message: err.detail || err.message });
    }
  }
}
