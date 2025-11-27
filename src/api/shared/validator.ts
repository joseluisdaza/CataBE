import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import httpStatus from 'http-status';

export function validateReqSchema(req: Request, res: Response, next: Function): any {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }

  const errors: { [x: string]: any }[] = validationErrors.array().map((err: ValidationError) => {
    if (err.type === 'field') {
      return { [err.path]: err.msg };
    }
    return { error: err.msg };
  });

  return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
    errors
  });
}
