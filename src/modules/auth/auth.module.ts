import { Module } from '@nestjs/common';
import { SignInModule } from './signin/signIn.module';
import { SignUpModule } from './signup/signUp.module';
import { ChangePasswordModule } from './change-password/change-password.module';

@Module({
  imports: [SignInModule, SignUpModule, ChangePasswordModule],
  exports: [SignInModule, SignUpModule, ChangePasswordModule],
})
export class AuthModule {}
