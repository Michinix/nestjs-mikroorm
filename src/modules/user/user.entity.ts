import { Property, PrimaryKey, Entity } from '@mikro-orm/decorators/legacy';
import { Opt, EntityRepositoryType } from '@mikro-orm/postgresql';
import { UserRepository } from './user.repository';

@Entity({ repository: () => UserRepository })
export class UserEntity {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id!: string;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ defaultRaw: 'now()' })
  createdAt: Date & Opt = new Date();

  @Property({ defaultRaw: 'now()', onUpdate: () => new Date() })
  updatedAt: Date & Opt = new Date();
}
