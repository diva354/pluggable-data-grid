import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

export default function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let status = 500;
  let message = "Internal Server Error";

  if (err instanceof AppError) {
    status = err.status;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(status).json({
    success: false,
    message,
  });
}
