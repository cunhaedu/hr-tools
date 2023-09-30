import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

enum RoleId {
  ADMIN = 'd3f4ee10-775b-4a1f-9d91-143f9c9f8f47',
  USER = '522a9da6-27fb-4649-8955-77dfcebc9a2f',
  RH = '467abaff-d56a-4e36-855b-6958ca04329d',
}

const roles = [
  {
    name: 'Administrador do sistema',
    id: RoleId.ADMIN,
  },
  {
    name: 'Gestor do RH',
    id: RoleId.RH,
  },
  {
    name: 'Usuário',
    id: RoleId.USER,
  },
];

const permissions = [
  {
    name: 'read:company-management',
    roles: [RoleId.ADMIN],
  },
  {
    name: 'update:company-management',
    roles: [RoleId.ADMIN],
  },
  {
    name: 'delete:company-management',
    roles: [RoleId.ADMIN],
  },
  {
    name: 'read:users-management',
    roles: [RoleId.ADMIN, RoleId.RH],
  },
  {
    name: 'create:users-management',
    roles: [RoleId.ADMIN, RoleId.RH],
  },
  {
    name: 'update:users-management',
    roles: [RoleId.ADMIN, RoleId.RH],
  },
  {
    name: 'delete:users-management',
    roles: [RoleId.ADMIN, RoleId.RH],
  },
  {
    name: 'read:positions-management',
    roles: [RoleId.ADMIN, RoleId.RH],
  },
  {
    name: 'create:positions-management',
    roles: [RoleId.ADMIN, RoleId.RH],
  },
  {
    name: 'update:positions-management',
    roles: [RoleId.ADMIN, RoleId.RH],
  },
  {
    name: 'delete:positions-management',
    roles: [RoleId.ADMIN, RoleId.RH],
  },
  {
    name: 'read:organizational-structure-management',
    roles: [RoleId.ADMIN, RoleId.RH],
  },
  {
    name: 'create:organizational-structure-management',
    roles: [RoleId.ADMIN, RoleId.RH],
  },
  {
    name: 'update:organizational-structure-management',
    roles: [RoleId.ADMIN, RoleId.RH],
  },
  {
    name: 'delete:organizational-structure-management',
    roles: [RoleId.ADMIN, RoleId.RH],
  },
];

async function main() {
  await prisma.permission.deleteMany();
  await prisma.role.deleteMany();

  await Promise.all(
    roles.map(async (role) => {
      await prisma.role.create({
        data: role,
      });
    }),
  );

  await Promise.all(
    permissions.map(async (permission) => {
      await prisma.permission.create({
        data: {
          name: permission.name,
          roles: {
            connect: permission.roles.map((roleId) => ({
              id: roleId,
            })),
          },
        },
      });
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
