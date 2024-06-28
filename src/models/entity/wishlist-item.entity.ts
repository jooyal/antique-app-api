import * as TypeORM from "typeorm";
import * as Entities from "./index.js";

@TypeORM.Entity()
class WishlistItem extends Entities.BaseEntity {
  @TypeORM.Column({ type: "uuid", nullable: false })
  cartId!: string;

  @TypeORM.Column({ type: "uuid", nullable: false })
  productId!: string;

  @TypeORM.Column({ type: "int", nullable: false, default: 1 })
  quantity!: number;

  @TypeORM.ManyToOne(() => Entities.Wishlist, (wishlist) => wishlist.wishlistItems)
  wishlist!: TypeORM.Relation<Entities.Wishlist>;

  @TypeORM.ManyToOne(() => Entities.Product, (product) => product.wishlistItems)
  product!: TypeORM.Relation<Entities.Product>;
}

export { WishlistItem };
