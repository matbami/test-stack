import {
    AnswerInterface,
    AnswerUpdateInterface,
    RatingInterface,
  
  } from "../utils/interface/general.interface";
  import { AppError } from "../helper/errorHandler";
  import Answer from "../models/answer.model";
import Rating from "../models/rating.model";
import { Vote } from "../helper/enum";
  
  export class RatingService {
    private rating: typeof Rating;
    constructor() {
      this.rating = Rating;
    }
  
    async createRating(rating: RatingInterface) {
        //check if user has rated already

        const existingRating = await this.rating.findOne({
            where:{
                userId: rating.userId,
                targetId: rating.targetId
                
            }
        })

        if(existingRating){
            throw new AppError("you can't rate more than once", 400)
        }
      return await this.rating.create(rating);
    }
  
    async getRatingForQuestionOrAnswer(targetId: any, targetType: any) {
      const ratings: Rating[] = await this.rating.findAll({
        where: {
          targetId,
          targetType
        },
      });
  
      return ratings;
    }

    async getRatingsCount(targetId: any, targetType: any) {
        const upVotes = await this.rating.count({
          where: {
            targetId,
            targetType,
            value: Vote.UPVOTE
          },


        });

        const downVotes = await this.rating.count({
            where: {
              targetId,
              targetType,
              value: Vote.DOWNVOTE
            },
        });

        const voteNumber = +upVotes - +downVotes
    
        return {
            upVotes, downVotes, voteNumber
        };
      }
  
  
    async deleteRating(id: string) {
      const rating: Rating = await this.rating.findByPk(id);
      if (!rating) {
        throw new AppError("Rating not found", 404);
      }
  
      rating.destroy();
    }
  }
  