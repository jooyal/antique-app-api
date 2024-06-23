import * as TypeORM from "typeorm";
import * as Entities from "./index.js";

@TypeORM.Entity()
class UserFeedback extends Entities.BaseEntity {
  @TypeORM.Column({ type: "varchar", nullable: false, length: 4098 })
  message!: string;

  @TypeORM.Column({ type: "uuid", nullable: false })
  userId!: string;

  @TypeORM.ManyToOne(() => Entities.User, (user) => user.userFeedbacks)
  user!: TypeORM.Relation<Entities.User>;
}

export { UserFeedback };
