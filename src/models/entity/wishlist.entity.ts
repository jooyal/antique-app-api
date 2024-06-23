import * as TypeORM from "typeorm";
import * as Entities from "./index.js";

@TypeORM.Entity()
class Wishlist extends Entities.BaseEntity {
  @TypeORM.Column({ type: "uuid", nullable: false })
  userId!: string;

  @TypeORM.OneToOne(() => Entities.User, (user) => user.wishlist)
  @TypeORM.JoinColumn()
  user!: TypeORM.Relation<Entities.User>;

  @TypeORM.OneToMany(
    () => Entities.WishlistItem,
    (wishlistItem) => wishlistItem.wishlist
  )
  wishlistItems!: TypeORM.Relation<Entities.WishlistItem[]>;
}

export { Wishlist };
