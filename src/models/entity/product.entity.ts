import * as TypeORM from "typeorm";
import * as Entities from "./index.js";

@TypeORM.Entity()
class Product extends Entities.BaseEntity {
  @TypeORM.Column({ type: "uuid", nullable: false })
  categoryId!: string;

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

  @TypeORM.Column({ type: "varchar", array: true, default: [] })
  keywords?: string[];

  //  relations
  @TypeORM.ManyToOne(() => Entities.Category, (category) => category.products)
  category!: TypeORM.Relation<Entities.Category>;

  @TypeORM.OneToMany(() => Entities.CartItem, (cartItem) => cartItem.product)
  cartItems!: TypeORM.Relation<Entities.CartItem[]>;

  @TypeORM.OneToMany(
    () => Entities.WishlistItem,
    (wishlistItem) => wishlistItem.product
  )
  wishlistItems!: TypeORM.Relation<Entities.WishlistItem[]>;

  @TypeORM.OneToMany(() => Entities.OrderItem, (orderItem) => orderItem.product)
  orderItems!: TypeORM.Relation<Entities.CartItem[]>;
}

export { Product };
