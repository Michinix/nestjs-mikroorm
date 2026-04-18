import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConsoleLogger } from '@nestjs/common';
import { logger } from '@mikro-orm/nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      timestamp: true,
      context: 'NestApplication',
      prefix: 'NestApplication',
    }),
  });

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  app.enableShutdownHooks();

  const config = app.get(ConfigService);
  const port = config.getOrThrow<string>('APP_PORT');

  await app.listen(port, '0.0.0.0');

  logger.log(
    `Application is running on: http://${config.getOrThrow('APP_HOST')}:${port}`,
  );
}

bootstrap();
