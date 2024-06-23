import * as TypeORM from "typeorm";
import { BaseEntity, Cart, Product } from "./index.js";

@TypeORM.Entity()
class CartItem extends BaseEntity {
  @TypeORM.Column({ type: "uuid", nullable: false })
  cartId!: string;

  @TypeORM.Column({ type: "uuid", nullable: false })
  productId!: string;

  @TypeORM.Column({ type: "int", nullable: false, default: 1 })
  quantity!: number;

  @TypeORM.ManyToOne(() => Cart, (cart) => cart.id)
  cart!: TypeORM.Relation<Cart>;

  @TypeORM.ManyToOne(() => Product, (product) => product.id)
  product!: TypeORM.Relation<Product>;
}

export { CartItem };
