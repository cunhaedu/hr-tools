import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { PrismaCompanyRepository } from '@infra/database/prisma/repositories/prisma-company.repository';
import { RegisterCompany } from '@core/application/company/use-cases/register-company/register-company';
import { CompanyRepository } from '@core/domain/repositories/company.repository';
import { SendMailProducer } from '@infra/jobs/send-mail.producer';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { MailProvider } from '@core/domain/providers/MailProvider';
import { DatabaseModule } from '@infra/database/database.module';

import { RegisterCompanyController } from './controllers/register-company.controller';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'send-mail-queue',
    }),
  ],
  controllers: [RegisterCompanyController],
  providers: [
    SendMailProducer,
    {
      provide: CompanyRepository,
      useFactory: (prismaService: PrismaService) => {
        return new PrismaCompanyRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: RegisterCompany,
      useFactory: (
        companyRepository: CompanyRepository,
        mailService: MailProvider,
      ) => {
        return new RegisterCompany(companyRepository, mailService);
      },
      inject: [CompanyRepository, SendMailProducer],
    },
  ],
})
export class CompanyModule {}
