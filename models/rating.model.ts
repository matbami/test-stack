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
  import Answer from './answer.model';
  import { Vote,TargetType } from '../helper/enum';
  
  @Table
  class Rating extends Model<Rating> {
    @PrimaryKey
    @IsUUID(4)
    @Default(uuidv4)
    @Column({
      allowNull: false,
    })
    id: string;
  
    @Column({
      type: DataType.ENUM(Vote.UPVOTE, Vote.DOWNVOTE),
      allowNull: false,
    })
    value: string;
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    userId: string;
  
    @BelongsTo(() => User)
    user: User;
  
    @Column({
      type: DataType.ENUM(TargetType.QUESTION,TargetType.ANSWER),
      allowNull: false,
    })
    targetType: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    targetId: string;
  
    @BelongsTo(() => Question, { foreignKey: 'targetId', constraints: false })
    question: Question;
  
    @BelongsTo(() => Answer, { foreignKey: 'targetId', constraints: false })
    answer: Answer;
  
    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;
  }
  
  export default Rating;
  