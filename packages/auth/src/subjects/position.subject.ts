import { z } from 'zod';

export const positionTypeName = z.literal('Position');

export const positionSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  positionTypeName
]);

export type PositionTypeName = z.infer<typeof positionTypeName>;
export type PositionSubject = z.infer<typeof positionSubject>;
