import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

export default defineConfig({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: join(process.cwd(), 'database/migrations'),
    pathTs: join(process.cwd(), 'database/migrations'),
    glob: '!(*.d).{js,ts}',
    transactional: true,
    snapshot: true,
  },
  seeder: {
    path: join(process.cwd(), 'database/seeders'),
    pathTs: join(process.cwd(), 'database/seeders'),
  },
  extensions: [Migrator, SeedManager],
  debug: process.env.APP_ENV !== 'production',
});
