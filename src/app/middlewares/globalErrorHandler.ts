import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { Prisma } from "../../generated/prisma";

// global error handler middleware
const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = error.message || "Something went wrong";

   // যদি error এর মধ্যে statusCode থাকে (যেমন ApiError এ থাকে) তাহলে সেটাই use করবো
  const statusCode = error.statusCode || status.INTERNAL_SERVER_ERROR;


  // Handle ZodError
  if (error.name === "ZodError" && error.issues) {
    message = error.issues
      .map((err: any) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
  }

  // Handle Prisma known errors
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
      statusCode,
      code: error.code,
      meta: error.meta,
    },
  });
};

export default globalErrorHandler;
