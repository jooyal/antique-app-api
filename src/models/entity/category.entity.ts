import * as TypeORM from "typeorm";
import { BaseEntity, Product } from "./index.js";

@TypeORM.Entity()
class Category extends BaseEntity {
  @TypeORM.Column({ type: "varchar", nullable: false, length: 64 })
  name!: string;

  @TypeORM.Column({ type: "varchar", nullable: true, length: 512 })
  description?: string;

  @TypeORM.Column({ type: "uuid", nullable: false })
  productId!: string;

  // relations
  @TypeORM.OneToMany(() => Product, (product) => product.id)
  products!: TypeORM.Relation<Product[]>;
}

export { Category };
