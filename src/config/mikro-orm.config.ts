import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import 'dotenv/config';

export default defineConfig({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dbName: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,

  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],

  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator, SeedManager],

  migrations: {
    path: 'dist/database/migrations',
    pathTs: 'database/migrations',
    transactional: true,
    glob: '!(*.d).{js,ts}',
  },

  seeder: {
    path: 'dist/database/seeders',
    pathTs: 'database/seeders',
  },

  discovery: {
    warnWhenNoEntities: process.env.NODE_ENV === 'production',
  },

  debug: process.env.NODE_ENV !== 'production',
});
