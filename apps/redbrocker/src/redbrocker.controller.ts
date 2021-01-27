import { Controller, Logger, Body } from '@nestjs/common';
import { RedbrockerService } from './redbrocker.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RedbrockerController {
  private logger = new Logger('RedbrockerController');
  constructor(private readonly redappService: RedbrockerService) {}

  @MessagePattern('add')
  async accumulate(@Body('data') data: number[]){
    this.logger.log('Adding ' + data.toString());
    return this.redappService.accumulate(data);
  }

  @MessagePattern('lastLocation')
  async getLocation(data: object): Promise<object>{
    this.logger.log('Last location: ' + data);
    console.log('start');
    return this.redappService.getLocation(data);
  }
}