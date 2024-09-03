import { Request, Response, NextFunction } from "express";
import { RatingService } from "../services/ratings.service";
import { AuthRequest } from "../middleware/auth.middleware";

export class RatingController {
  constructor(private ratingService: RatingService) {}

  async createRating(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const body = { ...req.body, userId: req.user.id };
      const rating = await this.ratingService.createRating(body);
      return res.status(201).json({
        message: "Rating created successfully",
        data: rating,
      });
    } catch (error) {
      next(error);
    }
  }

  async getRatingForQuestionOrAnswer(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { targetId, targetType } = req.query;
      const ratings = await this.ratingService.getRatingForQuestionOrAnswer(
        targetId as string,
        targetType as string
      );
      return res.status(200).json({
        message: "Ratings retrieved successfully",
        data: ratings,
      });
    } catch (error) {
      next(error);
    }
  }

  async getRatingCount(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { targetId, targetType } = req.query;
      const ratingCount = await this.ratingService.getRatingsCount(
        targetId as string,
        targetType as string
      );
      return res.status(200).json({
        message: "Rating count retrieved successfully",
        data: ratingCount,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteRating(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await this.ratingService.deleteRating(req.params.id);
      return res.status(200).json({
        message: "Rating deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
