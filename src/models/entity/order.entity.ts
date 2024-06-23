import * as TypeORM from "typeorm";
import { OrderStatusEnum } from "../enum/index.js";
import * as Entities from "./index.js";

@TypeORM.Entity()
class Order extends Entities.BaseEntity {
  @TypeORM.Column({ type: "uuid", nullable: false })
  userId!: string;

  @TypeORM.Column({ type: "uuid", nullable: true })
  promotionId?: string;

  @TypeORM.Column({
    type: "decimal",
    nullable: false,
    scale: 2,
    default: 0.0,
  })
  amount!: number; //excluding taxes and promotion discount

  @TypeORM.Column({
    type: "decimal",
    nullable: false,
    scale: 2,
    default: 0.0,
  })
  discountAmount!: number; //promotional discount, calculated from promotion

  @TypeORM.Column({
    type: "decimal",
    nullable: false,
    scale: 2,
    default: 0.0,
  })
  taxAmount!: number;

  @TypeORM.Column({
    type: "decimal",
    nullable: false,
    scale: 2,
    default: 0.0,
  })
  totalAmount!: number;

  @TypeORM.Column({
    type: "enum",
    enum: OrderStatusEnum,
    default: OrderStatusEnum.PROCESSING,
  })
  status!: OrderStatusEnum;

  // razorpay specific columns
  @TypeORM.Column({ type: "varchar", nullable: false, length: 32 })
  razorpayOrderId!: string;

  @TypeORM.Column({ type: "varchar", nullable: false, length: 32 })
  razorpayPaymentId!: string;

  @TypeORM.Column({ type: "varchar", nullable: false, length: 128 })
  razorpaySignature!: string;

  //  relations
  @TypeORM.ManyToOne(() => Entities.User, (user) => user.orders)
  user!: TypeORM.Relation<Entities.User>;

  @TypeORM.ManyToOne(() => Entities.Promotion, (promotion) => promotion.orders)
  promotion?: TypeORM.Relation<Entities.Promotion>;

  @TypeORM.OneToMany(() => Entities.OrderItem, (orderItem) => orderItem.order)
  orderItems?: TypeORM.Relation<Entities.OrderItem[]>;
}

export { Order };
