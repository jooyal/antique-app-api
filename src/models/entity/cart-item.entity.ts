import * as TypeORM from "typeorm";
import * as Entities from "./index.js";

@TypeORM.Entity()
class CartItem extends Entities.BaseEntity {
  @TypeORM.Column({ type: "uuid", nullable: false })
  cartId!: string;

  @TypeORM.Column({ type: "uuid", nullable: false })
  productId!: string;

  @TypeORM.Column({ type: "int", nullable: false, default: 1 })
  quantity!: number;

  @TypeORM.ManyToOne(() => Entities.Cart, (cart) => cart.cartItems)
  cart!: TypeORM.Relation<Entities.Cart>;

  @TypeORM.ManyToOne(() => Entities.Product, (product) => product.cartItems)
  product!: TypeORM.Relation<Entities.Product>;
}

export { CartItem };
