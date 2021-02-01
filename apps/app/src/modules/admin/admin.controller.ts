import { Controller, Get, Res } from '@nestjs/common';
import { DriverService } from '../driver/driver.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly driverService: DriverService) {}

  @Get('drivers/documentsConfirmation')
  private async getDriversWaitingForConfirmation(@Res() res) {
    const drivers = await this.driverService.getDriversWaitingForConfirmation();

    res.json(drivers);
  }
}
