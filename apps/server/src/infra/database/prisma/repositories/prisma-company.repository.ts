import {
  CompanyRepository,
  CreateCompanyData,
} from '@core/domain/repositories/company.repository';
import { RolesEnum } from '@core/domain/enums/roles.enum';
import { Company } from '@core/domain/entities/Company';

import { PrismaService } from '../prisma.service';

export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private prisma: PrismaService) {}

  findById(id: string): Promise<Company> {
    return this.prisma.company.findUnique({
      where: {
        id,
      },
    });
  }

  findByEmailOrCnpj(email: string, cnpj: string): Promise<Company | null> {
    console.log('hello');

    return this.prisma.company.findUnique({
      where: {
        email,
        cnpj,
      },
    });
  }

  async createWithAdministrator(data: CreateCompanyData): Promise<void> {
    await this.prisma.company.create({
      data: {
        ...data,
        users: {
          create: {
            email: data.email,
            firstName: data.responsible.firstName,
            lastName: data.responsible.lastName,
            role: {
              connect: {
                id: RolesEnum.ADMIN,
              },
            },
          },
        },
      },
    });
  }
}
