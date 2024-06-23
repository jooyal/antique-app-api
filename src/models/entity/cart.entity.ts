import * as TypeORM from "typeorm";
import { BaseEntity, CartItem, User } from "./index.js";

@TypeORM.Entity()
class Cart extends BaseEntity {
  @TypeORM.Column({ type: "uuid", nullable: false })
  userId!: string;

  @TypeORM.OneToOne(() => User, (user) => user.id)
  @TypeORM.JoinColumn()
  user!: TypeORM.Relation<User>;

  @TypeORM.OneToMany(() => CartItem, (cartItem) => cartItem.id)
  cartItems!: TypeORM.Relation<CartItem[]>;
}

export { Cart };
