import * as TypeORM from "typeorm";
import { BaseEntity, User, WishlistItem } from "./index.js";

@TypeORM.Entity()
class Wishlist extends BaseEntity {
  @TypeORM.Column({ type: "uuid", nullable: false })
  userId!: string;

  @TypeORM.OneToOne(() => User, (user) => user.id)
  @TypeORM.JoinColumn()
  user!: TypeORM.Relation<User>;

  @TypeORM.OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.id)
  wishlistItems!: TypeORM.Relation<WishlistItem[]>;
}

export { Wishlist };
