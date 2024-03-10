import { z } from 'zod';
import {
  AbilityBuilder,
  CreateAbility,
  MongoAbility,
  createMongoAbility
} from '@casl/ability';

import { evaluationSubject } from './subjects/evaluation.subject';
import { positionSubject } from './subjects/position.subject';
import { companySubject } from './subjects/company.subject';
import { userSubject } from './subjects/user.subject';
import { UserModel } from './models/user.model';
import { permissions } from './permissions';

const appAbilities = z.union([
  evaluationSubject,
  positionSubject,
  companySubject,
  userSubject,
  // allow all actions on all subjects
  z.tuple([z.literal('manage'), z.literal('all')]),
]);

type AppAbilities = z.infer<typeof appAbilities>;

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor(user: UserModel): AppAbility {
  const builder = new AbilityBuilder(createAppAbility);

  if(typeof permissions[user.role] === 'function') {
    permissions[user.role](user, builder);
  } else {
    throw new Error(`Unknown role: ${user.role}`);
  }

  const ability = builder.build({
    detectSubjectType(subject: any) {
      return subject.__typename
    },
  });

  ability.can = ability.can.bind(ability);
  ability.cannot = ability.cannot.bind(ability);

  return ability
}
