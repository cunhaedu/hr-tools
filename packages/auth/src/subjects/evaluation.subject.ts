import { z } from 'zod';

export const evaluationTypeName = z.literal('Evaluation');

export const evaluationSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('get-all-results'),
    z.literal('get-team-results'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  evaluationTypeName
]);

export type EvaluationTypeName = z.infer<typeof evaluationTypeName>;
export type EvaluationSubject = z.infer<typeof evaluationSubject>;
