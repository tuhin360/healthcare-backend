import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Call the original async route handler
      await fn(req, res, next);
    } catch (error) {
      // Forward any error to Express global error handler
      next(error);
    }
  };
};

export default catchAsync;


/** Details of catchAsync function:
 * catchAsync: Express এর async route গুলোতে error ধরার জন্য helper function।
 *
 * কেন দরকার?
 * - প্রতিটি route এ try-catch লিখতে হয় না।
 * - কোনো error হলে স্বয়ংক্রিয়ভাবে next(error) এর মাধ্যমে global error handler এ যাবে।
 *
 * ব্যবহার:
 * router.get("/users", catchAsync(async (req, res) => {
 *   const users = await User.find();
 *   res.json(users);
 * }));
 */