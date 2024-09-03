import { Request, Response, NextFunction } from "express";

/**
 * Middleware for validating request data against a schema.
 * @param schema - Joi schema object used for validation.
 * @returns Middleware function that validates request body and handles errors.
 */

export const validate =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    next();
  };

  export const validateQuery =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    next();
  };
