import { UserRepository } from '@core/domain/repositories/user.repository';
import { User } from '@core/domain/entities/User';

import { PrismaService } from '../prisma.service';

export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  findByEmailWithPermissions(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        company: true,
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });
  }
}
