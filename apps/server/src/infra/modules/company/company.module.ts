import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { VerifyCompanyAccount } from '@core/application/company/use-cases/verify-company-account/verify-company-account';
import { RegisterCompany } from '@core/application/company/use-cases/register-company/register-company';

import { CompanyRepository } from '@core/domain/repositories/company.repository';
import { TokenProvider } from '@core/domain/providers/TokenProvider';
import { MailProvider } from '@core/domain/providers/MailProvider';

import { PrismaCompanyRepository } from '@infra/database/prisma/repositories/prisma-company.repository';
import { BcryptEncoderProvider } from '@infra/providers/BcryptEncoder.provider';
import { EncoderProvider } from '@core/domain/providers/EncoderProvider';
import { JwtTokenProvider } from '@infra/providers/JWTToken.provider';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { SendMailProducer } from '@infra/jobs/send-mail.producer';
import { DatabaseModule } from '@infra/database/database.module';

import { CompanyAccountVerificationController } from './controllers/company-account-verification.controller';
import { RegisterCompanyController } from './controllers/register-company.controller';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'send-mail-queue',
    }),
  ],
  controllers: [
    CompanyAccountVerificationController,
    RegisterCompanyController,
  ],
  providers: [
    SendMailProducer,
    JwtTokenProvider,
    BcryptEncoderProvider,
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
        tokenProvider: TokenProvider,
      ) => {
        return new RegisterCompany(
          companyRepository,
          mailService,
          tokenProvider,
        );
      },
      inject: [CompanyRepository, SendMailProducer, JwtTokenProvider],
    },
    {
      provide: VerifyCompanyAccount,
      useFactory: (
        companyRepository: CompanyRepository,
        mailService: MailProvider,
        tokenProvider: TokenProvider,
        encoderProvider: EncoderProvider,
      ) => {
        return new VerifyCompanyAccount(
          companyRepository,
          mailService,
          tokenProvider,
          encoderProvider,
        );
      },
      inject: [
        CompanyRepository,
        SendMailProducer,
        JwtTokenProvider,
        BcryptEncoderProvider,
      ],
    },
  ],
})
export class CompanyModule {}
