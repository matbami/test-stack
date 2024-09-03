import { Router, Request, Response, NextFunction } from "express";
import { validate, validateQuery } from "../middleware/validations";
import authenticate from "../middleware/auth.middleware";
import {
  createRatingSchema,
  ratingSchema,
} from "../validations/rating.validation";
import { RatingService } from "../services/ratings.service";
import { RatingController } from "../controllers/rating.controller";

const ratingRouter = Router();
const ratingService = new RatingService();
const ratingController = new RatingController(ratingService);

/**
 * @route POST /api/ratings
 * @desc Create a new rating (authenticated)
 */
ratingRouter.post(
  "",
  authenticate,
  validate(createRatingSchema),
  (req: Request, res: Response, next: NextFunction) =>
    ratingController.createRating(req, res, next)
);

/**
 * @route GET /api/ratings
 * @desc Get ratings for a specific question or answer (public)
 */
ratingRouter.get(
  "/",
  authenticate,
  validateQuery(ratingSchema),
  (req: Request, res: Response, next: NextFunction) =>
    ratingController.getRatingForQuestionOrAnswer(req, res, next)
);

/**
 * @route GET /api/ratings/count
 * @desc Get the count of ratings for a specific question or answer (authenticated)
 */
ratingRouter.get(
  "/count",
  validateQuery(ratingSchema),
  (req: Request, res: Response, next: NextFunction) =>
    ratingController.getRatingCount(req, res, next)
);

/**
 * @route DELETE /api/ratings/:id
 * @desc Delete a rating by ID (authenticated)
 */
ratingRouter.delete(
  "/:id",
  authenticate,
  (req: Request, res: Response, next: NextFunction) =>
    ratingController.deleteRating(req, res, next)
);

export default ratingRouter;
