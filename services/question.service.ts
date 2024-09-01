import Question from "../models/question.model";
import {

  QuestionInterface,
  QuestionUpdateInterface,

} from "../utils/interface/general.interface";
import { AppError } from "../helper/errorHandler";


export class QuestionService {
  private question: typeof Question;
  constructor() {
    this.question = Question;
  }

  async createQuestion(Question: QuestionInterface) {
    console.log(Question)
    return await this.question.create(Question);

  }

  async getOneQuestion(id: string) {
    const question: Question = await this.question.findByPk(id);
    if(!question){
        throw new AppError('Question not found', 404) 
    }

    return question

  }

  async getAllQuestions() {
    return await this.question.findAll();
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
