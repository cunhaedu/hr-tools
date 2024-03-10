import {
  CompanyRepository,
  CreateCompanyData,
  VerifyCompanyAndActivateUserData,
} from '@core/domain/repositories/company.repository';
import { Company } from '@core/domain/entities/Company';

import { PrismaService } from '../prisma.service';
import { Role } from '@core/domain/enums/role.enum';

export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private prisma: PrismaService) {}

  findById(id: string): Promise<Company | null> {
    return this.prisma.company.findUnique({
      where: {
        id,
      },
    });
  }

  async findByVerificationCode(
    verificationCode: string,
  ): Promise<Company | null> {
    return this.prisma.company.findFirst({
      where: {
        verificationCode,
      },
      include: {
        users: {
          where: {
            isCompanyRepresentative: true,
          },
        },
      },
    });
  }

  findByEmailOrCnpj(email: string, cnpj: string): Promise<Company | null> {
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
        name: data.name,
        cnpj: data.cnpj,
        email: data.email,
        cep: data.cep,
        streetNumber: data.streetNumber,
        street: data.street,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        phoneNumber: data.phoneNumber,
        verificationCode: data.verificationCode,
        isVerified: false,
        users: {
          create: {
            email: data.email,
            firstName: data.responsible.firstName,
            lastName: data.responsible.lastName,
            isActive: false,
            isCompanyRepresentative: true,
            role: Role.ADMIN,
          },
        },
      },
    });
  }

  async verifyCompanyAndActivateUser(
    data: VerifyCompanyAndActivateUserData,
  ): Promise<void> {
    await this.prisma.company.update({
      where: {
        id: data.companyId,
      },
      data: {
        isVerified: true,
        verificationCode: null,
        users: {
          update: {
            where: {
              email: data.responsible.email,
            },
            data: {
              isActive: true,
              password: data.responsible.hashedPassword,
            },
          },
        },
      },
    });
  }
}
