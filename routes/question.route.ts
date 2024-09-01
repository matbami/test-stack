import { Router, Request, Response, NextFunction } from 'express';

import { QuestionController } from '../controllers/question.controller';
import { QuestionService } from '../services/question.service';
import { loginSchema,registerSchema } from '../validations/auth.validation';
import { validate,validateParams } from '../middleware/validations';
import authenticate from '../middleware/auth.middleware';
import { createQuestionSchema, updateQuestionSchema } from '../validations/question.validation';



const questionRouter = Router();
const questionService = new QuestionService(); // Create an instance of UserService
const questionController = new QuestionController(questionService)

/**
 * @route POST /api/auth/register
 * @desc Register a new user (private)
 */
questionRouter.post('', authenticate, validate(createQuestionSchema),(req:Request, res: Response, next: NextFunction) =>
questionController.createQuestion(req, res, next));

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT(public)
 */
questionRouter.get('/:id', (req:Request, res: Response, next: NextFunction) =>
questionController.getOneQuestion(req, res, next));

/**
* @route POST /api/auth/login
* @desc Login user and return JWT(public)
*/
questionRouter.get('', (req:Request, res: Response, next: NextFunction) =>
questionController.getAllQuestion(req, res, next));

/**
* @route POST /api/auth/login
* @desc Login user and return JWT
*/
questionRouter.patch('/:id',authenticate, validate(updateQuestionSchema),(req:Request, res: Response, next: NextFunction) =>
questionController.updateQuestion(req, res, next));


/**
* @route POST /api/auth/login
* @desc Login user and return JWT
*/
questionRouter.delete('/:id', authenticate, (req:Request, res: Response, next: NextFunction) =>
questionController.deleteQuestion(req, res, next));



export default questionRouter;
