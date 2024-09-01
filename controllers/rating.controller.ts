import { Request, Response, NextFunction } from "express";
import { AnswerService } from "../services/answer.service";
import { AuthRequest } from "../middleware/auth.middleware";
import { RatingService } from "../services/ratings.service";

export class RatingController {
  constructor(private ratingService: RatingService) {}

  async createRating(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      body.userId = req.user.id;
      const answer = await this.ratingService.createRating(req.body);
      return res.json(answer);
    } catch (error) {
      next(error);
    }
  }

  async getRatingForQuestionOrAnswer(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const { targetId, targetType} = req.query
      const ratings = await this.ratingService.getRatingForQuestionOrAnswer(targetId,targetType);
      return res.json({ ratings, message: "ratings retrieved successfully" });
    } catch (error) {
      next(error);
    }
  }



  async getRatingCount(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const { targetId, targetType} = req.query
        const rating = await this.ratingService.getRatingsCount(targetId, targetType);
        return res.json({ rating, message: "Rating count retrieved successfully" });
      } catch (error) {
        next(error);
      }
  }

  async deleteRating(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        await this.ratingService.deleteRating(req.params.id);
        return res.json({message: "Rating deleted successfully" });
      } catch (error) {
        next(error);
      }
  }
}
