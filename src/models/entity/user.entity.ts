import * as TypeORM from "typeorm";
import { UserRoleEnum } from "../enum/index.js";
import * as Entities from "./index.js";

@TypeORM.Entity()
class User extends Entities.BaseEntity {
  @TypeORM.Column({ type: "varchar", nullable: false, length: 64 })
  firstName!: string;

  @TypeORM.Column({ type: "varchar", nullable: true, length: 64 })
  lastName?: string;

  @TypeORM.Column({ type: "varchar", nullable: false, length: 128 })
  emailId!: string;

  @TypeORM.Column({ type: "varchar", nullable: false, length: 10 })
  phone_number!: string;

  @TypeORM.Column({ type: "varchar", nullable: true, length: 512 })
  address?: string;

  @TypeORM.Column({ type: "varchar", nullable: false, length: 7 })
  pincode!: string;

  @TypeORM.Column({
    type: "enum",
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role!: UserRoleEnum;

  @TypeORM.Column("boolean", { nullable: false, default: false })
  isBanned!: boolean;

  //  relation
  @TypeORM.OneToOne(() => Entities.Cart, (cart) => cart.user)
  cart!: TypeORM.Relation<Entities.Cart>;

  @TypeORM.OneToOne(() => Entities.Wishlist, (wishlist) => wishlist.user)
  wishlist!: TypeORM.Relation<Entities.Wishlist>;

  @TypeORM.OneToMany(
    () => Entities.UserFeedback,
    (userFeedback) => userFeedback.user,
    { cascade: true }
  )
  userFeedbacks!: TypeORM.Relation<Entities.UserFeedback[]>;

  @TypeORM.OneToMany(() => Entities.Order, (order) => order.user, {
    cascade: true,
  })
  orders!: TypeORM.Relation<Entities.Order[]>;
}

export { User };
