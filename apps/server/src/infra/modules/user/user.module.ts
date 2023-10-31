import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { TokenProvider } from '@core/domain/providers/TokenProvider';

import { PrismaUserRepository } from '@infra/database/prisma/repositories/prisma-user.repository';
import { BcryptEncoderProvider } from '@infra/providers/BcryptEncoder.provider';
import { JwtTokenProvider } from '@infra/providers/JWTToken.provider';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { SendMailProducer } from '@infra/jobs/send-mail.producer';
import { DatabaseModule } from '@infra/database/database.module';

import { UserSignIn } from '@core/application/user/use-cases/user-sign-in/user-sign-in';
import { UserRepository } from '@core/domain/repositories/user.repository';
import { EncoderProvider } from '@core/domain/providers/EncoderProvider';

import { UserSignInController } from './controllers/user-sign-in.controller';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'send-mail-queue',
    }),
  ],
  controllers: [UserSignInController],
  providers: [
    SendMailProducer,
    BcryptEncoderProvider,
    JwtTokenProvider,
    {
      provide: UserRepository,
      useFactory: (prismaService: PrismaService) => {
        return new PrismaUserRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: UserSignIn,
      useFactory: (
        userRepository: UserRepository,
        tokenProvider: TokenProvider,
        encoderProvider: EncoderProvider,
      ) => {
        return new UserSignIn(userRepository, tokenProvider, encoderProvider);
      },
      inject: [UserRepository, JwtTokenProvider, BcryptEncoderProvider],
    },
  ],
})
export class UserModule {}
