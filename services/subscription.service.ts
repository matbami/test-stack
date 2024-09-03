import { SubscriptionInterface } from "../utils/interface/general.interface";
import { AppError } from "../helper/errorHandler";
import Subscription from "../models/subscription.model";

export class SubscriptionService {
  private subscription: typeof Subscription;

  constructor() {
    this.subscription = Subscription;
  }

  async createSubscription(subscriptionDetails: SubscriptionInterface) {
    // Check if user is already subscribed
    const existingSubscription = await this.subscription.findOne({
      where: {
        userId: subscriptionDetails.userId,
        questionId: subscriptionDetails.questionId,
      },
    });

    if (existingSubscription) {
      throw new AppError("You have already subscribed to this question", 400);
    }

    return await this.subscription.create(subscriptionDetails);
  }

  async getSubscriptionByQuestionId(questionId: string, userId: string) {
    return await this.subscription.findOne({
      where: {
        userId,
        questionId,
      },
    });
  }

  async unSubscribe(id: string) {
    const subscription = await this.subscription.findByPk(id);
    if (!subscription) {
      throw new AppError("Subscription not found", 404);
    }

    await subscription.destroy();
  }
}
