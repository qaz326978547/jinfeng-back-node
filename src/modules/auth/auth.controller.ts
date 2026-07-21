import type { Request, Response } from 'express';
import { NotImplementedError } from '../../shared/errors/app-error';

/**
 * Route registry + validation skeleton only. Real business logic (bcrypt
 * verification against `users.password`, JWT issuance, register/logout
 * persistence) is intentionally deferred to the API implementation phase —
 * see 專案建立.md "目前階段" and node-api-implementation-checklist.md.
 */

export function login(_req: Request, _res: Response): void {
  throw new NotImplementedError('POST /api/v2/auth/login is not implemented yet');
}

export function register(_req: Request, _res: Response): void {
  throw new NotImplementedError('POST /api/v2/auth/register is not implemented yet');
}

export function logout(_req: Request, _res: Response): void {
  throw new NotImplementedError('POST /api/v2/auth/logout is not implemented yet');
}
