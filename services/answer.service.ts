import {
  AnswerInterface,
  AnswerUpdateInterface,

} from "../utils/interface/general.interface";
import { AppError } from "../helper/errorHandler";
import Answer from "../models/answer.model";

export class AnswerService {
  private answer: typeof Answer;
  constructor() {
    this.answer = Answer;
  }

  async createAnswer(Answer: AnswerInterface) {

    return await this.answer.create(Answer);
  }

  async getAnswersByQuestion(questionId: string) {
    const answers: Answer[] = await this.answer.findAll({
      where: {
        questionId,
      },
    });

    return answers;
  }


  async updateAnswer(id: string, updateDetails: AnswerUpdateInterface) {
    const answer: Answer = await this.answer.findByPk(id);
    if (!answer) {
      throw new AppError("Answer not found", 404);
    }

    answer.update(updateDetails);

    return answer;
  }

  async deleteAnswer(id: string) {
    const answer: Answer = await this.answer.findByPk(id);
    if (!answer) {
      throw new AppError("Answer not found", 404);
    }

    answer.destroy();
  }
}
