import { Request, Response, NextFunction } from "express";
import { QuestionService } from "../services/question.service";
import { AuthRequest } from "../middleware/auth.middleware";
import { paginate } from "../utils/pagination.util";

export class QuestionController {
  constructor(private questionService: QuestionService) {}

  async createQuestion(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const body = { ...req.body, userId: req.user.id };
      const question = await this.questionService.createQuestion(body);
      return res.status(201).json({
        message: "Question created successfully",
        data: question,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOneQuestion(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const question = await this.questionService.getOneQuestion(req.params.id);
      return res.status(200).json({
        message: "Question retrieved successfully",
        data: question,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllQuestions(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const pagination = paginate(req.query.page, req.query.limit);
      const questions = await this.questionService.getAllQuestions(pagination);
      return res.status(200).json({
        message: "Questions retrieved successfully",
        data: questions,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateQuestion(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const question = await this.questionService.updateQuestion(req.params.id, req.body);
      return res.status(200).json({
        message: "Question updated successfully",
        data: question,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteQuestion(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await this.questionService.deleteQuestion(req.params.id);
      return res.status(200).json({
        message: "Question deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
