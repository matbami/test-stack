import Question from "../models/question.model";
import {

    Pagination,
  QuestionInterface,
  QuestionUpdateInterface,

} from "../utils/interface/general.interface";
import { AppError } from "../helper/errorHandler";
import { Paginate } from "../helper/pagination";


export class QuestionService {
  private question: typeof Question;
  constructor() {
    this.question = Question;
  }

  async createQuestion(Question: QuestionInterface) {
  
    return await this.question.create(Question);

  }

  async getOneQuestion(id: string) {
    const question: Question = await this.question.findByPk(id);
    if(!question){
        throw new AppError('Question not found', 404) 
    }

    return question

  }

  async getAllQuestions(pagination?: Pagination) {
    const { page, limit, offset } = Paginate(pagination);

    const [total, questions] = await Promise.all([this.question.count(),this.question.findAll({
        limit,
        offset
    })])
    return {
        page,
        limit,
        total,
        questions
    }
  }

  async updateQuestions(id: string, updateDetails:QuestionUpdateInterface) {
    const question: Question = await this.question.findByPk(id);
    if(!question){
        throw new AppError('Question not found', 404) 
    }

    question.update(updateDetails)

    return question

  }

  async deleteQuestion(id: string) {
    const question: Question = await this.question.findByPk(id);
    if(!question){
        throw new AppError('Question not found', 404) 
    }

    question.destroy()

  }

  

  
}
