import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { buildTestApp } from '../helpers/build-test-app';

// Exercises the Zod validate-request middleware through the real
// /api/v2/auth/login route, which is wired with loginRequestSchema.
describe('validate-request middleware', () => {
  it('rejects a body missing required fields with 400', async () => {
    const { app } = buildTestApp();

    const res = await request(app).post('/api/v2/auth/login').send({ email: 'not-an-email' });

    expect(res.status).toBe(400);
    expect(res.body.code).toBe('VALIDATION_ERROR');
    expect(Array.isArray(res.body.details)).toBe(true);
  });

  it('passes a valid body through to the controller', async () => {
    const { app } = buildTestApp();

    const res = await request(app)
      .post('/api/v2/auth/login')
      .send({ email: 'user@example.com', password: 'password123' });

    // Controller is an intentional 501 stub this phase — reaching it proves
    // validation succeeded and did not block a well-formed request.
    expect(res.status).toBe(501);
  });
});
