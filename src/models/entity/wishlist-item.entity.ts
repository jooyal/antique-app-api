import * as TypeORM from "typeorm";
import { BaseEntity, Product, Wishlist } from "./index.js";

@TypeORM.Entity()
class WishlistItem extends BaseEntity {
  @TypeORM.Column({ type: "uuid", nullable: false })
  cartId!: string;

  @TypeORM.Column({ type: "uuid", nullable: false })
  productId!: string;

  @TypeORM.Column({ type: "int", nullable: false, default: 1 })
  quantity!: number;

  @TypeORM.ManyToOne(() => Wishlist, (wishlist) => wishlist.id)
  wishlist!: TypeORM.Relation<Wishlist>;

  @TypeORM.ManyToOne(() => Product, (product) => product.id)
  product!: TypeORM.Relation<Product>;
}

export { WishlistItem };
