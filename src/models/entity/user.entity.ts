import * as TypeORM from "typeorm";
import { UserRoleEnum } from "../enum/index.js";
import { BaseEntity, Cart, UserFeedback } from "./index.js";

@TypeORM.Entity()
class User extends BaseEntity {
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
  @TypeORM.OneToOne(() => Cart, (cart) => cart.id)
  cart!: TypeORM.Relation<Cart>;

  @TypeORM.OneToMany(() => UserFeedback, (userFeedback) => userFeedback.id)
  userFeedbacks!: TypeORM.Relation<UserFeedback[]>;
}

export { User };
