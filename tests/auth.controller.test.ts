import { Request, Response, NextFunction } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { UserService } from '../services/user.service';
import { AppError } from '../helper/errorHandler';
import { mockRequest, mockResponse, mockNext } from './mocks';

jest.mock('../services/user.service');

const userService = new UserService();
const authController = new AuthController(userService);

describe('AuthController', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
  });

  test('should register a user successfully', async () => {
    req.body = { username: 'test', email: 'test@example.com', password: 'password' };
    (userService.register as jest.Mock).mockResolvedValue(req.body);

    await authController.register(req, res, next);

    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  test('should handle error during registration', async () => {
    const error = new AppError('Registration error', 500);
    (userService.register as jest.Mock).mockRejectedValue(error);

    await authController.register(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  // Similarly, add tests for login method
});
