import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChangeProfileModule } from './modules/change-profile/change-profile.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LocationModule } from './modules/location/location.module';
import { AppGateway } from './app.gateway';
import { typeOrmConfig } from './config/dbconfig';
import { DriverModule } from './modules/driver/driver.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ChangeProfileModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    LocationModule,
    DriverModule,
    AdminModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
