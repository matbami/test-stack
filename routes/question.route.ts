import { Router, Request, Response, NextFunction } from "express";
import { QuestionController } from "../controllers/question.controller";
import { QuestionService } from "../services/question.service";
import { validate } from "../middleware/validations";
import authenticate from "../middleware/auth.middleware";
import {
  createQuestionSchema,
  updateQuestionSchema,
} from "../validations/question.validation";

const questionRouter = Router();
const questionService = new QuestionService(); 
const questionController = new QuestionController(questionService);

/**
 * @route POST /api/questions
 * @desc Create a new question (private)
 */
questionRouter.post(
  "",
  authenticate,
  validate(createQuestionSchema),
  (req: Request, res: Response, next: NextFunction) =>
    questionController.createQuestion(req, res, next)
);

/**
 * @route GET /api/questions/:id
 * @desc Get a question by ID (public)
 */
questionRouter.get("/:id", (req: Request, res: Response, next: NextFunction) =>
  questionController.getOneQuestion(req, res, next)
);

/**
 * @route GET /api/questions
 * @desc Get all questions (public)
 */
questionRouter.get("", (req: Request, res: Response, next: NextFunction) =>
  questionController.getAllQuestions(req, res, next)
);

/**
 * @route PATCH /api/questions/:id
 * @desc Update a question by ID (authenticated)
 */
questionRouter.patch(
  "/:id",
  authenticate,
  validate(updateQuestionSchema),
  (req: Request, res: Response, next: NextFunction) =>
    questionController.updateQuestion(req, res, next)
);

/**
 * @route DELETE /api/questions/:id
 * @desc Delete a question by ID (authenticated)
 */
questionRouter.delete(
  "/:id",
  authenticate,
  (req: Request, res: Response, next: NextFunction) =>
    questionController.deleteQuestion(req, res, next)
);

export default questionRouter;
