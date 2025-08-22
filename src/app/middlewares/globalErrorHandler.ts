import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { Prisma } from "../../generated/prisma";


const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = error.message || "Something went wrong";

  // Prisma known errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      message = "No record found with the given ID";
    }
  }

  res.status(status.INTERNAL_SERVER_ERROR).json({
    success: false,
    message,
    error: {
      name: error.name,
      code: error.code,
      meta: error.meta,
    },
  });
};

export default globalErrorHandler;
