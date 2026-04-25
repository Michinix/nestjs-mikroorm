import { Migration } from '@mikro-orm/migrations';

export class Migration20260425112924_init_pgcrypto extends Migration {
  override up(): void | Promise<void> {
    this.addSql(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
  }

  override down(): void | Promise<void> {
    this.addSql(`DROP EXTENSION IF EXISTS "pgcrypto";`);
  }
}
