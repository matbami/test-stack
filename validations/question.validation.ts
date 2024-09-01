import Joi from "joi";

export const createQuestionSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
});

export const updateQuestionSchema = Joi.object({
    title: Joi.string().optional(),
    body: Joi.string().optional(),
});

