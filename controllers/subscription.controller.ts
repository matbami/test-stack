import { Request, Response, NextFunction } from "express";
import { SubscriptionService } from "../services/subscription.service";
import { AuthRequest } from "../middleware/auth.middleware";

export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  async createSubscription(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      body.userId = req.user.id;
      const subscription = await this.subscriptionService.createSubscription(req.body);
      return res.json(subscription);
    } catch (error) {
      next(error);
    }
  }

  async unsubscribe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await this.subscriptionService.unSubscribe(req.params.id);
      return res.json({ message: "Subscription cancelled" });
    } catch (error) {
      next(error);
    }
  }

}
