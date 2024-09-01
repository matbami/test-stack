import { Router, Request, Response, NextFunction } from 'express';
import { validate} from '../middleware/validations';
import authenticate from '../middleware/auth.middleware';
import { SubscriptionController } from '../controllers/subscription.controller';
import { SubscriptionService } from '../services/subscription.service';
import { subscriptionSchema } from '../validations/subscription.validation';



const subscriptionRouter = Router();
const subscriptionService = new SubscriptionService(); // Create an instance of UserService
const subscriptionController = new SubscriptionController(subscriptionService)

/**
 * @route POST /api/auth/register
 * @desc Register a new user (private)
 */
subscriptionRouter.post('', authenticate, validate(subscriptionSchema),(req:Request, res: Response, next: NextFunction) =>
subscriptionController.createSubscription(req, res, next));

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT(public)
 */
subscriptionRouter.delete('/:id', (req:Request, res: Response, next: NextFunction) =>
subscriptionController.unsubscribe(req, res, next));





export default subscriptionRouter;
