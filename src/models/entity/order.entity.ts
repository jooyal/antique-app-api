import * as TypeORM from "typeorm";
import { OrderStatusEnum } from "../enum/index.js";
import * as Entities from "./index.js";

@TypeORM.Entity()
class Order extends Entities.BaseEntity {
  @TypeORM.Column({ type: "uuid", nullable: false })
  userId!: string;

  @TypeORM.Column({ type: "uuid", nullable: true })
  discountId?: string;

  @TypeORM.Column({
    type: "decimal",
    nullable: false,
    scale: 2,
    default: 0.0,
  })
  amount!: number; //excluding taxes and discount

  @TypeORM.Column({
    type: "decimal",
    nullable: false,
    scale: 2,
    default: 0.0,
  })
  discountAmount!: number; //promotional discount

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

  @TypeORM.ManyToOne(() => Entities.Discount, (discount) => discount.orders)
  discount?: TypeORM.Relation<Entities.Discount>;

  @TypeORM.OneToMany(() => Entities.OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
  })
  orderItems?: TypeORM.Relation<Entities.OrderItem[]>;
}

export { Order };
