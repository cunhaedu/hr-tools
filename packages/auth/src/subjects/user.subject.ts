import { z } from 'zod';

export const userTypeName = z.literal('User');

export const userSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  userTypeName
]);

export type UserTypeName = z.infer<typeof userTypeName>;
export type UserSubject = z.infer<typeof userSubject>;
