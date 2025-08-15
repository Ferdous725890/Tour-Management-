import { NextFunction, Request, Response } from "express";
import{AnyZodObjec } from "zod"
export const validatedRequest = (zodSchema: AnyZodObjec ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Before validation:", req.body);
      req.body = await zodSchema.parseAsync(req.body);
      console.log("After validation:", req.body);
      next();
    } catch (error) {
      next(error);
    }
  };