import { Request, Response, NextFunction } from 'express';
import { AnswerController } from '../controllers/answer.controller';
import { AnswerService } from '../services/answer.service';
import { AppError } from '../helper/errorHandler';
import { createAnswerSchema, updateAnswerSchema } from '../validations/answer.validation';
import { mockRequest, mockResponse, mockNext } from './mocks';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';
import { QuestionService } from '../services/question.service';

const subscriptionService = new SubscriptionService()
const userService = new UserService()
const questionService = new QuestionService()

jest.mock('../services/answer.service');

const answerService = new AnswerService(subscriptionService,userService,questionService);
const answerController = new AnswerController(answerService);

describe('AnswerController', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
  });

  test('should create an answer successfully', async () => {
    req.body = { body: 'Test answer', questionId: '1', userId: '1' };
    (answerService.createAnswer as jest.Mock).mockResolvedValue(req.body);

    await answerController.createAnswer(req, res, next);

    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  test('should handle error when creating an answer', async () => {
    const error = new AppError('Error creating answer', 500);
    (answerService.createAnswer as jest.Mock).mockRejectedValue(error);

    await answerController.createAnswer(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  // Similarly, add tests for getAnswersByQuestion, updateAnswer, and deleteAnswer methods
});
