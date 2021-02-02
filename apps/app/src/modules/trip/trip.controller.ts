import { Controller, Post, HttpStatus, UseGuards, Body, Res, Req } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiConsumes,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
    ApiConflictResponse
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TripService } from './trip.service';
import { DriverService } from '../driver/driver.service';
import { TripDto } from './dto/trip.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('trip')
export class TripController {
    constructor(
        private readonly tripService: TripService,
        private readonly driverService: DriverService
    ){}

    @Post('create')
    @ApiBearerAuth()
    async createTrip(
        @Body() tripDto: TripDto,
        @Res() res,
        @Req() req
    ){
        try{
            await this.tripService.createTrip(tripDto, req.user.id);
            return res.status(HttpStatus.CREATED).json({
                message: "Trip was successfully created",
                status: 201
            })
        } catch(err){
            res
                .status(HttpStatus.CONFLICT)
                .json({ message: err.detail || err.message });
        }
    }
}