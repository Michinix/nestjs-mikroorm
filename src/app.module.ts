import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      driver: PostgreSqlDriver,
      useFactory: (config: ConfigService) => ({
        driver: PostgreSqlDriver,
        host: config.getOrThrow('DB_HOST'),
        port: config.getOrThrow('DB_PORT'),
        dbName: config.getOrThrow('DB_NAME'),
        user: config.getOrThrow('DB_USER'),
        password: config.getOrThrow('DB_PASSWORD'),
        entities: ['dist/**/*.entity.js'],
        entitiesTs: ['src/**/*.entity.ts'],
        metadataProvider: TsMorphMetadataProvider,
        migrations: {
          path: 'dist/database/migrations',
          pathTs: 'src/database/migrations',
          glob: '!(*.d).{js,ts}',
          transactional: true,
          snapshot: true,
        },
        extensions: [Migrator, SeedManager],
        autoMigrate: config.getOrThrow('APP_ENV') === 'development',
        debug: config.getOrThrow('APP_ENV') === 'development',
      }),
    }),
    ProductModule,
  ],
})
export class AppModule {}
