import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ChangePasswordService } from './change-password.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiPreconditionFailedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth/change-password')
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  @Post()
  @ApiBearerAuth()
  @ApiAcceptedResponse({
    description: 'Congrats, you successfully changed password!',
  })
  @ApiPreconditionFailedResponse({
    description: 'You should provide correct old password',
  })
  @ApiUnauthorizedResponse({ description: 'Provide valid token' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiForbiddenResponse({ description: 'Token should belongs to user' })
  @UseGuards(AuthGuard('jwt'))
  public async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Res() res,
    @Req() req,
  ): Promise<void> {
    try {
      const { id } = req.user;
      const response = await this.changePasswordService.changePassword(
        changePasswordDto,
        id,
      );

      res.status(response.status).json({ message: response.message });
    } catch (err) {
      throw new InternalServerErrorException(
        err,
        HttpStatus.BAD_REQUEST.toString(),
      );
    }
  }
}
