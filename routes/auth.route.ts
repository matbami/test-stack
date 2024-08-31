import { Router, Request, Response, NextFunction } from 'express';

import { AuthController } from '../controllers/auth.controller';
import { UserService } from '../services/user.service';
import { loginSchema,registerSchema } from '../validations/auth.validation';
import { validate,validateParams } from '../middleware/validations';


const authRouter = Router();
const userService = new UserService(); // Create an instance of UserService
const authController = new AuthController(userService)

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 */
authRouter.post('/register', validate(registerSchema), (req:Request, res: Response, next: NextFunction) =>
authController.register(req, res, next));

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT
 */
authRouter.post('/login', validate(loginSchema), (req:Request, res: Response, next: NextFunction) =>
authController.login(req, res, next));

export default authRouter;
