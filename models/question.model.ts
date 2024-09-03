import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  Default,
  IsUUID,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import User from "./user.model";
import { v4 as uuidv4 } from "uuid";
import Answer from "./answer.model";
import Rating from "./rating.model";
import Subscription from "./subscription.model";
// import { Answer } from './answer';
// import { Rating } from './rating';
// import { Subscription } from './subscription';

@Table
class Question extends Model<Question> {
  @PrimaryKey
  @IsUUID(4)
  @Default(uuidv4) // Auto-generate UUID if not provided
  @Column({
    allowNull: false,
  })
  id: string;

  @Column({
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}

export default Question;
