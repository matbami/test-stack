import { SubscriptionService } from "../../../services/subscription.service";
import Subscription from "../../../models/subscription.model";
import { AppError } from "../../../helper/errorHandler";

jest.mock("../../../models/subscription.model");

const subscriptionService = new SubscriptionService();

describe("SubscriptionService", () => {
  test("should create a subscription successfully", async () => {
    const subscription = { questionId: "1", userId: "1" };
    (Subscription.create as jest.Mock).mockResolvedValue(subscription);

    const result = await subscriptionService.createSubscription(subscription);

    expect(result).toEqual(subscription);
    expect(Subscription.create).toHaveBeenCalledWith(subscription);
  });

  test("should handle error during subscription creation", async () => {
    const error = new AppError("Error creating subscription", 500);
    (Subscription.create as jest.Mock).mockRejectedValue(error);

    await expect(
      subscriptionService.createSubscription({ questionId: "1", userId: "1" })
    ).rejects.toThrow(error);
  });
});
