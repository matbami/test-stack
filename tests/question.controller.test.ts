import { Request, Response, NextFunction } from 'express';
import { QuestionController } from '../controllers/question.controller';
import { QuestionService } from '../services/question.service';
import { AppError } from '../helper/errorHandler';
import { mockRequest, mockResponse, mockNext } from './mocks';

jest.mock('../services/question.service');

const questionService = new QuestionService();
const questionController = new QuestionController(questionService);

describe('QuestionController', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
  });

  test('should create a question successfully', async () => {
    req.body = { title: 'Test Question', body: 'Question body', userId: '1' };
    (questionService.createQuestion as jest.Mock).mockResolvedValue(req.body);

    await questionController.createQuestion(req, res, next);

    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  test('should handle error during question creation', async () => {
    const error = new AppError('Error creating question', 500);
    (questionService.createQuestion as jest.Mock).mockRejectedValue(error);

    await questionController.createQuestion(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  // Similarly, add tests for getOneQuestion, getAllQuestion, updateQuestion, and deleteQuestion methods
});
