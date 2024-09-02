import { SubscriptionInterface } from "../utils/interface/general.interface";
import { AppError } from "../helper/errorHandler";
import Subscription from "../models/subscription.module";

export class SubscriptionService {
  private subscription: typeof Subscription;
  constructor() {
    this.subscription = Subscription;
  }

  async createSubscription(subscriptionDetails: SubscriptionInterface) {
    //check if user has rated already

    const subscription: Subscription = await this.subscription.findOne({
      where: {
        userId: subscriptionDetails.userId,
        questionId: subscriptionDetails.questionId,
      },
    });
    if (subscription) {
      throw new AppError("You have subscribed to this question already", 400);
    }

    return await this.subscription.create(subscriptionDetails);
  }

  async getSubscriptionByQuestionId(questionId: string, userId: string) {
    //check if user has rated already

    const subscription: Subscription = await this.subscription.findOne({
      where: {
        userId,
        questionId
      },
    });

    

    return subscription
  }

  async unSubscribe(id: string) {
    //check if user has rated already

    const subscription: Subscription = await this.subscription.findByPk(id);
    if (!subscription) {
      throw new AppError("Subscription not found", 404);
    }

    subscription.destroy();
  }

  // async getRatingForQuestionOrAnswer(targetId: any, targetType: any) {
  //   const ratings: Rating[] = await this.rating.findAll({
  //     where: {
  //       targetId,
  //       targetType
  //     },
  //   });

  //   return ratings;
  // }

  // async getRatingsCount(targetId: any, targetType: any) {
  //     const upVotes = await this.rating.count({
  //       where: {
  //         targetId,
  //         targetType,
  //         value: VoteEnum.UPVOTE
  //       },

  //     });

  //     const downVotes = await this.rating.count({
  //         where: {
  //           targetId,
  //           targetType,
  //           value: VoteEnum.DOWNVOTE
  //         },
  //     });

  //     const voteNumber = +upVotes - +downVotes

  //     return {
  //         upVotes, downVotes, voteNumber
  //     };
  //   }

  // async deleteRating(id: string) {
  //   const rating: Rating = await this.rating.findByPk(id);
  //   if (!rating) {
  //     throw new AppError("Rating not found", 404);
  //   }

  //   rating.destroy();
  // }
}
