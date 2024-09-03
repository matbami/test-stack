import { Request, Response, NextFunction } from "express";
import { SubscriptionController } from "../../../controllers/subscription.controller";
import { SubscriptionService } from "../../../services/subscription.service";
import { AppError } from "../../../helper/errorHandler";
import { mockRequest, mockResponse, mockNext } from "../../mocks";

jest.mock("../../../services/subscription.service");

const subscriptionService = new SubscriptionService();
const subscriptionController = new SubscriptionController(subscriptionService);

describe("SubscriptionController", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
  });

  test("should create a subscription successfully", async () => {
    req.body = { questionId: "1", userId: "1" };

    const response = {
      data: req.body,
      message: "Subscription created successfully",
    };
    (subscriptionService.createSubscription as jest.Mock).mockResolvedValue(
      req.body
    );

    await subscriptionController.createSubscription(req, res, next);

    expect(res.json).toHaveBeenCalledWith(response);
  });

  test("should handle error during subscription creation", async () => {
    const error = new AppError("Error creating subscription", 500);
    (subscriptionService.createSubscription as jest.Mock).mockRejectedValue(
      error
    );

    await subscriptionController.createSubscription(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
