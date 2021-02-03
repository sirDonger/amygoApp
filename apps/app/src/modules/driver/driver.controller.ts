import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Put,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DriverService } from './driver.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../file-upload';
import { DocumentsStatus } from './documentStatus.enum';
import { AddDocumentsDto } from './dto/addDocuments.dto';
import { PreorderTripService } from '../preorder-trip/preorder-trip.service';
import { AcceptPreorderTripDto } from '../preorder-trip/dto/acceptPreorderTrip.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('driver')
export class DriverController {
  constructor(
    private readonly driverService: DriverService,
    private readonly preorderTripService: PreorderTripService,
    private readonly uploadService: FileUploadService,
  ) {}
  @Get('/profile')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully signed in' })
  @ApiUnauthorizedResponse({ description: 'Provide valid access token' })
  public async getUser(@Req() req, @Res() res): Promise<void> {
    try {
      const user = await this.driverService.findById(req.user.id);

      if (!user) {
        throw new NotFoundException('Driver does not exist!');
      }

      delete user.id;
      delete user.password;

      return res.status(HttpStatus.OK).json(user);
    } catch (err) {
      res
        .status(err.status)
        .json({ message: err.response.message || err.message });
    }
  }

  @Post('documents')
  @ApiBearerAuth()
  @UseInterceptors(FilesInterceptor('documents'))
  @ApiConsumes('multipart/form-data')
  @ApiUnauthorizedResponse({ description: 'Provide valid access token' })
  @ApiNoContentResponse({
    description: 'Congrats, you added documents',
  })
  public async addDocuments(
    @Req() req,
    @Res() res,
    @UploadedFiles() documents,
    @Body() docs: AddDocumentsDto,
  ): Promise<void> {
    try {
      const { user } = req;

      documents.forEach((doc) => this.uploadService.isFileValid(doc));

      documents.forEach((doc) => {
        doc.originalname += Date.now();
        user.documents.push(process.env.S3_BUCKET_URL + doc.originalname);
        this.uploadService.upload(doc);
      });

      user.documentsStatus = DocumentsStatus.WAITING_FOR_CONFIRMATION;

      await this.driverService.saveChanges(user);

      res.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      res
        .status(err.status)
        .json({ message: err.response.message || err.message });
    }
  }

  @Get('preorder-trips')
  public async getPreorderTrips(@Res() res) {
    try {
      const trips = await this.preorderTripService.findAllNotAcceptedPreorderTrips();
      res.json(trips);
    } catch (err) {
      res
        .status(err.status)
        .json({ message: err.response.message || err.message });
    }
  }

  @Put('accept-preorder-trip')
  public async acceptPreorderTrip(
    @Req() req,
    @Res() res,
    @Body() trip: AcceptPreorderTripDto,
  ) {
    try {
      console.log(req.user, 'REQ. USER');
      await this.preorderTripService.acceptPreorderTrip(
        trip.preorderTripId,
        req.user,
      );

      res.json({ message: 'Preorder trip is accepted' });
    } catch (err) {
      res
        .status(err.status)
        .json({ message: err.response.message || err.message });
    }
  }

  @Put('reject-preorder-trip')
  public async rejectPreorderTrip(
    @Req() req,
    @Res() res,
    @Body() trip: AcceptPreorderTripDto,
  ) {
    try {
      await this.preorderTripService.driverRejectPreorderTrip(
        trip.preorderTripId,
      );

      res.json({ message: 'Preorder trip is declined' });
    } catch (err) {
      res
        .status(err.status)
        .json({ message: err.response.message || err.message });
    }
  }
}
