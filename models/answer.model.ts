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
  import Question from './question.model';
  import User from './user.model';
  
  @Table
  class Answer extends Model<Answer> {
    @PrimaryKey
    @IsUUID(4)
    @Default(uuidv4)
    @Column({
      allowNull: false,
    })
    id: string;
  
    @Column({
      type: DataType.TEXT,
      allowNull: false,
    })
    body: string;
  
    @ForeignKey(() => Question)
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    questionId: string;
  
    @BelongsTo(() => Question)
    question: Question;
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    userId: string;
  
    @BelongsTo(() => User)
    user: User;
  
    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;
  }
  
  export default Answer;
  