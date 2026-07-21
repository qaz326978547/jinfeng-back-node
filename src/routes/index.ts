import { Router } from 'express';
import type { Pool } from 'mysql2/promise';
import { createAuthRouter } from '../modules/auth/auth.routes';
import { createHealthRouter } from './health/health.route';

export const API_V2_BASE_PATH = '/api/v2';

export interface RouterDeps {
  pool: Pool;
  jwtSecret: string;
}

export function createRootRouter(deps: RouterDeps): Router {
  const router = Router();

  // Liveness/readiness probes are unversioned — Zeabur's reverse proxy and
  // Docker HEALTHCHECK hit these directly, not through /api/v2.
  router.use(createHealthRouter(deps.pool));

  const apiV2 = Router();
  apiV2.use('/auth', createAuthRouter({ jwtSecret: deps.jwtSecret }));
  // Future modules (seo, contact, contact-class, contact-quest, faq, admin/*)
  // mount here, e.g. apiV2.use('/seo', createSeoRouter(...)).
  router.use(API_V2_BASE_PATH, apiV2);

  return router;
}
