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
  let statusCode = error.statusCode || status.INTERNAL_SERVER_ERROR;

  /* -------------------- ZOD ERROR -------------------- */
  if (error.name === "ZodError" && error.issues) {
    message = error.issues
      .map((err: any) => `${err.path.join(".")} is ${err.message}`)
      .join(", ");
    statusCode = status.BAD_REQUEST;
  }

  /* -------- Prisma Validation Error -------- */
  if (error instanceof Prisma.PrismaClientValidationError) {
    message = "Invalid data provided to database query";
    statusCode = status.BAD_REQUEST;
  }

  /* -------- Prisma Known Request Error -------- */
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      message = "No record found with the given ID";
      statusCode = status.NOT_FOUND;
    }

    if (error.code === "P2002") {
      message = `Duplicate value for unique field: ${error.meta?.target}`;
      statusCode = status.CONFLICT;
    }
  }

  res.status(statusCode).json({
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
