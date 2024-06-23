import * as TypeORM from "typeorm";
import { BaseEntity, User } from "./index.js";

@TypeORM.Entity()
class UserFeedback extends BaseEntity {
  @TypeORM.Column({ type: "varchar", nullable: false, length: 4098 })
  message!: string;

  @TypeORM.Column({ type: "uuid", nullable: false })
  userId!: string;

  @TypeORM.ManyToOne(() => User, (user) => user.id)
  user!: TypeORM.Relation<User>;
}

export { UserFeedback };
