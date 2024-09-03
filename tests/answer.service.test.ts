import { AnswerService } from '../services/answer.service';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';
import { QuestionService } from '../services/question.service';
import Answer from '../models/answer.model';
import { AppError } from '../helper/errorHandler';

jest.mock('../models/answer.model');
jest.mock('../services/subscription.service');
jest.mock('../services/user.service');
jest.mock('../services/question.service');

const subscriptionService = new SubscriptionService();
const userService = new UserService();
const questionService = new QuestionService();
const answerService = new AnswerService(subscriptionService, userService, questionService);

describe('AnswerService', () => {
  test('should create an answer successfully', async () => {
    const answer = { body: 'Test answer', questionId: '1', userId: '1' };
    (Answer.create as jest.Mock).mockResolvedValue(answer);
    (subscriptionService.getSubscriptionByQuestionId as jest.Mock).mockResolvedValue(true);
    (userService.getUserbyId as jest.Mock).mockResolvedValue({ email: 'test@example.com' });
    (questionService.getOneQuestion as jest.Mock).mockResolvedValue({ title: 'Test Question', body: 'Question body' });

    const result = await answerService.createAnswer(answer);

    expect(result).toEqual(answer);
    expect(Answer.create).toHaveBeenCalledWith(answer);
  });

  test('should handle error during answer creation', async () => {
    const error = new AppError('Error creating answer', 500);
    (Answer.create as jest.Mock).mockRejectedValue(error);

    await expect(answerService.createAnswer({ body: 'Test answer', questionId: '1', userId: '1' }))
      .rejects
      .toThrow(error);
  });

  // Similarly, add tests for getAnswersByQuestion, updateAnswer, and deleteAnswer methods
});

