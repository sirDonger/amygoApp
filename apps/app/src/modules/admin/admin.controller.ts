import { Body, Controller, Get, Put, Res } from '@nestjs/common';
import { DriverService } from '../driver/driver.service';
import { DocumentsStatus } from '../driver/documentStatus.enum';
import { ConfirmDocumentsDto } from './dto/confirm-documents.dto';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(private readonly driverService: DriverService) {}

  @Get('drivers/documents-for-confirmation')
  private async getDriversWaitingForConfirmation(@Res() res) {
    try {
      const drivers = await this.driverService.getDriversWaitingForConfirmation();

      res.json(drivers);
    } catch (err) {
      res
        .status(err.status)
        .json({ message: err.response.message || err.message });
    }
  }

  @Put('driver/confirm-documents')
  @ApiBadRequestResponse({ description: 'userId should not be empty' })
  @ApiOkResponse({ description: 'Documents confirmed!' })
  private async confirmDocuments(
    @Res() res,
    @Body() confirmDocuments: ConfirmDocumentsDto,
  ) {
    try {
      const driver = await this.driverService.findById(confirmDocuments.userId);
      driver.documentsStatus = DocumentsStatus.CONFIRMED;

      await this.driverService.saveChanges(driver);

      res.json({ message: 'Documents confirmed!' });
    } catch (err) {
      res
        .status(err.status)
        .json({ message: err.response.message || err.message });
    }
  }
}
