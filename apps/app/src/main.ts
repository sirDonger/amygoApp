import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as rateLimit from 'express-rate-limit';
import {constant} from './constants/'

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  //TODO specify port
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  const configService = app.get('ConfigService');

  app.use(
    rateLimit({
      windowMs: constant.RATE_LIMIT_SECONDS,
      max: constant.RATE_LIMIT_MAX_REQUESTS,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API endpoints description')
    .setDescription('API endpoints description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8083);
})();
