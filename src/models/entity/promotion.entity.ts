import * as TypeORM from "typeorm";
import { PromotionDiscountTypeEnum } from "../enum/index.js";
import * as Entities from "./index.js";

@TypeORM.Entity()
class Promotion extends Entities.BaseEntity {
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
    enum: PromotionDiscountTypeEnum,
    default: PromotionDiscountTypeEnum.PERCENTAGE,
  })
  discountType!: PromotionDiscountTypeEnum;

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
  @TypeORM.OneToMany(() => Entities.Order, (order) => order.promotion)
  orders?: TypeORM.Relation<Entities.Order[]>;
}

export { Promotion };
