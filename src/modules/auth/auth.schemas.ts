import { z } from 'zod';

// Mirrors migration-spec/openapi.yaml components.schemas.LoginRequest
export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export type LoginRequest = z.infer<typeof loginRequestSchema>;

// Mirrors migration-spec/openapi.yaml components.schemas.RegisterRequest
export const registerRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  password_confirmation: z.string().min(6),
  is_admin: z.boolean().optional(),
});
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
