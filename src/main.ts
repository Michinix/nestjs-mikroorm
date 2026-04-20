import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConsoleLogger, RequestMethod } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      timestamp: true,
      context: 'NestApplication',
      prefix: 'NestApplication',
    }),
  });

  const orm = app.get(MikroORM);
  const config = app.get(ConfigService);

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  app.setGlobalPrefix('api', {
    exclude: [
      { path: '', method: RequestMethod.GET },
      { path: 'health', method: RequestMethod.GET },
    ],
  });

  app.enableShutdownHooks();

  app.useGlobalInterceptors();

  await orm.schema.ensureDatabase();
  await orm.schema.update();

  await app.listen(config.getOrThrow<string>('APP_PORT'), '0.0.0.0');
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
