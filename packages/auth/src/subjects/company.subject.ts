import { z } from 'zod';

export const companyTypeName = z.literal('Company');

export const companySubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  companyTypeName
]);

export type CompanyTypeName = z.infer<typeof companyTypeName>;
export type CompanySubject = z.infer<typeof companySubject>;
