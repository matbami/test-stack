import { Request, Response, NextFunction } from "express";
import { QuestionService } from "../services/question.service";
import { AuthRequest } from "../middleware/auth.middleware";

export class QuestionController {
  constructor(private questionService: QuestionService) {}

  async createQuestion(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      body.userId = req.user.id;
      const question = await this.questionService.createQuestion(req.body);
      return res.json(question);
    } catch (error) {
      next(error);
    }
  }

  async getOneQuestion(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const question = await this.questionService.getOneQuestion(req.params.id);
      return res.json({ question, message: "Question retrieved successfully" });
    } catch (error) {
      next(error);
    }
  }

  async getAllQuestion(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const questions = await this.questionService.getAllQuestions();
        return res.json({ questions, message: "Questions retrieved successfully" });
      } catch (error) {
        next(error);
      }
  }

  async updateQuestion(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const question = await this.questionService.updateQuestions(req.params.id,req.body);
        return res.json({ question, message: "Question updated successfully" });
      } catch (error) {
        next(error);
      }
  }

  async deleteQuestion(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const question = await this.questionService.deleteQuestion(req.params.id);
        return res.json({message: "Question deleted successfully" });
      } catch (error) {
        next(error);
      }
  }
}
