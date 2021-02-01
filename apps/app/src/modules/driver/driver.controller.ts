import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesUploadDto } from './dto/filesUpload.dto';
import { CarDto } from './dto/car.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../file-upload';
import { DocumentsStatus } from './documentStatus.enum';

@UseGuards(AuthGuard('jwt'))
@Controller('driver')
export class DriverController {
  constructor(
    private readonly driverService: DriverService,
    private readonly uploadService: FileUploadService,
  ) {}
  @Get('/profile')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully signed in' })
  @ApiUnauthorizedResponse({ description: 'Provide valid access token' })
  public async getUser(@Req() req, @Res() res): Promise<void> {
    const user = await this.driverService.findById(req.user.id);

    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    delete user.id;
    delete user.password;

    return res.status(HttpStatus.OK).json(user);
  }

  @Post('add/documents')
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
  ) {
    const { user } = req;

    documents.forEach((doc) => this.uploadService.isFileValid(doc));

    documents.forEach((doc) => {
      doc.originalname += Date.now();
      user.documents.push(process.env.S3_BUCKET_URL + doc.originalname);
      this.uploadService.upload(doc);
    });

    user.documentsStatus = DocumentsStatus.WAITING_FOR_CONFIRMATION;

    await this.driverService.addDocuments(user);

    res.status(HttpStatus.NO_CONTENT);
  }

  @Post('add/car')
  public async createCar(
    @Body() carDto: CarDto,
    @Res() res
  ){
    try{
      await this.driverService.createCar(carDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Car successfully created',
        status: 201
      }) 
    } catch(err){
      return {message: err, status: res.status}
    }
  }
}
