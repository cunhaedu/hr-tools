import { AbilityBuilder } from '@casl/ability';

import { UserModel } from './models/user.model';
import { AppAbility } from './abilities';
import { Role } from './roles';

type UserPermissions = (user: UserModel, builder: AbilityBuilder<AppAbility>) => void;

export const permissions: Record<Role, UserPermissions> = {
  ADMIN(_, { can }) {
    can('manage', 'all');
  },
  HR_MANAGER(user, { can }) {
    can('manage', 'User')
    can('manage', 'Evaluation')
    can('manage', 'Position')
  },
  COLLABORATOR(user, { can }) {
    can('get-team-results', 'Evaluation');
  },
};
