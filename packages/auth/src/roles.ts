import { z } from 'zod';

export const roleSchema = z.union([
  z.literal('ADMIN'),
  z.literal('HR_MANAGER'),
  z.literal('COLLABORATOR'),
]);

export type Role = z.infer<typeof roleSchema>;
