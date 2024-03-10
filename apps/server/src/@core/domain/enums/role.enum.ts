export const Role: {
  ADMIN: 'ADMIN';
  COLLABORATOR: 'COLLABORATOR';
  HR_ADMIN: 'HR_ADMIN';
} = {
  ADMIN: 'ADMIN',
  COLLABORATOR: 'COLLABORATOR',
  HR_ADMIN: 'HR_ADMIN',
};

export type RoleEnum = (typeof Role)[keyof typeof Role];
