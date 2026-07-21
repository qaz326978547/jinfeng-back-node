import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { validateRequest } from '../../middleware/validate-request';
import * as authController from './auth.controller';
import { loginRequestSchema, registerRequestSchema } from './auth.schemas';

export interface AuthRouterDeps {
  jwtSecret: string;
}

export function createAuthRouter(deps: AuthRouterDeps): Router {
  const router = Router();

  router.post('/login', validateRequest({ body: loginRequestSchema }), authController.login);
  router.post(
    '/register',
    validateRequest({ body: registerRequestSchema }),
    authController.register,
  );
  router.post('/logout', authenticate(deps.jwtSecret), authController.logout);

  return router;
}
