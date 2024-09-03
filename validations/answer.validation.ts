import Joi from "joi";

export const createAnswerSchema = Joi.object({
  questionId: Joi.string().required(),
  body: Joi.string().required(),
});

export const updateAnswerSchema = Joi.object({
    body: Joi.string().optional(),
});

