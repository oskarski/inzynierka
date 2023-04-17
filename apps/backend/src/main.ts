import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import appConfig from './app/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = appConfig();

  app.enableCors({ origin: config.allowedOrigins.split(',') });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.APP_PORT);
}

bootstrap();
