import * as TypeORM from "typeorm";
import { BaseEntity, CartItem, Category } from "./index.js";

@TypeORM.Entity()
class Product extends BaseEntity {
  @TypeORM.Column({ type: "varchar", nullable: false, length: 64 })
  name!: string;

  @TypeORM.Column({ type: "varchar", nullable: true, length: 128 })
  description?: string;

  // to enable and disable the product
  @TypeORM.Column({ type: "boolean", nullable: false, default: true })
  isActive!: boolean;

  // soft deletion
  @TypeORM.Column({ type: "boolean", nullable: false, default: false })
  isArchived!: boolean;

  @TypeORM.Column({ type: "decimal", nullable: false, scale: 2, default: 0.0 })
  price!: number;

  @TypeORM.Column({
    type: "decimal",
    nullable: false,
    precision: 6,
    scale: 2,
    default: 0.0,
  })
  tax!: number;

  @TypeORM.Column({ type: "uuid", nullable: false })
  categoryId!: string;

  @TypeORM.Column({ type: "varchar", array: true, default: [] })
  keywords?: string[];

  //  relations
  @TypeORM.ManyToOne(() => Category, (category) => category.id)
  category!: TypeORM.Relation<Category>;

  @TypeORM.OneToMany(() => CartItem, (cartItem) => cartItem.id)
  cartItems!: TypeORM.Relation<CartItem[]>;
}

export { Product };
