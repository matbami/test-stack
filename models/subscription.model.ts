import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    Default,
    IsUUID,
    CreatedAt,
    UpdatedAt,
  } from 'sequelize-typescript';
  import { v4 as uuidv4 } from 'uuid';
  import User from './user.model';
  import Question from './question.model';
  
  @Table
  class Subscription extends Model<Subscription> {
    @PrimaryKey
    @IsUUID(4)
    @Default(uuidv4)
    @Column({
      allowNull: false,
    })
    id: string;
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    userId: string;
  
    @BelongsTo(() => User)
    user: User;
  
    @ForeignKey(() => Question)
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    questionId: string;
  
    @BelongsTo(() => Question)
    question: Question;
  
    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;
  }
  
  export default Subscription;
  