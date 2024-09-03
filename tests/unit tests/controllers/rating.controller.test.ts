import { Request, Response, NextFunction } from "express";
import { RatingController } from "../../../controllers/rating.controller";
import { RatingService } from "../../../services/ratings.service";
import { AppError } from "../../../helper/errorHandler";
import { mockRequest, mockResponse, mockNext } from "../../mocks";

jest.mock("../../../services/ratings.service");

const ratingService = new RatingService();
const ratingController = new RatingController(ratingService);

describe("RatingController", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
  });

  test("should create a rating successfully", async () => {
    req.body = {
      value: "upvote",
      targetType: "question",
      targetId: "1",
      userId: "1",
    };

    const response = {
      data: req.body,
      message: "Rating created successfully",
    };
    (ratingService.createRating as jest.Mock).mockResolvedValue(req.body);

    await ratingController.createRating(req, res, next);

    expect(res.json).toHaveBeenCalledWith(response);
  });

  test("should handle error during rating creation", async () => {
    const error = new AppError("Error creating rating", 500);
    (ratingService.createRating as jest.Mock).mockRejectedValue(error);

    await ratingController.createRating(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
