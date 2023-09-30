import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import configuration from '@config/environment-config';

import { CompanyModule } from './infra/modules/company/company.module';
import { DatabaseModule } from './infra/database/database.module';
import { SendMailConsumer } from '@infra/jobs/send-mail.consumer';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_AUTH_USER,
          pass: process.env.MAIL_AUTH_PASS,
        },
      },
    }),
    DatabaseModule,
    CompanyModule,
  ],
  controllers: [],
  providers: [SendMailConsumer],
})
export class AppModule {}
