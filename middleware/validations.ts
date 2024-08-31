import { Request,Response,NextFunction } from "express";
export const validate = (schema: any) => (req:Request, res:Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    next();
  };
  
  export const validateParams = (schema: any) => (req:Request, res:Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    next();
  };
  