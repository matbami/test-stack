import { Router, Request, Response, NextFunction } from "express";
import { validate } from "../middleware/validations";
import authenticate from "../middleware/auth.middleware";
import { AnswerService } from "../services/answer.service";
import { AnswerController } from "../controllers/answer.controller";
import {
  createAnswerSchema,
  updateAnswerSchema,
} from "../validations/answer.validation";
import { SubscriptionService } from "../services/subscription.service";
import { UserService } from "../services/user.service";
import { QuestionService } from "../services/question.service";

const subscriptionService = new SubscriptionService();
const userService = new UserService();
const questionService = new QuestionService();

const answerRouter = Router();
const answerService = new AnswerService(
  subscriptionService,
  userService,
  questionService
);
const answerController = new AnswerController(answerService);

/**
 * @route POST /api/answers
 * @desc Create a new answer (private)
 */
answerRouter.post(
  "",
  authenticate,
  validate(createAnswerSchema),
  (req: Request, res: Response, next: NextFunction) =>
    answerController.createAnswer(req, res, next)
);

/**
 * @route GET /api/answers/question/:questionId
 * @desc Get all answers for a specific question (public)
 */
answerRouter.get(
  "/question/:questionId",
  (req: Request, res: Response, next: NextFunction) =>
    answerController.getAnswersByQuestion(req, res, next)
);

/**
 * @route PATCH /api/answers/:id
 * @desc Update an existing answer (private)
 */
answerRouter.patch(
  "/:id",
  authenticate,
  validate(updateAnswerSchema),
  (req: Request, res: Response, next: NextFunction) =>
    answerController.updateAnswer(req, res, next)
);

/**
 * @route DELETE /api/answers/:id
 * @desc Delete an answer (private)
 */
answerRouter.delete(
  "/:id",
  authenticate,
  (req: Request, res: Response, next: NextFunction) =>
    answerController.deleteAnswer(req, res, next)
);

export default answerRouter;
