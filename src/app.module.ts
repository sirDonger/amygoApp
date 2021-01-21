import { TypeOrmModule } from '@nestjs/typeorm';
import { SigninModule } from './auth/signin/signin.module';
import { typeOrmConfig } from './dbconfig/typeorm.config';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './auth/signup/signup.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SigninModule,
    SignupModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
