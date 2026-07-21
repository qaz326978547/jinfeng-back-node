import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

export interface ValidationSchemas {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
}

/**
 * Parses req.body/query/params against the given Zod schemas and replaces
 * them with the parsed (typed, coerced) values. Throws ZodError on failure,
 * which the global error handler converts into a 400 response.
 */
export function validateRequest(schemas: ValidationSchemas) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (schemas.body) {
      req.body = schemas.body.parse(req.body);
    }
    if (schemas.query) {
      Object.assign(req.query, schemas.query.parse(req.query));
    }
    if (schemas.params) {
      Object.assign(req.params, schemas.params.parse(req.params));
    }
    next();
  };
}
