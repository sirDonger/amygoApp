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
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DriverService } from './driver.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesUploadDto } from './dto/filesUpload.dto';
import { CarDto } from './dto/car.dto';

@Controller('driver')
export class DriverController {
  constructor(
    private readonly driverService: DriverService,
  ) {}
  @Get('/profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
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
  @UseInterceptors(FileInterceptor('documents'))
  @ApiConsumes('multipart/form-data')
  public async addDocuments(@UploadedFiles() documents: FilesUploadDto) {
    console.log(documents);
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
