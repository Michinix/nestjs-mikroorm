import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';
@Entity()
export class Product {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  price!: number;

  @Property()
  description!: string;
}
