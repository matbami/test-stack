import { Router, Request, Response, NextFunction } from 'express';
import { validate } from '../middleware/validations';
import authenticate from '../middleware/auth.middleware';
import { SubscriptionController } from '../controllers/subscription.controller';
import { SubscriptionService } from '../services/subscription.service';
import { subscriptionSchema } from '../validations/subscription.validation';

const subscriptionRouter = Router();
const subscriptionService = new SubscriptionService(); // Create an instance of SubscriptionService
const subscriptionController = new SubscriptionController(subscriptionService);

/**
 * @route POST /api/subscriptions
 * @desc Create a new subscription (authenticated)
 */
subscriptionRouter.post('', authenticate, validate(subscriptionSchema), (req: Request, res: Response, next: NextFunction) =>
  subscriptionController.createSubscription(req, res, next)
);

/**
 * @route DELETE /api/subscriptions/:id
 * @desc Unsubscribe from a subscription by ID (authenticated)
 */
subscriptionRouter.delete('/:id', authenticate, (req: Request, res: Response, next: NextFunction) =>
  subscriptionController.unsubscribe(req, res, next)
);

export default subscriptionRouter;
