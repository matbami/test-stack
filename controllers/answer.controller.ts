import { Request, Response, NextFunction } from "express";
import { AnswerService } from "../services/answer.service";
import { AuthRequest } from "../middleware/auth.middleware";

export class AnswerController {
  constructor(private answerService: AnswerService) {}

  async createAnswer(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      body.userId = req.user.id;
      const answer = await this.answerService.createAnswer(req.body);
      return res.json(answer);
    } catch (error) {
      next(error);
    }
  }

  async getAnswersByQuestion(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const pagination = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
          };
      const answers = await this.answerService.getAnswersByQuestion(req.params.questionId,pagination);
      return res.json({ answers, message: "Answers retrieved successfully" });
    } catch (error) {
      next(error);
    }
  }



  async updateAnswer(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const answer = await this.answerService.updateAnswer(req.params.id,req.body);
        return res.json({ answer, message: "Answer updated successfully" });
      } catch (error) {
        next(error);
      }
  }

  async deleteAnswer(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        await this.answerService.deleteAnswer(req.params.id);
        return res.json({message: "Answer deleted successfully" });
      } catch (error) {
        next(error);
      }
  }
}
