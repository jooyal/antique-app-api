import * as TypeORM from "typeorm";
import * as Entities from "./index.js";

@TypeORM.Entity()
class OrderItem extends Entities.BaseEntity {
  @TypeORM.Column({ type: "uuid", nullable: false })
  orderId!: string;

  @TypeORM.Column({ type: "uuid", nullable: false })
  productId!: string;

  @TypeORM.Column({ type: "int", nullable: false, default: 1 })
  quantity!: number;

  @TypeORM.ManyToOne(() => Entities.Order, (order) => order.orderItems)
  order!: TypeORM.Relation<Entities.Order>;

  @TypeORM.ManyToOne(() => Entities.Product, (product) => product.orderItems)
  product!: TypeORM.Relation<Entities.Product>;
}

export { OrderItem };
