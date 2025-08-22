import { NextFunction, Request, Response } from "express";
import status from "http-status";

const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(status.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message || "Something went wrong",
    error: error,
  });
};

export default globalErrorHandler;
