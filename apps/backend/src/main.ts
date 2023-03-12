import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import appConfig from './app/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = appConfig();

  app.enableCors({ origin: config.allowedOrigins });

  await app.listen(process.env.APP_PORT);
}

bootstrap();
