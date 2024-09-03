import {
  AnswerInterface,
  AnswerUpdateInterface,
  Pagination,
} from "../utils/interface/general.interface";
import { AppError } from "../helper/errorHandler";
import Answer from "../models/answer.model";
import { SubscriptionService } from "./subscription.service";
import { sendAnswerNotificationEmail } from "../utils/email";
import { UserService } from "./user.service";
import { QuestionService } from "./question.service";
import { Paginate } from "../helper/pagination";

export class AnswerService {
  private answer: typeof Answer;
  private subscriptionService: SubscriptionService;
  private userService: UserService;
  private questionService: QuestionService;

  constructor(
    subscriptionService: SubscriptionService,
    userService: UserService,
    questionService: QuestionService
  ) {
    this.subscriptionService = subscriptionService;
    this.userService = userService;
    this.questionService = questionService;
    this.answer = Answer;
  }

  async createAnswer(answerData: AnswerInterface) {
    const answer = await this.answer.create(answerData);

    const subscription =
      await this.subscriptionService.getSubscriptionByQuestionId(
        answerData.questionId,
        answerData.userId
      );

    if (subscription) {
      const user = await this.userService.getUserById(answerData.userId);
      const question = await this.questionService.getOneQuestion(
        answerData.questionId
      );

      // Send notification email
      sendAnswerNotificationEmail(user.email, question.title, question.body);
    }

    return answer;
  }

  async getAnswersByQuestion(questionId: string, pagination?: Pagination) {
    const { page, limit, offset } = Paginate(pagination);

    const [total, answers] = await Promise.all([
      this.answer.count({ where: { questionId } }),
      this.answer.findAll({ where: { questionId }, limit, offset }),
    ]);

    return {
      page,
      limit,
      total,
      answers,
    };
  }

  async updateAnswer(id: string, updateDetails: AnswerUpdateInterface) {
    const answer = await this.answer.findByPk(id);
    if (!answer) {
      throw new AppError("Answer not found", 404);
    }

    await answer.update(updateDetails);
    return answer;
  }

  async deleteAnswer(id: string) {
    const answer = await this.answer.findByPk(id);
    if (!answer) {
      throw new AppError("Answer not found", 404);
    }

    await answer.destroy();
  }
}
