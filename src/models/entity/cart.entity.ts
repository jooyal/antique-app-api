import * as TypeORM from "typeorm";
import * as Entities from "./index.js";

@TypeORM.Entity()
class Cart extends Entities.BaseEntity {
  @TypeORM.Column({ type: "uuid", nullable: false })
  userId!: string;

  @TypeORM.OneToOne(() => Entities.User, (user) => user.cart)
  @TypeORM.JoinColumn()
  user!: TypeORM.Relation<Entities.User>;

  @TypeORM.OneToMany(() => Entities.CartItem, (cartItem) => cartItem.cart, {
    cascade: true,
  })
  cartItems!: TypeORM.Relation<Entities.CartItem[]>;
}

export { Cart };
