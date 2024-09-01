import { Router, Request, Response, NextFunction } from 'express';
import { validate} from '../middleware/validations';
import authenticate from '../middleware/auth.middleware';
import { createAnswerSchema, updateAnswerSchema } from '../validations/answer.validation';
import { RatingService } from '../services/ratings.service';
import { RatingController } from '../controllers/rating.controller';
import { createRatingSchema } from '../validations/rating.validation';



const ratingRouter = Router();
const ratingService = new RatingService(); // Create an instance of UserService
const ratingController = new RatingController(ratingService)

/**
 * @route POST /api/auth/register
 * @desc Register a new user (private)
 */
ratingRouter.post('', authenticate, validate(createRatingSchema),(req:Request, res: Response, next: NextFunction) =>
ratingController.createRating(req, res, next));

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT(public)
 */
ratingRouter.get('/', (req:Request, res: Response, next: NextFunction) =>
ratingController.getRatingForQuestionOrAnswer(req, res, next));


/**
* @route POST /api/auth/login
* @desc Login user and return JWT
*/
ratingRouter.get('/count',authenticate, validate(updateAnswerSchema),(req:Request, res: Response, next: NextFunction) =>
ratingController.getRatingCount(req, res, next));


/**
* @route POST /api/auth/login
* @desc Login user and return JWT
*/
ratingRouter.delete('/:id', authenticate, (req:Request, res: Response, next: NextFunction) =>
ratingController.deleteRating(req, res, next));



export default ratingRouter;
