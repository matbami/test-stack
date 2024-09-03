import { Request, Response, NextFunction } from "express";
import { AnswerService } from "../services/answer.service";
import { AuthRequest } from "../middleware/auth.middleware";
import { paginate } from "../utils/pagination.util";

export class AnswerController {
  constructor(private answerService: AnswerService) {}

  async createAnswer(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const body = { ...req.body, userId: req.user.id };
      const answer = await this.answerService.createAnswer(body);
      return res.status(201).json({ message: "Answer created successfully", data: answer });
    } catch (error) {
      next(error);
    }
  }

  async getAnswersByQuestion(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const pagination = paginate(req.query.page, req.query.limit);
      const answers = await this.answerService.getAnswersByQuestion(req.params.questionId, pagination);
      return res.status(200).json({ message: "Answers retrieved successfully", data: answers });
    } catch (error) {
      next(error);
    }
  }

  async updateAnswer(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const answer = await this.answerService.updateAnswer(req.params.id, req.body);
      return res.status(200).json({ message: "Answer updated successfully", data: answer });
    } catch (error) {
      next(error);
    }
  }

  async deleteAnswer(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await this.answerService.deleteAnswer(req.params.id);
      return res.status(200).json({ message: "Answer deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
