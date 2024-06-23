import { randomUUID } from "crypto";
import * as TypeORM from "typeorm";

abstract class BaseEntity {
  @TypeORM.PrimaryColumn({ type: "uuid" })
  id!: string;

  @TypeORM.Column({ type: "timestamp" })
  createdAt!: Date;

  @TypeORM.Column({ type: "timestamp" })
  updatedAt!: Date;

  @TypeORM.BeforeInsert()
  setIdAndCreatedAt() {
    this.id = randomUUID({ disableEntropyCache: true });
    this.createdAt = new Date();
  }

  @TypeORM.BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}

export { BaseEntity };
