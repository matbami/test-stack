import { Request, Response, NextFunction } from 'express';

class AppError extends Error {
     statusCode: number;
    status: string;
     isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

// Global Error Handler Middleware
const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
    });
};

export { errorHandler, AppError };
