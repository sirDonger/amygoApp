import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  //TODO specify port
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      whitelist: true,
    }),
  );
  const configService = app.get('ConfigService');

  const config = new DocumentBuilder()
    .setTitle('API endpoints description')
    .setDescription('API endpoints description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('PORT'));
})();
