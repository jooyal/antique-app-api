import * as TypeORM from "typeorm";
import * as Entities from "./index.js";

@TypeORM.Entity()
class Category extends Entities.BaseEntity {
  @TypeORM.Column({ type: "uuid", nullable: false })
  productId!: string;

  @TypeORM.Column({ type: "varchar", nullable: false, length: 64 })
  name!: string;

  @TypeORM.Column({ type: "varchar", nullable: true, length: 512 })
  description?: string;

  // relations
  @TypeORM.OneToMany(() => Entities.Product, (product) => product.category, {
    cascade: true,
  })
  products!: TypeORM.Relation<Entities.Product[]>;
}

export { Category };
