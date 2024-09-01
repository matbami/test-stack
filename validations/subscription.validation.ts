import Joi from "joi";

export const subscriptionSchema = Joi.object({
  questionId: Joi.string().required(),

});

