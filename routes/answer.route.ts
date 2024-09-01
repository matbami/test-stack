import { Router, Request, Response, NextFunction } from 'express';
import { validate} from '../middleware/validations';
import authenticate from '../middleware/auth.middleware';
import { AnswerService } from '../services/answer.service';
import { AnswerController } from '../controllers/answer.controller';
import { createAnswerSchema, updateAnswerSchema } from '../validations/answer.validation';



const answerRouter = Router();
const answerService = new AnswerService(); // Create an instance of UserService
const answerController = new AnswerController(answerService)

/**
 * @route POST /api/auth/register
 * @desc Register a new user (private)
 */
answerRouter.post('', authenticate, validate(createAnswerSchema),(req:Request, res: Response, next: NextFunction) =>
answerController.createAnswer(req, res, next));

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT(public)
 */
answerRouter.get('/question/:questionId', (req:Request, res: Response, next: NextFunction) =>
answerController.getAnswersByQuestion(req, res, next));


/**
* @route POST /api/auth/login
* @desc Login user and return JWT
*/
answerRouter.patch('/:id',authenticate, validate(updateAnswerSchema),(req:Request, res: Response, next: NextFunction) =>
answerController.updateAnswer(req, res, next));


/**
* @route POST /api/auth/login
* @desc Login user and return JWT
*/
answerRouter.delete('/:id', authenticate, (req:Request, res: Response, next: NextFunction) =>
answerController.deleteAnswer(req, res, next));



export default answerRouter;
