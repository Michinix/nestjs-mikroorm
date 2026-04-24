import { Property, PrimaryKey } from '@mikro-orm/decorators/legacy';
import { BaseEntity } from '@mikro-orm/core';
import { Opt } from '@mikro-orm/postgresql';

export class UserEntity extends BaseEntity {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Property({ defaultRaw: 'now()' })
  createdAt: Date & Opt = new Date();

  @Property({ defaultRaw: 'now()', onUpdate: () => new Date() })
  updatedAt: Date & Opt = new Date();
}
