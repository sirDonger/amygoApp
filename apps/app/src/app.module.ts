import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SignInModule } from './auth/signin/signIn.module';
import { typeOrmConfig } from './dbconfig/typeorm.config';
import { UserModule } from './user/user.module';
import { SignUpModule } from './auth/signup/signUp.module';
import { LocationModule } from './location/location.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    SignInModule,
    SignUpModule,
    UserModule,
    LocationModule
  ],
  controllers: [],
  providers: [AppGateway]
})
export class AppModule {}
