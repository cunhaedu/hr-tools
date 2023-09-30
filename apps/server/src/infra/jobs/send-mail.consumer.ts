import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { SendEmailData } from '@core/domain/providers/MailProvider';

@Processor('send-mail-queue')
export class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('send-mail-job')
  async sendMailJob(job: Job<SendEmailData>): Promise<void> {
    await this.mailService.sendMail({
      to: job.data.recipients.map((recipient) => ({
        name: recipient.name,
        address: recipient.email,
      })),
      from: {
        name: 'noreply',
        address: 'noreply@ninebox',
      },
      subject: job.data.subject,
      html: job.data.html,
      text: job.data.text,
    });
  }
}
