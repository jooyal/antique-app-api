import * as TypeORM from "typeorm";
import { DiscountTypeEnum } from "../enum/index.js";
import * as Entities from "./index.js";

@TypeORM.Entity()
class Discount extends Entities.BaseEntity {
  @TypeORM.Column({ type: "varchar", nullable: false, length: 64 })
  name!: string;

  @TypeORM.Column({ type: "varchar", nullable: true, length: 128 })
  description?: string;

  @TypeORM.Column({ type: "timestamp", nullable: false })
  startDate!: Date;

  @TypeORM.Column({ type: "timestamp", nullable: false })
  endDate!: Date;

  @TypeORM.Column({
    type: "enum",
    enum: DiscountTypeEnum,
    default: DiscountTypeEnum.PERCENTAGE,
  })
  discountType!: DiscountTypeEnum;

  @TypeORM.Column({
    type: "decimal",
    nullable: false,
    precision: 6,
    scale: 2,
    default: 0.0,
  })
  discountValue!: number;

  // should there be a cap for discount amount, maximum count?
  //  relations
  @TypeORM.OneToMany(() => Entities.Order, (order) => order.discount, {
    cascade: true,
  })
  orders?: TypeORM.Relation<Entities.Order[]>;
}

export { Discount };
