import { RatingService } from '../services/ratings.service';
import Rating from '../models/rating.model';
import { AppError } from '../helper/errorHandler';

jest.mock('../models/rating.model');

const ratingService = new RatingService();

describe('RatingService', () => {
  test('should create a rating successfully', async () => {
    const rating = { value: 'upvote', targetType: 'question', targetId: '1', userId: '1' };
    (Rating.create as jest.Mock).mockResolvedValue(rating);

    const result = await ratingService.createRating(rating);

    expect(result).toEqual(rating);
    expect(Rating.create).toHaveBeenCalledWith(rating);
  });

  test('should handle error during rating creation', async () => {
    const error = new AppError('Error creating rating', 500);
    (Rating.create as jest.Mock).mockRejectedValue(error);

    await expect(ratingService.createRating({ value: 'upvote', targetType: 'question', targetId: '1', userId: '1' }))
      .rejects
      .toThrow(error);
  });

  // Similarly, add tests for getRatingForQuestionOrAnswer, getRatingCount, and deleteRating methods
});
