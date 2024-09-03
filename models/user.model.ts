import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  Unique,
  CreatedAt,
  UpdatedAt,
  IsUUID,
  Default,
} from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';
import Answer from "./answer.model";
import Rating from "./rating.model";
import Subscription from "./subscription.model";
import Question from "./question.model";

@Table
class User extends Model {

  @PrimaryKey
  @IsUUID(4)
  @Default(uuidv4)
  @Column({ allowNull: false })
  id: string;

  @Unique
  @Column({ allowNull: false })
  username: string;

  @Unique
  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => Answer)
  answers!: Answer[];

  @HasMany(() => Rating)
  ratings!: Rating[];

  @HasMany(() => Subscription)
  subscriptions!: Subscription[];

  @HasMany(() => Question)
  questions!: Question[];

}

export default User;
