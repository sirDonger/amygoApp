import { Module } from '@nestjs/common';
import { SignInController } from './signInController';
import { SignInService } from './signin.service';

@Module({
  providers: [SignInService],
  controllers: [SignInController],
})
export class SignInModule {}
