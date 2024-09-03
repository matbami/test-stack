import { Request, Response, NextFunction } from "express";
import { SubscriptionService } from "../services/subscription.service";
import { AuthRequest } from "../middleware/auth.middleware";

export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  async createSubscription(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const body = { ...req.body, userId: req.user.id };
      const subscription = await this.subscriptionService.createSubscription(body);
      return res.status(201).json({
        message: "Subscription created successfully",
        data: subscription,
      });
    } catch (error) {
      next(error);
    }
  }

  async unsubscribe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await this.subscriptionService.unSubscribe(req.params.id);
      return res.status(200).json({
        message: "Subscription cancelled successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
