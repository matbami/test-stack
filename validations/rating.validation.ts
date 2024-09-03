import Joi from "joi";

export const createRatingSchema = Joi.object({
  targetId: Joi.string().required(),
  targetType: Joi.string().required(),
  value: Joi.string().required()
});

export const ratingSchema = Joi.object({
    targetId: Joi.string().required(),
    targetType: Joi.string().required(),
});

