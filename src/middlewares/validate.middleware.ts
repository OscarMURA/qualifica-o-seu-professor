import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema<any>, where: 'body'|'params'|'query' = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = (req as any)[where];
    const result = schema.safeParse(data);
    if (!result.success) {
      const issues = result.error.issues.map(i => ({ path: i.path, message: i.message }));
      return res.status(400).json({ message: 'Validation error', issues });
    }
    (req as any)[where] = result.data;
    next();
  };
}