import { Module } from '@nestjs/common';
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';

@Module({
  providers: [SigninService],
  controllers: [SigninController],
})
export class SigninModule {}
