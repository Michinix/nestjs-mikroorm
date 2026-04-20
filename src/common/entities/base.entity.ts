import { Property } from '@mikro-orm/decorators/legacy';
import { Opt } from '@mikro-orm/postgresql';

export abstract class BaseEntity {
  @Property({ defaultRaw: 'now()' })
  createdAt: Date & Opt = new Date();

  @Property({ defaultRaw: 'now()', onUpdate: () => new Date() })
  updatedAt: Date & Opt = new Date();
}
